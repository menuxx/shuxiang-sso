
const isProd = require('./env').isProd

var config = {}

if (isProd()) {
  config = {
    Domain: {
      APIBaseUrl: "http://wxtest.qurenjia.com/api"
    }
  }
} else {
  config = {
    Domain: {
      // APIBaseUrl: "http://wxdev.qurenjia.com/api"
      APIBaseUrl: "http://192.168.199.244:8081/api"
    }
  }
}

module.exports = {
  Domain: {
    AuthEntryPointUrl: config.Domain.AuthEntryPointUrl,
    APIBaseUrl: config.Domain.APIBaseUrl
  },
  QiNiuBaseUrl: 'https://file.menuxx.com/',
  QiNiuImagePrefix: {
    item: 'images/items/',
    vipChannelAvatar: 'images/channel/avatar/'
  }
}
