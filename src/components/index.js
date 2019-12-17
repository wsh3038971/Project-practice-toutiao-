// 所有自定义组件的插件

// 引入已经注册的组件
import layoutAside from '../components/home/layout-aside.vue'
import layoutHeader from '../components/home/layout-header.vue'
import breadCrumb from './common/bread-crumb.vue'

// 导出一个对象
export default {
  // install方法,传入一个vue参数
  install: function (Vue) {
    // 注册组件 (组件名,组件对象)
    Vue.component('layout-aside', layoutAside) // 注册左侧导航组件
    Vue.component('layout-header', layoutHeader) // 注册右侧头部组件
    Vue.component('bread-crumb', breadCrumb) // 注册面包屑组件
  }
}
