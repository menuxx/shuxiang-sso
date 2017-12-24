<template>
  <div class="page-container">
    <el-row>
      <el-col :span="16">
        <el-form @submit.native.prevent="submitForm" :model="itemFormModel" :rules="rules" label-width="100px" ref="itemForm" class="item-from">

          <el-form-item label="商品名称" prop="name">
            <el-input placehholder="书籍名称" v-model="itemFormModel.name"></el-input>
          </el-form-item>

          <el-form-item label="商品价格" prop="price">
            <el-input placehholder="单位: 元" v-model="itemFormModel.price"></el-input>
          </el-form-item>

          <el-form-item label="封面大图" prop="coverImage">
            <el-upload
              class="thumb-uploader"
              :data="uploadData"
              accept="image/*"
              action=""
              list-type="picture-card"
              :limit="1"
              :file-list="uploadCoverImage"
              :http-request="uploadHandler"
              :on-success="onCoverImageUploadSuccess"
              :show-file-list="true">
              <img v-if="uploadCoverImage.length > 0" :src="uploadCoverImage.url" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="缩略图" prop="thumbImgs">
            <el-upload
              class="cover-uploader"
              action=""
              accept="image/*"
              :data="uploadData"
              list-type="picture-card"
              :limit="4"
              :file-list="uploadThumbImages"
              :on-success="onThumbImagesUploadSuccess"
              :http-request="uploadHandler"
              :show-file-list="true">
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>


          <el-form-item label="ISBN" prop="isbn">
            <el-input placeholder="如有多个用逗号分隔" v-model="itemFormModel.isbn"></el-input>
          </el-form-item>

          <el-form-item label="出版社" prop="press">
            <el-input  v-model="itemFormModel.press" placeholder="出版社"></el-input>
          </el-form-item>

          <el-form-item label="作者" prop="authors">
            <el-input placeholder="如有多个用逗号分隔" v-model="itemFormModel.authors"></el-input>
          </el-form-item>

          <el-form-item label="译者" prop="translator">
            <el-input placeholder="如有多个用逗号分隔" v-model="itemFormModel.translator"></el-input>
          </el-form-item>

          <el-form-item label="描述" prop="describe">
            <el-input v-model="itemFormModel.describe"
                      type="textarea"
                      :rows="2"
                      placeholder="例如：读这本书收获的不仅是..."
            >
            </el-input>
          </el-form-item>

          <el-form-item label="商店连接" prop="shopUrl">
            <el-input v-model="itemFormModel.shopUrl" placeholder="一个URL连接，必须以http(s)://开头"></el-input>
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
<style lang="scss">
  .page-container {

  }
</style>
<script>
  import {mapMutations, mapState, mapActions} from 'vuex'
  import * as types from '../../store/types'
  import {getItemById} from '../../http/api'
  import isEmpty from 'is-empty'
  import uploadHandler from "../../lib/qiniu-upload"
  import config from '../../config'
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    components: {ElCol},
    data() {
      return {
        uploadData: {
          keyPrefix: config.QiNiuImagePrefix.item
        },
        itemFormModel: {
          name: '1111111',
          price: 20,
          thumbImgs: [{
            key:"images/items/WaYeFQfxWC.jpg",
            name : "54fbb2fb43166d222f57f465422309f79052d21b.jpg",
            url : "https://file.menuxx.com/images/items/WaYeFQfxWC.jpg"
          }],
          coverImage: [{
            key:"images/items/WaYeFQfxWC.jpg",
            name : "54fbb2fb43166d222f57f465422309f79052d21b.jpg",
            url : "https://file.menuxx.com/images/items/WaYeFQfxWC.jpg"
          }],
          isbn: '222',
          press: '333',
          authors: '444',
          translators: '555',
          describe: '666',
          shopUrl: 'http://www.baidu.com'
        },
        uploadHandler,
        uploadThumbImages: [],
        uploadCoverImage: [],
        rules: {
          name: [
            { required: true, message: '商品名称(书籍)必填', trigger:'blur' }
          ],
          isbn:[
            { required: true, message: 'ISB编号必填', trigger:'blur' }
          ],
          authors: [
            { required: true, message: '作者名称必填', trigger: 'blur' }
          ],
          press: [
            { required: true, message: '出版社名称必填', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '价格必填', trigger: 'blur' }
          ],
          thumbImgs: [
            { type: 'array', required: true, message: '缩略图需要上传', trigger: 'blur' }
          ],
          coverImage: [
            { type: 'array', required: true, message: '大图需要上传', trigger: 'blur' }
          ],
          describe: [
            { required: true, message: '描述必填', trigger: 'blur' }
          ],
          shopUrl: [
            { required: true, message: '售卖商店网址必填', trigger: 'blur' }
          ]
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      var {itemId} = to.params
      if ( isEmpty(itemId) ) {
        console.log('新增商品')
        next()
      } else {
        console.log('更新商品')
        getItemById(itemId).then(res => {
          next(vm => {
            vm.itemFormModel = res.data
          })
        })
      }
    },
    methods: {
      ...mapActions(['createItem']),
      ...mapMutations({
        updateFormItem: types.ITEM_FROM_UPDATED
      }),
      onCoverImageUploadSuccess(res, file, fileList) {
        if (res) {
          this.itemFormModel.coverImage[0] = {
            key: res.key,
            name: file.name,
            url: config.QiNiuBaseUrl + res.key
          }
        }
      },
      onThumbImagesUploadSuccess(res, file, fileList) {
        if (res) {
          this.itemFormModel.thumbImgs.push({
            key: res.key,
            name: file.name,
            url: config.QiNiuBaseUrl + res.key
          })
        }
      },
      submitForm() {
        this.$refs.itemForm.validate( valid => {
          if ( valid ) {
            this.createItem(this.itemFormModel).then( newItem => {
              if ( newItem.id ) {
                this.updateFormItem(this.itemFormModel)
                this.$message.success('新增成功')
                this.$router.push({ name: 'item_list' })
              } else {
                this.$message.success('新增出错')
              }
            })
          }
        });
      }
    }
  }
</script>

<style>
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
