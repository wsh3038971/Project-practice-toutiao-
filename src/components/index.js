// 所有自定义组件的插件

// 引入已经注册的组件
import layoutAside from '../components/home/layout-aside.vue'
import layoutHeader from '../components/home/layout-header.vue'
import breadCrumb from './common/bread-crumb.vue'
import coverImage from './publish/cover-image.vue'
// quill富文本
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

// 导出一个对象
export default {
  // install方法,传入一个vue参数
  install: function (Vue) {
    // 注册组件 (组件名,组件对象)
    Vue.component('layout-aside', layoutAside) // 注册左侧导航组件
    Vue.component('layout-header', layoutHeader) // 注册右侧头部组件
    Vue.component('bread-crumb', breadCrumb) // 注册面包屑组件
    Vue.component('quill-editor', quillEditor) // 注册富文本编辑器
    Vue.component('cover-image', coverImage) // 注册封面组件
  }
}
