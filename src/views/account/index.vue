<template>
    <el-card v-loading="loading">
        <bread-crumb slot="header">
            <template slot="title">
                用户信息
            </template>
        </bread-crumb>
        <el-upload action="" :http-request="uploadHeaderImg" :show-file-list="false">
            <img class="header-img" :src="userInfo.photo || defaultImg" alt="">
        </el-upload>
        <el-form ref="userForm" :model="userInfo" :rules="userRules" label-width="100px">
            <el-form-item label="用户名" prop="name">
                <el-input v-model="userInfo.name" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="intro">
                <el-input v-model="userInfo.intro" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="userInfo.email" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="userInfo.mobile" style="width: 300px" disabled></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="saveUserInfo">保存</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import eventBus from '../../utils/events' // 公共vue实例
export default {
  data () {
    return {
      defaultImg: require('../../assets/img/404.png'),
      loading: false,
      userInfo: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      userRules: {
        name: [{
          required: true,
          message: '用户名不能为空'
        }, {
          min: 2,
          max: 8,
          message: '用户名为2-8之间'
        }],
        email: [{
          pattern: /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/,
          message: '邮箱格式不正确'
        }]
      }
    }
  },
  methods: {
    // 上传头像
    uploadHeaderImg: function (params) {
      this.loading = true
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(res => {
        this.loading = false
        eventBus.$emit('updateUserInfo')
        this.getUserInfo()
      })
    },
    // 保存按钮
    saveUserInfo: function () {
      this.$refs.userForm.validate((isOk) => {
        if (isOk) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.userInfo
          }).then(res => {
            this.$message({ type: 'success', message: '修改成功' })
            // 保存成功后通知头部组件更新(eventBus)
            eventBus.$emit('updateUserInfo')
          })
        }
      })
    },
    // 初始数据
    getUserInfo: function () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        this.userInfo = res.data
      })
    }
  },
  created: function () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.header-img {
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin-left: 600px;
}
</style>
