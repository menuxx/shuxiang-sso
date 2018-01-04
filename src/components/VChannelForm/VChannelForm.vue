<template>
  <div>
    <el-row>
      <el-col :span="16">
        <el-form @submit.native.prevent="submitForm" novalidate :model="channelFormModel" :rules="rules" label-width="100px" ref="channelForm" class="channel-form" size="small">

          <el-form-item label="推荐商品(书)"  prop="itemId">
            <el-select v-model="channelFormModel.itemId" style="width:100%" placeholder=" 请选择推广的商品（书籍）">
              <el-option v-for="(item, index) in items" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="邮递费"  prop="expressFee">
            <el-input type="number" :value="0" placeholder="邮递费" v-model="channelFormModel.expressFee">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>

          <el-form-item label="支付价格" prop="payFee">
            <el-input type="number" :value="0" v-model="channelFormModel.payFee" placeholder="不填就是0元免费送">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>

          <el-form-item label="推荐人头像" prop="ownerAvatar">
            <el-upload
              class="avatar-uploader"
              action=""
              accept="image/*"
              :data="uploadData"
              list-type="picture-card"
              :limit="1"
              :file-list="ownerAvatar"
              :on-success="onUploadSuccess"
              :http-request="uploadHandler"
              :show-file-list="true">
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="商品库存" prop="stock">
            <el-input-number v-model="channelFormModel.stock" :min="1" label="大于1的整数">
            </el-input-number>
          </el-form-item>

          <el-form-item label="大V姓名" prop="ownerName">
            <el-input v-model="channelFormModel.ownerName" placeholder="大V姓名"></el-input>
          </el-form-item>

          <el-form-item label="推荐赠语" prop="giftTxt">
            <el-input v-model="channelFormModel.giftTxt"
                      type="textarea"
                      :rows="2"
                      placeholder="例如：读这本书收获的不仅是。。。">
            </el-input>
          </el-form-item>

          <el-form-item label="时间" prop="timeRange">
            <el-date-picker
              v-model="channelFormModel.timeRange"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button native-type="submit" type="primary">提交</el-button>
          </el-form-item>

        </el-form>
      </el-col>
      <el-col :span="8">

      </el-col>
    </el-row>
  </div>
</template>


<script>
  import {mapActions} from 'vuex'
  import {loadItems, getChannel} from '../../http/api'
  import config from '../../config'
  import uploadHandler from "../../lib/qiniu-upload"
  import {isString, isNumber} from '../../lib/type'
  import isEmpty from 'is-empty'
  const checkNumberGT = (compVal) => {
    return function (rule, value, callback) {
      var _value = parseInt(value, 10)
      if (_value >= compVal) {
        callback()
      } else {
        callback(new Error('数字要大于' + compVal))
      }
    }
  };

  const monthPlus = (date, n) => {
    var now = new Date(date.valueOf())
    now.setMonth(now.getMonth() + n)
    return new Date(now.valueOf())
  }

  const dataToModel = (data) => {
    data.expressFee = parseInt(data.expressFee, 10) / 100
    data.payFee = parseInt(data.payFee, 10) / 100
    return data
  }

  const modelToData = (model) => {
    var cloneModel = Object.assign({}, model)
    cloneModel.expressFee = parseInt(cloneModel.expressFee, 10) * 100
    cloneModel.payFee = parseInt(cloneModel.payFee, 10) * 100
    return cloneModel
  }

  export default {
    beforeRouteEnter(to, from, next) {
      if ( to.name === 'create_v_channel' ) {
        loadItems().then( res =>{
          next(vm => {
            vm.items = res.data
          })
        })
      } else
      if ( to.name === 'update_v_channel' ) {
        var { channelId } = to.params
        Promise.all([loadItems(), getChannel(channelId)]).then( res =>{
          next(vm => {
            vm.items = res[0].data
            vm.channelFormModel = dataToModel(res[1].data)
          })
        })
      }
    },
    data() {
      var startTime = new Date()
      var endTime = monthPlus(new Date(), 1)  // 现在的时间偏移一个月
      return {
        items: [],
        ownerAvatar: [],
        uploadData: {
          keyPrefix: config.QiNiuImagePrefix.vChannelAvatar
        },
        channelFormModel: {
          expressFee: 0.0,
          payFee: 0.0,
          stock: 1,
          ownerName: '蒙娜丽莎',
          ownerAvatar: '',
          giftTxt: '蒙娜丽莎神秘的微笑',
          itemId: null,
          timeRange: [startTime, endTime]
        },
        rules: {
          expressFee: [
            { required: true, message: '必填项', trigger: 'blur' },
            { validator: checkNumberGT(0), trigger: 'blur' }
          ],
          payFee: [
            { required: true, message: '必填项', trigger: 'blur' },
            { validator: checkNumberGT(0), trigger: 'blur' }
          ],
          stock: [
            { required: true, message: '必填项', trigger: 'blur' },
            { type: "number", message: '填写数字', trigger: 'blur' },
            { validator: checkNumberGT(1), trigger: 'blur' },
          ],
          ownerName: [
            { required: true, message: '请输入推荐人姓名', trigger: 'blur' },
          ],
          giftTxt: [
            { required:true, message: '需要填写赠言', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      ...mapActions(['createVChannel', 'launchChannel']),
      uploadHandler,
      // 文件上传成功的时候
      onUploadSuccess(res, file, fileList) {
         if (res) {
           this.channelFormModel.ownerAvatar = res.key.replace(config.QiNiuImagePrefix.vChannelAvatar, '')
           this.ownerAvatar.push({
             key: res.key,
             name: file.name,
             url: config.QiNiuBaseUrl + res.key
           })
         }
      },
      submitForm() {
        this.$refs.channelForm.validate((valid) => {
          if ( valid ) {
            this.channelFormModel.startTime = this.channelFormModel.timeRange[0]
            this.channelFormModel.endTime = this.channelFormModel.timeRange[1]
            this.createVChannel(modelToData(this.channelFormModel)).then( res => {
              return this.launchChannel(res.id)
            })
            .then( res => {
              if ( res.code === 1 ) {
                this.$message({
                  message: '大v送书渠道添加成功',
                  type: 'success'
                });
              } else {
                this.$message({
                  message: '服务器创建渠道出错:' + res.message,
                  type: 'error'
                });
              }
            }, err => {
              this.$message({
                message: '服务器创建渠道出错: ' + err.message,
                type: 'error'
              });
            })
          } else {
            this.$message({
              message: '表单填写有误，请检查',
              type: 'warning'
            });
          }
        });
      }
    }
  }
</script>

<style>
  .line-center {
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
</style>
