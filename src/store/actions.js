import * as types from './types'
import * as api from '../http/api'

export default {

  /**
   * 创建一个商品
   * @param commit
   * @param newItem
   * @returns {Promise.<TResult>}
   */
  createItem({commit}, newItem) {
    return api.createItem(newItem).then(res => {
      commit(types.ITEM_ADDED, res.data)
      return res.data
    })
  },
  /**
   * 创建一个渠道
   * @param commit
   * @param newChannel
   * @returns {Promise.<TResult>}
   */
  createVChannel({commit}, newChannel) {
    return api.createVChannel(newChannel).then(res => {
      commit(types.V_CHANNEL_ADDED, res.data)
      return res.data
    })
  },

  /**
   * 启动一个渠道
   * @param commit
   * @param channelId
   * @returns {Promise.<TResult>|*}
   */
  launchChannel({commit}, channelId) {
    return api.launchChannel(channelId).then(res => {
      commit(types.V_CHANNEL_LAUNCHED, res.data)
      return res.data
    })
  },

  loadCodeTask({commit}, pageNum) {
    return api.loadCodeTasks(pageNum).then(res => {
      commit(types.V_CHANNEL_LAUNCHED, res.data)
      return res.data
    })
  },

  getCodeTask({commit}, taskId) {
    return api.getTaskById(taskId).then( res => {
      commit(types.ITEM_CODE_TASK_UPADTED, res.data)
      return res.data
    })
  }

}
