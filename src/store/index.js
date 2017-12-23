
import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
  auth: {},
  app: {},
  // 商品列表
  items: [],
  // 渠道中的订单列表
  channelOrders: [],
  // 商品列表
  books: [],
  // 渠道列表
  channels: [],
  // 更新的 channel
  updateChannel: null,
  // 新创建的渠道
  newChannel: null,
  // item 表单
  itemForm: {
    name: '',
    price: 0,
    thumbImgs: [],
    coverImage: [],
    isbn: '',
    press: '',
    authors: '',
    translators: '',
    describe: '',
    shopUrl: ''
  },
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  strict: process.env.NODE_ENV !== 'production'
})
