<template>
  <div class="page-container">
    <el-row justify="center" type="flex">
      <el-col :span="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">超级管理员登录</span>
          </div>
          <el-form @submit.native.prevent="onLogin" ref="loginForm" :model="loginForm" :rules="rules" class="login-form" label-width="100px">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="loginForm.userName" placeholder="收取验证码的手机号" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" native-type="submit">登录</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {rootLogin} from '../../http/api'
  import * as auth from '../../http/auth'
  import * as types from '../../store/types'
  import isEmpty from 'is-empty'
  import md5 from 'blueimp-md5'
  export default {
    data() {
      return {
        rules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '需要输入手机号', trigger: 'blur' }
          ]
        },
        loginForm: {
          userName: 'root',
          captchaCode: '28181820',
        },
        redirectPath: '/index' // 重定向到的位置，默认是根路径
      }
    },
    beforeRouterEnter(to, from, next) {
      next(vm => {
        vm.redirectPath = to.query.redirect
      })
    },
    computed: {
      sendCaptchaDisable: () => {
        return this.reverseSeconds === 60
      }
    },
    methods: {
      onLogin () {
        // this.$message.info('请求服务器中...')
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            rootLogin(this.loginForm.userName, md5(this.loginForm.passwordEncrypted)).then(res => {
              var {token, userInfo} = res.data
              auth.setMyAuthToken(token)
              auth.setUserInfo(userInfo)
              this.$store.commit(types.USER_AUTH_TOKEN_UPDATE, {token, userInfo})
              this.$router.push({ path: this.redirectPath })
            }, err => {
              this.$message.error('登录出现错误:' + err.message)
            })
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
