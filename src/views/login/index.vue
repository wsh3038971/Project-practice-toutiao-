<template>
    <div class="login">
        <el-card class="login-card">
            <div class="logo">
                <img src="../../assets/img/logo_index.png" alt="">
            </div>
            <!-- 表单组件 el-form表单容器 -->
            <el-form style="margin-top: 20px" :model="loginForm" :rules="loginRules" ref="loginForm">
                <!-- 表单项(用户名) -->
                <el-form-item prop="mobile">
                    <!-- 组件内容 -->
                    <el-input placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="code">
                    <!-- 组件内容 -->
                    <el-input style="width: 250px" placeholder="请输入验证码" v-model="loginForm.code"></el-input>
                    <!-- 获取验证码按钮 -->
                    <el-button style="float: right">发送验证码</el-button>
                </el-form-item>
                <!-- 勾选区域 -->
                <el-form-item prop="check">
                    <el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button style="width: 100%" type="primary" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    // 自定义校验规则
    let validator = function (rule, value, callBack) {
      if (value) {
        callBack()
      } else {
        callBack(new Error('必须勾选'))
      }
    }
    return {
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        check: false // 单选框
      },
      loginRules: {
        // 手机号
        mobile: [{
          required: true, // 必填
          message: '请填写手机号' // 提示内容
        }, {
          pattern: /^1[3456789]\d{9}$/, // 正则表达式
          message: '手机号格式不正确'
        }],
        // 验证码
        code: [{
          required: true, // 必填
          message: '请填写验证码' // 提示内容
        }, {
          pattern: /^\d{6}$/,
          message: '请输入验证码'
        }],
        check: [{
          validator
        }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate((isOk) => {
        if (isOk) {
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          }).then(result => {
            console.log(result)
            // 将获取的token放入前端缓存中
            window.localStorage.setItem('user-token', result.data.data.token)
            // 登陆成功后跳转到首页(编程式导航)
            this.$router.push('/home')
          }).catch(() => {
            this.$message({ type: 'warning', message: '输入有误' })
          })
        } else {
          this.$message({ type: 'warning', message: 'error' })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
    .login {
        background: url('../../assets/img/login_bg.jpg');
        height: 100vh;
        background-size: cover;
        display: flex;
        justify-content: center;  // 主轴
        align-items: center; // 侧轴
        .login-card {
            width: 440px;
            height: 350px;
            .logo {
                text-align: center;
                img {
                    height: 45px;
                }
            }
        }
    }
</style>
