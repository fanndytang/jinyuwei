<template>
  <el-row :gutter="20" class="box">
    <el-col :span="4" v-for="(item, index) in list" :key="item">
      <el-card>
        <img :src="item.coverurl" class="image">
        <h1>{{item.title}}</h1>
        <div class="detail">
          <div class="price">{{item.price}}</div>
          <div class="content" v-html="item.content"></div>
        </div>
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
    .el-card__body {
      padding: 0;
    }
    .image {
      height: 100px;
      display: block;
    }
    .detail {
      height: 60px;
    }
  }

</style>
