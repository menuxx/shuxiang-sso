import Vue from 'vue'
import Router from 'vue-router'
import isEmpty from 'is-empty'
import * as auth from '../http/auth'
import * as types from '../store/types'
import store from '../store/index'

import {refreshSessionToken} from '../http/api'

Vue.use(Router)

const router = new Router({
  routes: [
    // 登录页面
    { path: '/login', name: 'login', component: function (resolve) {
      require(['../components/Login/Login'], resolve)
    } },
    { path: '/login/root', name: 'root_login', component: function (resolve) {
      require(['../components/Login/RootLogin'], resolve)
    } },
    { path: '/', meta: { needAuth: true }, redirect: '/index', component: function (resolve) {
      require(['../IndexLayout'], resolve)
    }, children: [
        {
          path: '/item_code', name: 'item_code', meta: { needAuth: true }, component: function (resolve) {
          require(['../components/ItemCode/ItemCode'], resolve)
        } },
        // 首页
        { path: '/index', name: 'index', meta: { needAuth: true }, component: function (resolve) {
          require(['../components/Dashboard/Dashboard'], resolve)
        } },
        // 加载 channel 订单
        { path: '/channels/:channelId/orders', name: 'v_channel_orders', meta: { needAuth: true }, component: function (resolve) {
          require(['../components/VChannelOrderList/VChannelOrderList'], resolve)
        } },
        // 加载 items
        { path: '/items', name: 'item_list', meta: { needAuth: true }, component: function (resolve) {
          require(['../components/ItemList/ItemList'], resolve)
        } },
        // 更新 item
        { path: '/item/:itemId', name: 'update_item', meta: { needAuth: true }, component: function (resolve) {
          require(['../components/ItemForm/ItemForm'], resolve)
        } },
        // 创建 item
        { path: '/items/new', name: 'create_item', meta: { needAuth: true }, component: function (resolve) {
          require(['../components/ItemForm/ItemForm'], resolve)
        } },

        // 加载 channels
        { path: '/v_channels', name: 'v_channel_list', meta: { needAuth: true }, component: function (resolve) {
          require(['../components/VChannelList/VChannelList'], resolve)
        } },
        // 创建 channel
        { path: '/v_channel/new', name: 'create_v_channel', meta: { needAuth: true }, component: function (resolve) {
          require(['../components/VChannelForm/VChannelForm'], resolve)
        } },
        // 更新 channel
        { path: '/v_channel/:channelId', name: 'update_v_channel', meta: { needAuth: true }, component: function (resolve) {
          require(['../components/VChannelForm/VChannelForm'], resolve)
        } }
      ]
    }
  ]
})

/**
 * 检测用户是否登录
 */
router.beforeEach((to, from, next) => {
  // 如果目标页面需要等露，就执行该验证流程
  if ( to.meta.needAuth ) {
    var token = auth.getMyAuthToken()
    if ( isEmpty(token) ) {
      // 如果是因为 authToken 过期导致无法取得 token 的话，就刷新 token
      var expired = auth.myAuthTokenExpired() && !isEmpty(auth.getMyExpiredToken())
      if ( expired ) {
        // 就去刷新该令牌
        return refreshSessionToken(auth.getMyExpiredToken()).then((newToken) => {
          // 刷新令牌成功
          auth.setMyAuthToken(newToken)
          // 更新状态, 如果用户在当前页刷新，防止出现登录状态消失
          store.commit(types.USER_AUTH_TOKEN_UPDATE, { token, userInfo: auth.getUserInfo() })
          return next()
        }, (err) => {
          // 如果刷新令牌失败
          next(err)
        })
      } else {
        router.replace({ name: 'login', query: { redirect: to.fullPath } })
        return next(new Error('还没有登录吧，快去授权', 401))
      }
    } else {
      store.commit(types.USER_AUTH_TOKEN_UPDATE, { token, userInfo: auth.getUserInfo() })
      // 该用户已经登录
      return next()
    }
  }
  next()
})

router.onError((err) => {
  switch (err.id) {
    case 401:
  }
})


export default router
