<template>
    <el-row class="layout-header" type="flex" justify="space-between">
        <!-- 左侧 -->
        <el-col :span="6" class="left">
            <i class="el-icon-s-unfold icon"></i>
            <span>江苏传智播客教育股份有限公司</span>
        </el-col>
        <!-- 右侧 -->
        <el-col :span="1.5" class="right">
            <img class="head-img" :src="!userInfo.photo ? userInfo.photo : defaultImg">
    <el-dropdown trigger="click" @command="handleMenu">
        <span class="el-dropdown-link">
          {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="account">个人信息</el-dropdown-item>
        <el-dropdown-item command="git">git地址</el-dropdown-item>
        <el-dropdown-item command="lgout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
        </el-col>
    </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {
    // 初始数据
    getUserInfo: function () {
      // 取出在缓存中的token
      let token = window.localStorage.getItem('user-token')
      console.log(token)
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        this.userInfo = res.data
      })
    },
    handleMenu: function (command) {
      if (command === 'account') {
      } else if (command === 'git') {

      } else {
        window.localStorage.clear()
        this.$router.push('/login')
      }
    }
  },
  created: function () {
    this.getUserInfo() // 获取用户信息
  }
}
</script>

<style lang="less" scoped>
.layout-header {
    padding: 8px 0;
    .left {
        display: flex;
        align-items: center;
        .icon {
            font-size: 20px;
            margin-right: 4px;
        }
    }
    .right {
        display: flex;
        align-items: center;
        .head-img {
            border-radius: 50%;
            margin-right: 5px;
            width: 40px;
            height: 40px;
        }
    }

}
</style>
