<template>
    <el-card class="material">
        <bread-crumb slot="header">
            <template slot="title">
                素材管理
            </template>
        </bread-crumb>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全部" name="first">
                <div class="card_list">
                    <el-card class="img_card" v-for="(item,index) in list" :key="index">
                        <img :src="item.url" alt="">
                        <el-row type="flex" align="middle" justify="space-around" class="operate">
                            <i :style="{color: item.is_collected ? 'red' : '#303133'}" class="el-icon-star-on"></i>
                            <i @click="delImg(item)" class="el-icon-delete-solid"></i>
                        </el-row>
                    </el-card>
                </div>
                <el-pagination
                    align="center"
                    :page-size="page.pageSize"
                    :current-page="page.page"
                    @current-change="pageChange"
                    background
                    layout="prev, pager, next"
                    :total="page.total">
                </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="收藏" name="second">
                <div class="card_list">
                    <el-card class="img_card" v-for="(item,index) in list" :key="index">
                        <img :src="item.url" alt="">
                    </el-card>
                </div>
                <el-pagination
                    align="center"
                    :page-size="page.pageSize"
                    :current-page="page.page"
                    @current-change="pageChange"
                    background
                    layout="prev, pager, next"
                    :total="page.total">
                </el-pagination>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first',
      list: [],
      page: {
        page: 1,
        pageSize: 20,
        total: 0
      }
    }
  },
  methods: {
    // 删除图片
    delImg: function (item) {
      console.log(item)
      this.$confirm('确定删除吗', '提示').then(() => {
        this.$axios({
          url: `/user/images/${item.id}`,
          method: 'delete'
        }).then(res => {
          console.log(res)
          this.getMaterial()
        })
      })
    },
    // 分页
    pageChange: function (e) {
      this.page.page = e
      this.getMaterial()
    },
    // tab切换
    handleClick: function () {
      this.page.page = 1
      this.getMaterial()
    },
    // 初始数据
    getMaterial: function () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'second',
          page: this.page.page,
          per_page: this.page.pageSize
        }
      }).then(res => {
        console.log(res)
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  created: function () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoprd>
    .material {
        .card_list {
            display: flex;
            flex-wrap: wrap;
            .img_card {
                width: 180px;
                height: 180px;
                margin: 25px;
                position: relative;
                img {
                    width: 100%;
                    height: 100%;
                }
                .operate {
                    position: absolute;
                    height: 30px;
                    width: 100%;
                    background-color: #fff;
                    bottom: 0;
                    left: 0;
                    font-size: 20px;
                }
            }
        }
    }
</style>
