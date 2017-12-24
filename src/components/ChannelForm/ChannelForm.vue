<template>
  <div>
    <el-form @submit.native.prevent="submitForm" :model="channelForm" :rules="rules" label-width="100px" ref="channelForm" class="demo-channelForm" size="small">

      <el-form-item label="推荐商品"  prop="name">
        <el-select v-model="channelForm.name" style="width:100%" placeholder=" 请选择推广的商品（书籍）">
          <el-option label="活着1" value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="邮递费"  prop="expressFee">
        <el-input placeholder="邮递费" v-model="channelForm.expressFee"></el-input>
      </el-form-item>

      <el-form-item label="推荐人头像" prop="peopleImg">
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

      <el-form-item label="推荐价格" prop="price">
        <el-input  v-model="channelForm.price" placeholder="例如：1.0，不填就是0元免费送"></el-input>
      </el-form-item>

      <el-form-item label="商品库存" prop="stock">
        <el-input v-model="channelForm.stock" placeholder="大于1的整数"></el-input>
      </el-form-item>

      <el-form-item label="大V姓名" prop="ownerName">
        <el-input v-model="channelForm.ownerName" placeholder="大V姓名"></el-input>
      </el-form-item>

      <el-form-item label="推荐赠语" prop="giftTxt">
        <el-input v-model="channelForm.giftTxt"
                  type="textarea"
                  :rows="2"
                  placeholder="例如：读这本书收获的不仅是。。。">
        </el-input>
      </el-form-item>

      <el-form-item label="时间" prop="expireTime">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="开始时间" v-model="channelForm.startTime" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line line-center" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker type="fixed-time" placeholder="结束时间" v-model="channelForm.expireTime" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button native-type="submit" type="primary">提交</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>


<script>
  import config from '../../config'
  import uploadHandler from "../../lib/qiniu-upload"
  const checkNumber = (rule, value, callback) => {
    if (value === null) {
      return callback(new Error('此项不能为空'));
    }
    var val = parseInt(value.trim(), 10)
    if (!val) {
      return callback(new Error('请输入数字值'));
    }
    if (!Number.isInteger(val)) {
      return callback(new Error('请输入数字值'));
    }
    callback()
  };

  export default {
    data() {
      return {
        ownerAvatar: [],
        uploadData: {
          keyPrefix: config.QiNiuImagePrefix.vipChannelAvatar
        },
        channelForm: {
          expressFee: 0,
          price: 0,
          stock: 0,
          ownerName: '',
          ownerAvatar: '',
          giftTxt: '',
          itemId: null,
          startTime: null,
          expireTime: null
        },
        rules: {
          expressFee: [
            { required: true, validator: checkNumber, trigger: 'blur' }
          ],
          price: [
            { required: true, validator: checkNumber, trigger: 'blur' },
          ],
          stock: [
            { required: true, validator: checkNumber, trigger: 'blur' },
          ],
          ownerName: [
            { required: true, message: '请输入推荐人姓名', trigger: 'blur'},
          ],
          giftTxt: [
            { required:true, message: '需要填写赠言', trigger: 'blur'}
          ],
          startTime:[
            { required: true, message: '请选择开始时间', trigger: 'blur'}
          ],
          expiredTime: [
            { required:true, message: '请选择结束时间', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      uploadHandler,
      // 文件上传成功的时候
      onUploadSuccess(res, file, fileList) {
         if (res) {
           this.channelForm.ownerAvatar = res.key
           this.ownerAvatar.push({
             key: res.key,
             name: file.name,
             url: "https://file.menuxx.com/" + res.key
           })
         }
      },
      submitForm() {
        this.$refs.channelForm.validate((valid) => {
          if(valid){
          } else {
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
