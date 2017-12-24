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
  }

}
