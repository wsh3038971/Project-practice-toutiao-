<template>
  <div class="cover-image">
    <div class="image-item" v-for="(item, index) in images" :key="index">
      <img src="../../assets/img/pic_bg.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: ['images']
}
</script>

<style lang="less" scoped>
.cover-image {
  display: flex;
  .image-item {
    border: 1px solid #ccc;
    padding: 5px;
  }
}
</style>
