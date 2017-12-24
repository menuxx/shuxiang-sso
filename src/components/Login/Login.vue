<template>
  <div class="page-container">
    <el-row justify="center" type="flex">
      <el-col :span="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">出版商登录</span>
          </div>
          <el-form @submit.native.prevent="onLogin" ref="loginForm" :model="loginForm" :rules="rules" class="login-form" label-width="100px">
            <el-form-item label="手机号" prop="phoneNumber">
              <el-input v-model="loginForm.phoneNumber" placeholder="收取验证码的手机号" />
            </el-form-item>
            <el-form-item label="手机动态码" prop="captchaCode">
              <el-col :span="18">
                <el-input v-model="loginForm.captchaCode" />
              </el-col>
              <el-col :span="1">&nbsp;</el-col>
              <el-col :span="5">
                <el-button type="success" :disabled="sendCaptchaDisable" @click="onSendCaptcha">{{ captchaBtnText }}</el-button>
              </el-col>
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
  import {getSessionTokenByCaptcha, sendCaptcha} from '../../http/api'
  import {completePromise} from '../../lib/promise'
  import * as auth from '../../http/auth'
  import * as types from '../../store/types'
  import isEmpty from 'is-empty'
  import ElCol from "element-ui/packages/col/src/col";
  var loginPromise = completePromise()
  var sendCaptchaPromise = completePromise()

  /**
   * 发送次数, 没吊用一次都会 increment
   * @returns {Number|number}
   */
  function sendTimes() {
    var times = parseInt(sessionStorage.getItem('__captcha_send_times__'), 10)
    if ( isEmpty(times) ) {
      sessionStorage.setItem('__captcha_send_times__', 1)
    } else {
      sessionStorage.setItem('__captcha_send_times__', times + 1)
    }
    return parseInt(sessionStorage.getItem('__captcha_send_times__'), 10)
  }
  export default {
    components: {ElCol},
    data() {
      return {
        rules: {
          phoneNumber: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '需要输入11个数字', trigger: 'blur' }
          ],
          captchaCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { min: 4, max: 4, message: '需要输入4个数字', trigger: 'blur' }
          ]
        },
        loginForm: {
          phoneNumber: '13575762817',
          captchaCode: null,
        },
        redirectPath: '/index', // 重定向到的位置，默认是根路径
        reverseSeconds: 60, // 倒计时
        captchaBtnText: '发送'
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
      // 开始倒计时
      onReverseSeconds() {
        var timerId = setInterval(function () {
          this.reverseSeconds -= 1
          if (this.reverseSeconds === 0) {
            clearInterval(timerId)
            this.reverseSeconds = 60
            this.captchaBtnText = '发送'
          }
          this.captchaBtnText = String(this.reverseSeconds)
        }, 1000)
      },
      onSendCaptcha() {
        if ( sendTimes() < 4 ) {
          return this.$message.warning('验证码超过发送次数')
        }
        if ( sendCaptchaPromise.state() === 'pending' ) {
          this.$message.info('请求服务器中...')
          return
        }
        var {phoneNumber} = this.loginForm
        if ( isEmpty(phoneNumber) || phoneNumber.length < 11 ) {
          this.$message.error('手机号是11位数字')
        } else {
          // 开始倒计时
          this.onReverseSeconds()
          sendCaptchaPromise = sendCaptcha(phoneNumber).then(res => {
            var {code} = res.data
            if ( code === 0 ) {
              this.$message.success('验证码已发生，请注意查收')
            }
          })
        }
      },
      onLogin () {
        if ( loginPromise.state() === 'pending' ) {
          this.$message.info('请求服务器中...')
          return
        }
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            loginPromise = getSessionTokenByCaptcha(this.loginForm.phoneNumber, this.loginForm.captchaCode).then(res => {
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
