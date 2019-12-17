import Vue from 'vue'
import App from './App.vue'
import router from './permission.js'
import ElementUI from 'element-ui'
import Component from './components/index' // 引入全局组件
import axios from './utils/axios.config'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.less' // 引入axios
// Vue.prototype.$axios = axios // 将axios挂载在vue实例上
Vue.use(ElementUI) // 全局注册
Vue.use(Component) // 全局注册自定义组件
Vue.use(axios)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
