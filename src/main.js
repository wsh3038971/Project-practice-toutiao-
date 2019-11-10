import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios' // 将axios挂载在vue实例上
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.less' // 引入axios
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios // 初始化样式
Vue.use(ElementUI) // 全局注册

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
