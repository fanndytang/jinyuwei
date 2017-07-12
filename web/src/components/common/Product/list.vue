<template>
  <div class="box clearfix">
    <el-card class="item" v-for="(item, index) in list" :key="item">
      <div class="image"><img :src="item.coverurl"></div>
      <el-row class="detail">
        <el-col :span="12" class="title">{{item.title}}</el-col>
        <el-col :span="12" class="price">￥{{item.price}}<span class="discount">({{item.discount}}%)</span></el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  export default {
    props: {
      filters: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        list: []
      };
    },
    mounted() {
      this.getList();
    },
    methods: {
      getList() {
        let self = this;
        self.$http.get('/api/product/list').then(data => {
            self.list = JSON.parse(data.request.response).data;
        });
      }
    }
  };
</script>

<style rel="stylesheet/less" lang="less">
  .el-card__body {
    overflow: hidden;
    border: 1px solid #eee;
    padding: 20px 20px 10px 20px;
  }
</style>
<style rel="stylesheet/less" lang="less" scoped>
  .box {
    display: flex;
    align-items: stretch;
    flex-wrap: wrap;
    margin-top: -10px;
  }
  .el-card {
    background: transparent;
    width: 22%;
    box-shadow: none;
    padding: 10px;
    border: 0;
    border-radius: 0;
    font-size: 14px;
    text-align: center;
    .image {
      width: 100%;
      overflow: hidden;
      img {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        height: 150px;
      }
    }
    .detail {
      line-height: 30px;
      text-align: left;
      border-top: 1px solid #f5f5f5;
      margin: 20px -20px 0 -20px;
      padding: 10px 20px 0 20px;
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
