<template>
  <el-row :gutter="20" class="box">
    <el-col :span="4" v-for="(item, index) in list" :key="item">
      <el-card>
        <img :src="item.coverurl" class="image">
        <el-row class="detail">
          <el-col :span="12" class="title">{{item.title}}</el-col>
          <el-col :span="12" class="price">￥{{item.price}}<span class="discount">({{item.discount}}%)</span></el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    props: {
      filters: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        list: []
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      getList () {
        let self = this
        self.$http.get('/api/product/list').then(data => {
          self.list = JSON.parse(data.request.response).data
        })
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .el-card {
    border-radius: 0;
    font-size: 14px;
    text-align: center;
    .el-card__body {
      padding: 20px 20px 10px 20px;
    }
    .image {
      height: 134px;
    }
    .detail {
      line-height: 30px;
      text-align: left;
      border-top: 1px solid #f5f5f5;
      margin-top: 20px;
      padding-top: 10px;
    }
    .price {
      text-align: right;
      .discount {
        margin: 0 2px;
        color: orange;
        font-size: 80%;
      }
    }
  }

</style>
