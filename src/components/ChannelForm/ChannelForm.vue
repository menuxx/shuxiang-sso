<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" label-width="100px" ref="channelForm" class="demo-ruleForm" size="small">

      <el-form-item label="推荐商品"  prop="name">
        <el-select v-model="ruleForm.name" style="width:100%" placeholder=" 请选择推广的商品（书籍）">
          <el-option label="活着1" value="1"></el-option>
          <el-option label="活着2" value="2"></el-option>
          <el-option label="活着3" value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品ID" prop="ID">
        <el-input  v-model="ruleForm.ID" placeholder="商品ID"></el-input>
      </el-form-item>

      <el-form-item label="邮递费"  prop="expressFee">
        <el-input placeholder="邮递费" v-model="ruleForm.expressFee"></el-input>
      </el-form-item>

      <el-form-item label="推荐人头像" prop="peopleImg">
        <el-upload
          class="avatar-uploader"
          action=""
          accept="image/*"
          :data="uploadData"
          list-type="picture-card"
          :limit="1"
          :file-list="uploadFiles"
          :on-preview="handlePictureCardPreview"
          :before-upload="onUploadBeforeUpload"
          :on-error="onUploadError"
          :on-success="onUploadSuccess"
          :on-progress="onUploadProgress"
          :http-request="upload1"
          :show-file-list="true">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="推荐价格" prop="price">
        <el-input  v-model="ruleForm.price" placeholder="例如：1.0，不填就是0元免费送"></el-input>
      </el-form-item>

      <el-form-item label="商品库存" prop="stock">
        <el-input v-model="ruleForm.stock" placeholder="大于1的整数"></el-input>
      </el-form-item>

      <el-form-item label="大V姓名" prop="ownerName">
        <el-input v-model="ruleForm.ownerName" placeholder="大V姓名"></el-input>
      </el-form-item>

      <el-form-item label="大V头像" prop="peopleImg">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="推荐赠语" prop="gift">
        <el-input v-model="ruleForm.gift"
                  type="textarea"
                  :rows="2"
                  placeholder="例如：读这本书收获的不仅是。。。">
        </el-input>
      </el-form-item>

      <el-form-item label="创建渠道时间" prop="createAt">

        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line line-center" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
        </el-col>


      </el-form-item>

      <el-form-item label="更新时间" prop="updateAt">

        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line line-center" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
        </el-col>

      </el-form-item>

      <el-form-item label="渠道开始时间" prop="startTime">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line line-center" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
        </el-col>

      </el-form-item>

      <el-form-item label="渠道过去时间" prop="expiredTime">

        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line line-center" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
        </el-col>

      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>


<script>

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
        uploadFiles: [],
        uploadData: {
          keyPrefix: "images/channel/"
        },
        imageUrl: '',
        ruleForm: {
          ID:'',
          expressFee:'',
          price:'',
          stock:'',
          ownerName:'',
          peopleImg:'',
          gift:'',
          createAt:'',
          updateAt:'',
          startTime:'',
          expiredTime:'',
          date1:'',
          date2:''
        },
        rules: {
          ID: [
            { required:true, validator: checkNumber, trigger: 'blur' }
          ],
          expressFee:[
            { required:true, validator: checkNumber, trigger: 'blur' }
          ],
          people: [
            { required: true, message: '请输入推荐人姓名', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在4到20个字符', trigger: 'blur' }
          ],
          price: [
            { required:true, validator: checkNumber, trigger: 'blur' },
          ],
          peopleImg: [
            { required: true, trigger: 'blur', message: '至少有一张图片' },
          ],
          stock: [
            { required:true, validator: checkNumber, trigger: 'blur' },
          ],
          ownerName:[
            { message: '请输入大V姓名', trigger: 'blur'},
          ],
          gift:[
            {required:true, message: '例如：读这本书收获的不仅是。。。', trigger: 'blur'}
          ],
          createAt:[

          ],
          updateAt:[

          ],
          startTime:[

          ],
          expiredTime:[

          ]
        }
      }
    },
    methods: {
      upload1: require("../../lib/qiniu-upload").default,
      handlePictureCardPreview(file) {

      },
      onUploadBeforeUpload(file) {

      },
      // 文件上传成功的时候
      onUploadSuccess(res, file, fileList) {
         if (res) {
           this.ruleForm.peopleImg = res.key
           this.uploadFiles.push({
             key: res.key,
             name: file.name,
             url: "https://file.menuxx.com/" + res.key
           })
         }
      },
      onUploadError(file, fileList) {
      },
      onUploadProgress(e) {
      },
      submitForm() {
        this.$refs.channelForm.validate((valid) => {
          if(valid){

          } else {
            console.log('error submit!!!');
            return false;
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
