<template>
  <!-- 最外层容器 -->
  <el-container>
    <!-- 左侧 -->
    <el-aside style="width: 200px">
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 右侧整体 -->
    <el-container>
      <!-- 右侧头部 -->
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <!-- 右侧内容部分 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import layoutAside from '../../components/home/layout-aside' // 左侧导航组件
// import layoutHeader from '../../components/home/layout-header' // 头部组件
export default {
  // components: {
  //   'layout-aside': layoutAside,
  //   'layout-header': layoutHeader
  // }
}
</script>

<style>

</style>
