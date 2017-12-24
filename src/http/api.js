
import http from './index'
import config from '../config'
import {imageArrayToString, imageStringToArray} from '../lib/image'

const pageSize = 10

/**
 * 获取渠道中的订单
 * @param channelId
 * @param pageNum
 * @returns {AxiosPromise<any>}
 */
export const loadChannelOrders = (channelId, pageNum=1) => {
  return http.get(`/orders?channelId=${channelId}&pageNum=${pageNum}&pageSize=${pageSize}`)
}

/**
 * 订单完成配送
 * @param orderId
 * @param expressNo
 * @param expressName
 * @returns {AxiosPromise<any>}
 */
export const orderDoDelivery = (orderId, expressNo, expressName) => {
  return http.put(`/orders/${orderId}/delivery`, { expressNo, expressName })
}

/**
 * 加载系统中支持的快递
 * @returns {AxiosPromise<any>}
 */
export const loadExpresses = () => {
  return http.get(`expresses`)
}

/**
 * 创建一个商品
 * @param newItem
 * @returns {AxiosPromise<any>}
 */
export const createItem = (newItem) => {
  newItem.thumbImgs = imageArrayToString(newItem.thumbImgs, config.QiNiuImagePrefix.item)
  return http.post(`items`, newItem)
}

/**
 * 加载商品
 * @returns {Promise.<TResult>}
 */
export const loadItems = (pageNum=1) => {
  return http.get(`items?pageNum=${pageNum}&pageSize=${pageSize}`).then(function (res) {
    res.data = res.data.map( item => {
      item.thumbImgs = imageStringToArray(item.thumbImgs, config.QiNiuImagePrefix.item)
      return item
    })
    return res
  })
}

/**
 * 获取某个商品
 * @param itemId
 * @returns {Promise.<TResult>}
 */
export const getItemById = (itemId) => {
  return http.get(`items/${itemId}`).then(function (res) {
    res.data.thumbImgs = imageStringToArray(res.data.thumbImgs, config.QiNiuImagePrefix.item)
    return res
  })
}

/**
 * 更新商品
 * @param item
 * @returns {AxiosPromise<any>}
 */
export const updateItem = (item) => {
  return http.put(`items/${item.id}`, item)
}

/**
 * 创建一个渠道
 * @param channel
 * @returns {AxiosPromise<any>}
 */
export const createVChannel = (channel) => {
  return http.post(`v_channels`, channel)
}

/**
 * 更新一个渠道，已经启动的渠道，不能更新
 * @param channelId
 * @param updateChannel
 * @returns {AxiosPromise<any>}
 */
export const updateChannel = (channelId, updateChannel) => {
  return http.put(`v_channels/${channelId}`, updateChannel)
}

/**
 * 加载商家所有的渠道
 * @returns {Promise.<TResult>}
 */
export const loadChannels = (pageNum=1) => {
  return http.get(`v_channels?pageNum=${pageNum}&pageSize=${pageSize}`)
}

/**
 * 获取制定id的大v渠道
 * @param channelId
 * @returns {AxiosPromise<any>}
 */
export const getChannel = (channelId) => {
  return http.get(`v_channels/${channelId}`)
}

/**
 * 发送验证码
 * @param mobile
 * @returns {AxiosPromise<any>}
 */
export const sendCaptcha = (mobile) => {
  return http.put(`/auth/send_captcha`, { phoneNumber: mobile })
}

/**
 * 获取会话令牌通过手机号验证码
 * @param mobile
 * @param captcha
 * @returns {AxiosPromise<any>}
 */
export const getSessionTokenByCaptcha = (mobile, captcha) => {
  return http.put(`/auth/captcha_to_token`, { phoneNumber: mobile, captcha })
}

/**
 * 刷新安全令牌
 * @param token
 * @returns {AxiosPromise<any>}
 */
export const refreshSessionToken = (token) => {
  return http.put(`/auth/refresh_token`, { token })
}
