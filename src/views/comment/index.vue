<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="list">
      <el-table-column prop="title" label="标题" width="700"></el-table-column>
      <el-table-column :formatter="test" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text">修改</el-button>
          <el-button type="text" :style="{color: scope.row.comment_status ? '#E6A23C' : '#409EFF'}">{{scope.row.comment_status ? "打开评论" : "关闭评论"}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    test: function (row) {
      console.log('row', row)
      if (row.comment_status) {
        return '关闭'
      } else {
        return '打开'
      }
    },
    // 获取评论数据
    getComment: function () {
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(res => {
        console.log('列表数据', res)
        this.list = res.data.results
      })
    }
  },
  created: function () {
    this.getComment()
  }
}
</script>

<style>

</style>
