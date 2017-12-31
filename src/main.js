// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import App from './App'
import http from './http'
import './lib/type'

console.log('process.env.NODE_ENV: ' + process.env.NODE_ENV)

// 可以使用 this.$http 的方法来使用 axios
Vue.prototype.$http = http

Vue.use(ElementUI)

Vue.filter('json', function (obj) {
  console.log(obj)
  return JSON.stringify(obj)
})

new Vue({
  el: '#app',
  http,
  store,
  router,
  render: h => h(App)
})
