import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.less' // 初始化样式
Vue.use(ElementUI) // 全局注册

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
