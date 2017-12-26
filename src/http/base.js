
import axios from 'axios'
import {Domain} from '../config'
// axios 配置
axios.defaults.timeout = 5000 // 5秒超时
axios.defaults.baseURL = Domain.APIBaseUrl
