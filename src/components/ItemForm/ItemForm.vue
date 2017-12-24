<template>
  <div class="page-container">
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
  </div>
</template>
<style lang="scss">
  .page-container {

  }
</style>
<script>
  import {mapMutations, mapState} from 'vuex'
  import * as types from '../../store/types'
  import config from '../../config'
  const checkNumber = (rule, value, callback) => {
    if (value === null) {
      return callback(new Error('库存不能为空'));
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
        uploadData: {
          keyPrefix: config.QiNiuImagePrefix.item
        },
        uploadHandler: require("../../lib/qiniu-upload").default,
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
            { required:true, message: '作者名称必填', trigger: 'blur' }
          ],
          press: [
            { required: true, message: '出版社名称必填', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '价格必填', trigger: 'blur' }
          ],
          thumbImgs: [
            { required: true, message: '缩略图需要上传', trigger: 'blur' }
          ],
          coverImage: [
            { required: true, message: '大图需要上传', trigger: 'blur' }
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
    computed: {
      itemFormModel: {
        get()  {
          console.log('1111')
          return Object.assign({}, this.$store.state.itemForm)
        },
        set(itemForm) {
          console.log(itemForm)
          // this.updateFormItem(itemForm)
          this.itemFormModel = itemForm
        }
      }
    },
    methods: {
      ...mapMutations({
        updateFormItem: types.ITEM_FROM_UPDATED
      }),
      onCoverImageUploadSuccess(res, file, fileList) {
        if (res) {
          this.uploadCoverImage[0] = {
            key: res.key,
            name: file.name,
            url: config.QiNiuBaseUrl + res.key
          }
        }
      },
      onThumbImagesUploadSuccess(res, file, fileList) {
        if (res) {
          this.uploadThumbImages.push({
            key: res.key,
            name: file.name,
            url: config.QiNiuBaseUrl + res.key
          })
        }
      },
      submitForm() {
        this.$refs.itemForm.validate((valid) => {

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
