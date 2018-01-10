
const isProd = require('./env').isProd
const isTest = require('./env').isTest
const isDev = require('./env').isDev

var config = {}

if ( isProd() ) {
  config = {
    Domain: {
      APIBaseUrl: 'https://wx.nizhuantech.com/api',
      SiteBaseUrl: 'https://wx.nizhuantech.com'
    }
  }
} else if ( isDev() ) {
  config = {
    Domain: {
      APIBaseUrl: "http://wxtest.qurenjia.com/api",
      SiteBaseUrl: "http://wxtest.qurenjia.com"
    }
  }
} else if ( isTest() ) {
  config = {
    Domain: {
      APIBaseUrl: "http://wxdev.qurenjia.com/api",
      SiteBaseUrl: "http://wxdev.qurenjia.com"
    }
  }
} else {
  config = {
    Domain: {
      APIBaseUrl: "http://wxtest.qurenjia.com/api",
      SiteBaseUrl: "http://wxtest.qurenjia.com"
    }
  }
}

module.exports = {
  Domain: {
    APIBaseUrl: config.Domain.APIBaseUrl,
    SiteBaseUrl: config.Domain.SiteBaseUrl
  },
  QiNiuBaseUrl: 'https://file.menuxx.com/',
  QiNiuImagePrefix: {
    item: 'images/items/',
    vChannelAvatar: 'images/channel/avatar/'
  }
}
