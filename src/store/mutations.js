import * as types from './types'

export default {
  // 用户令牌更新完成
  [types.USER_AUTH_TOKEN_UPDATE] (state, payload) {
    state.auth.token = payload.token
    state.auth.userInfo = payload.userInfo
  },
  // 商品创建完成
  [types.CHANNEL_ADDED] (state, newChannel) {
    state.channels.push(newChannel)
  },
  // 渠道中的订单加载
  [types.CHANNEL_ORDER_LOADED] (state, orders) {
    state.channelOrders = orders
  },
  // 商品记载完成
  [types.ITEM_LOADED] (state, items) {
    state.items = items
  },
  [types.ITEM_FROM_UPDATED] (state, itemFrom) {
    state.itemFrom = itemFrom
  }
}
