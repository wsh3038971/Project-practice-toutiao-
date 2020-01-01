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
        <el-input type="textarea" :rows="6" style="width: 400px" v-model="formData.content"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <el-select v-model="formData.channel_id">
          <el-option v-for="(item,index) in channels" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publish">发表文章</el-button>
        <el-button>存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
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
        }],
        content: [{
          required: true,
          message: '请填写内容'
        }],
        channel_id: [{
          required: true,
          message: '请选择频道'
        }]
      }
    }
  },
  methods: {
    // 发布文章按钮
    publish: function () {
      this.$refs.publishForm.validate(function (isOk) {
        if (isOk) {

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
    }
  },
  created: function () {
    this.getChannels()
  }
}
</script>

<style>

</style>
