<template>
  <div>

    <el-form  :model="ruleForm" :rules="rules" label-width="100px" ref="ruleForm" class="demo-ruleForm">
      <el-form-item label="推荐商品"  prop="name">
        <el-select v-model="ruleForm.name" style="width:100%" placeholder=" 请选择推广的商品（书籍）">
          <el-option label="活着1" value="1"></el-option>
          <el-option label="活着2" value="2"></el-option>
          <el-option label="活着3" value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="推荐人姓名"  prop="people">
        <el-input placeholder="推荐人名" v-model="ruleForm.people"></el-input>
      </el-form-item>

      <el-form-item label="推荐人头像" prop="peopleImg">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="推荐价格"  prop="price">
        <el-input  v-model="ruleForm.price" placeholder="例如：1.0，不填就是0元免费送"></el-input>
      </el-form-item>

      <el-form-item label="商品库存" prop="stock">
        <el-input v-model="ruleForm.stock" placeholder="大于1的整数"></el-input>
      </el-form-item>

      <el-form-item label="推荐赠语" prop="gift">
        <el-input v-model="ruleForm.gift"
                  type="textarea"
                  :rows="2"
                  placeholder="例如：读这本书收获的不仅是。。。"
        >
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"  @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>


<script>

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
        ruleForm: {
          name: '',
          people: '',
          peopleImg:'',
          price:'',
          stock:'',
          gift:''
        },
        rules: {
          name: [
            { required: true, message: '请选择要推广的商品（书籍）', trigger:'change' }
          ],
          people: [
            {required:true, message: '请输入推荐人姓名', trigger: 'blur'},
            {min: 3, max:5, message: '长度在4到20个字符', trigger: 'blur'}
          ],
          price: [
            { validator: checkNumber, trigger: 'blur' },
          ],
          stock: [
            { validator: checkNumber, trigger: 'blur' },
          ],
          desc: [
            {required:true, message: '例如：读这本书收获的不仅是。。。', trigger: 'blur'}
          ]
        },
        imageUrl: ''
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid){
            alert('submit!');
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
