
const isProd = require('./env').isProd

var config = {}

if (isProd()) {
  config = {
    Domain: {
      APIBaseUrl: "http://wxtest.qurenjia.com/api",
      SiteBaseUrl: 'http://wxtest.qurenjia.com'
    }
  }
} else {
  config = {
    Domain: {
      // APIBaseUrl: "http://wxdev.qurenjia.com/api"
      APIBaseUrl: "http://192.168.33.76:8081/api",
      SiteBaseUrl: 'http://wxtest.qurenjia.com'
    }
  }
}

module.exports = {
  Domain: {
    AuthEntryPointUrl: config.Domain.AuthEntryPointUrl,
    APIBaseUrl: config.Domain.APIBaseUrl,
    SiteBaseUrl: config.Domain.SiteBaseUrl
  },
  QiNiuBaseUrl: 'https://file.menuxx.com/',
  QiNiuImagePrefix: {
    item: 'images/items/',
    vChannelAvatar: 'images/channel/avatar/'
  }
}
