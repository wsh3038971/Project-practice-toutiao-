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
                            <i class="el-icon-delete-solid"></i>
                        </el-row>
                    </el-card>
                </div>
            </el-tab-pane>
            <el-tab-pane label="收藏" name="second">
                <div class="card_list">
                    <el-card class="img_card" v-for="(item,index) in list" :key="index">
                        <img :src="item.url" alt="">
                    </el-card>
                </div>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first',
      list: []
    }
  },
  methods: {
    // tab切换
    handleClick: function () {
      this.getMaterial()
    },
    // 初始数据
    getMaterial: function () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'second'
        }
      }).then(res => {
        console.log(res)
        this.list = res.data.results
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
            justify-content: center;
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
