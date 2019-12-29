<template>
    <el-card>
        <bread-crumb slot="header">
            <template slot="title">
                内容管理
            </template>
        </bread-crumb>
        <!-- 搜索栏 -->
        <el-form style="margin-left: 40px">
            <el-form-item label="文章状态">
                <el-radio-group @change="changeRadio" v-model="searchForm.status">
                    <el-radio :label="5">全部</el-radio>
                    <el-radio :label="0">草稿</el-radio>
                    <el-radio :label="1">待审核</el-radio>
                    <el-radio :label="2">审核通过</el-radio>
                    <el-radio :label="3">审核失败</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="频道列表">
                <el-select @change="changeRadio" v-model="searchForm.channels_id">
                    <el-option
                        v-for="item in channels"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="时间选择">
                <el-date-picker
                    @change="changeRadio"
                    value-format="yyyy-MM-dd"
                    v-model="searchForm.dateRange"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <!-- 内容部分 -->
        <div class="total_info">共找到9999条符合条件的内容</div>
        <div class="article_list">
            <!-- 循环项 -->
            <div v-for="(item,index) in list" :key="index" class="every">
                <!-- 左侧 -->
                <div class="left">
                    <img :src="item.cover.images.length ? item.cover.images[0] : address" alt="">
                    <div class="info">
                        <span>{{item.title}}</span>
                        <el-tag style="width: 75px">{{item.status | statusText}}</el-tag>
                        <span class="date">{{item.pubdate}}</span>
                    </div>
                </div>
                <!-- 右侧 -->
                <div class="right">
                    <span><i class="el-icon-edit"></i>修改</span>
                    <span><i class="el-icon-delete"></i>删除</span>
                </div>
            </div>
        </div>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [1, 2, 3, 4, 5, 6, 7],
      address: require('../../assets/img/404.png'),
      searchForm: {
        //   表单数据对象
        status: 5,
        channels_id: null,
        dateRange: ''
      },
      channels: []
    }
  },
  methods: {

    // 单选框改变
    changeRadio: function () {
      this.$axios({
        url: '/articles',
        params: {
          status: this.searchForm.status === 5 ? null : this.searchForm.status,
          channels_id: this.searchForm.channels_id,
          begin_pubdate: this.searchForm.dateRange > 0 ? this.searchForm.dateRange[0] : null,
          end_pubdate: this.searchForm.dateRange > 1 ? this.searchForm.dateRange[1] : null
        }
      }).then(res => {
        this.list = res.data.results
      })
    },
    // 获取文章频道
    getChannels: function () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        console.log(res)
        this.channels = res.data.channels
      })
    },
    // 初始数据
    getArticles: function () {
      this.$axios({
        url: '/articles'
      }).then(res => {
        console.log(res)
        this.list = res.data.results
      })
    }
  },
  created: function () {
    this.getArticles()
    this.getChannels()
  },
  filters: {
    statusText: function (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '审核通过'
        case 3:
          return '审核失败'
        default:
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.total_info {
    padding: 15px 0;
    border-bottom: 1px dashed #ccc;
}
.article_list {
    .every {
        display: flex;
        justify-content: space-between;
        padding: 10px 5px;
        border-bottom: 1px solid #f2f3f5;
        .left {
            display: flex;
            img {
                width: 150px;
                height: 100px;
                border-radius: 4px;
            }
            .info {
                height: 100px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                margin-left: 15px;
                .date {
                    color: #999;
                    font-size: 12px;
                }
            }
        }
        .right {
            font-size: 12px;
            cursor:pointer;
            span:nth-child(1) {
                margin-right: 10px;
            }
        }
    }
}
</style>
