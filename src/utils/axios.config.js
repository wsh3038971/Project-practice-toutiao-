// axios拦截器
import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// 请求拦截器
axios.interceptors.request.use(function (config) {
  var token = window.localStorage.getItem('user-token')
  console.log(token)
  config.headers['Authorization'] = `Bearer ${token}` // 统一注入token
  return config
}, function () {})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 正常处理函数
  return response.data ? response.data : {}
}, function (error) {
  // 异常处理函数
  let status = error.response.status
  let message = ''
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 401:
      message = 'token过期或未传'
      window.localStorage.clear()
      router.push('/login')
      break
    case 403:
      message = 'token未携带或已过期'
      break
    case 507:
      message = '服务器或数据库异常'
      break
    default:
      message = '未知错误'
      break
  }
  Message({
    type: 'warning',
    message: message
  })
  return new Promise(function () {}) // 返回新的promise对象,截止错误
})

export default {
  install (Vue) {
    Vue.prototype.$axios = axios
  }
}
