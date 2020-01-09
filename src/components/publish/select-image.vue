<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="全部素材" name="all">
            <div class="img_list">
                <el-card class="img_item" v-for="item in list" :key="item.id">
                    <img @click="selectImg(item)" :src="item.url" alt="">
                </el-card>
            </div>
            <el-pagination
                @current-change="changePage"
                align="center"
                background
                :current-page="page.page"
                :vpage-size="page.pageSize"
                layout="prev, pager, next"
                :total="page.total">
            </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="uploadImg">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
      </el-tab-pane>
    </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        page: 1,
        pageSize: 8,
        total: 0
      }
    }
  },
  methods: {
    // 上传图片
    uploadImg: function (params) {
      let formData = new FormData()
      formData.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data: formData
      }).then(res => {
        this.$emit('onSelectImg', res.data.url)
      })
    },
    // 选择图片,传递给父组件
    selectImg: function (item) {
      this.$emit('onSelectImg', item.url)
    },
    // 分页
    changePage: function (newPage) {
      this.page.page = newPage
      this.getMaterial()
    },
    // 初始数据
    getMaterial: function () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.page,
          per_page: this.page.pageSize
        }
      }).then(res => {
        console.log(res)
        this.page.total = res.data.total_count
        this.list = res.data.results
      })
    }
  },
  created: function () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.img_list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .img_item {
        margin: 20px 10px;
        width: 170px;
        height: 130px;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
