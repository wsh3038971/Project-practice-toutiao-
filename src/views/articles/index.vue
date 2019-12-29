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
                <el-radio-group>
                    <el-radio label="线上品牌商赞助">全部</el-radio>
                    <el-radio label="线下场地免费">草稿</el-radio>
                    <el-radio label="线下场地免费">待审核</el-radio>
                    <el-radio label="线下场地免费">审核通过</el-radio>
                    <el-radio label="线下场地免费">审核失败</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="频道列表">
                <el-select></el-select>
            </el-form-item>
            <el-form-item label="时间选择">
                <el-date-picker
                    v-model="value1"
                    type="datetimerange"
                    range-separator="至"
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
                    <img src="../../assets/img/404.png" alt="">
                    <div class="info">
                        <span>有内鬼,取消交易</span>
                        <el-tag style="width: 60px">已发表</el-tag>
                        <span class="date">2019年12月29日12:49:32</span>
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
      list: [1, 2, 3, 4, 5, 6, 7]
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
