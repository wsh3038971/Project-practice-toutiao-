<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">
        发布文章
      </template>
    </bread-crumb>
    <el-form ref="publishForm" label-width="100px" :model="formData" :rules="publishRules">
      <el-form-item label="标题" prop="title">
        <el-input style="width: 400px" v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <!-- 富文本 -->
        <quill-editor type="textarea" v-model="formData.content" style="height: 300px"></quill-editor>
      </el-form-item>
      <el-form-item label="封面" style="margin-top: 60px" prop="cover">
        <el-radio-group @change="changeCovertype" v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <cover-image @onClickImg="receiveImg" :images="formData.cover.images"></cover-image>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <el-select v-model="formData.channel_id">
          <el-option v-for="(item,index) in channels" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publish(false)">发表文章</el-button>
        <el-button @click="publish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    let func = function (rule, value, callBack) {
      if (value.type === 1) {
        (value.images.length === 1 && value.images[0]) ? callBack() : callBack(new Error('请设置单图封面'))
      } else if (value.type === 3) {
        if (value.images.length === 3 && value.images[0] && value.images[1] && value.images[2]) {
          callBack()
        } else {
          callBack(new Error('请设置三图封面'))
        }
      } else {
        // 无图或者自动
        if (value.images.length > 0) {
          callBack(new Error('您的封面设置有误'))
        } else {
          callBack()
        }
      }
    }
    return {
      channels: [],
      formData: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      publishRules: {
        title: [{
          required: true,
          message: '请填写标题'
        }, {
          min: 5,
          max: 30,
          message: '标题长度不够(5-30)'
        }],
        content: [{
          required: true,
          message: '请填写内容'
        }],
        channel_id: [{
          required: true,
          message: '请选择频道'
        }],
        cover: [{
          validator: func
        }]
      }
    }
  },
  methods: {
    // 接收子组件传递的url
    receiveImg: function (url, index) {
      this.formData.cover.images = this.formData.cover.images.map(function (item, i) {
        if (i === index) {
          return url
        } else {
          return item
        }
      })
      // this.formData.cover.images[index] = url
    },
    // 封面选择
    changeCovertype: function () {
      if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      } else {
        this.formData.cover.images = []
      }
    },
    // 发布文章/存入草稿按钮
    publish: function (draft) {
      this.$refs.publishForm.validate(isOk => {
        if (isOk) {
          let { articleId } = this.$route.params
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: {
              draft
            },
            data: this.formData
          }).then(res => {
            this.$router.push('/home/articles')
          })
        }
      })
    },
    // 频道数据
    getChannels: function () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    // 获取当前文章数据
    getArticleById: function (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(res => {
        this.formData = res.data
      })
    }
  },
  created: function () {
    // 获取频道数据
    this.getChannels()
    let { articleId } = this.$route.params
    if (articleId) {
      console.log(articleId)
      this.getArticleById(articleId)
    }
  }
}
</script>

<style>

</style>
