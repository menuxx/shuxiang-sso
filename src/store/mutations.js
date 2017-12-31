import * as types from './types'

export default {
  // 用户令牌更新完成
  [types.USER_AUTH_TOKEN_UPDATE] (state, payload) {
    state.auth.token = payload.token
    state.auth.userInfo = payload.userInfo
  },
  // 商品创建完成
  [types.V_CHANNEL_ADDED] (state, newChannel) {
    state.vChannels.push(newChannel)
  },
  [types.ITEM_ADDED] (state, newItem) {
    state.items.push(newItem)
  },
  // 渠道中的订单加载
  [types.V_CHANNEL_ORDERS_LOADED] (state, orders) {
    state.vChannelOrders = orders
  },
  // 商品记载完成
  [types.ITEMS_LOADED] (state, items) {
    state.items = items
  },
  [types.ITEM_FROM_UPDATED] (state, itemForm) {
    state.itemFrom = itemForm
  },
  // 渠道创建
  [types.V_CHANNEL_ADDED] (state, updatedChannel) {
    state.vChannels.forEach((channel, index) => {
      if (updatedChannel.id === channel.id) {
        state.vChannels[index] = updatedChannel
      }
    })
  },
  [types.V_CHANNEL_ORDERS_LOADED] (state, orders) {
    state.vChannelOrders = orders
  },
  // 渠道启动
  [types.V_CHANNEL_LAUNCHED] (state, orders) {

  },
  [types.V_CHANNELS_LOADED] (state, channels) {
    state.vChannels = channels
  },
  [types.ITEM_CODE_TASKS_LOADED] (state, tasks) {
    state.codeTasks = tasks
  },
  [types.ITEM_CODE_TASK_UPADTED] (state, newTask) {
    state.codeTasks.forEach( (task, index) => {
      if ( task.id === newTask.id ) {
        state.codeTasks[index] = newTask
      }
    })
  },
}
