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
          <el-button @click="openOrClose(scope.row)" type="text" :style="{color: scope.row.comment_status ? '#E6A23C' : '#409EFF'}">{{scope.row.comment_status ? "关闭评论" : "打开评论"}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="pageChange"
      :current-page="page.page"
      style="margin: 10px 0"
      align="center"
      background
      layout="prev, pager, next"
      :size-change="page.pageSize"
      :total="page.total">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        page: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  methods: {
    // 分页改变
    pageChange: function (e) {
      console.log(e)
      this.page.page = e
      this.getComment()
    },
    // 打开或关闭评论按钮
    openOrClose: function (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`是否${mess}评论`, '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios({
          url: '/comments/status',
          method: 'put',
          params: {
            article_id: row.id.toString()
          },
          data: {
            allow_comment: !row.comment_status
          }
        }).then(res => {
          console.log(res)
          this.getComment()
        })
      })
    },
    // 评论状态
    test: function (row) {
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
          response_type: 'comment',
          page: this.page.page,
          per_page: this.page.pageSize
        }
      }).then(res => {
        console.log('列表数据', res)
        this.list = res.data.results
        this.page.page = res.data.page
        this.page.total = res.data.total_count
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
