<template>
  <div class="cover-image">
    <div @click="showDialog(index)" class="image-item" v-for="(item, index) in images" :key="index">
      <img :src="item ? item : defaultImg" alt="">
    </div>
    <el-dialog @close="dialogVisible = false" :visible="dialogVisible">
      <!-- 点击图片弹出层 -->
      <select-image @onSelectImg="receiveImg"></select-image>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false,
      selectIndex: null
    }
  },
  methods: {
    // 接收子组件传来的图片地址继续传给父组件
    receiveImg: function (url) {
      this.$emit('onClickImg', url, this.selectIndex)
      this.dialogVisible = false
    },
    // 图片点击(弹出dialog)
    showDialog: function (index) {
      this.dialogVisible = true
      this.selectIndex = index
    }
  }
}
</script>

<style lang="less" scoped>
.cover-image {
  display: flex;
  .image-item {
    border: 1px solid #ccc;
    padding: 5px;
    width: 200px;
    height: 200px;
    img {
      width: 100%;
      height: 100%;
      cursor:pointer;
    }
  }
}
</style>
