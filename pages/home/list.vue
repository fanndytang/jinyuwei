<template>
  <el-row :gutter="20">
    <el-col :span="6" v-for="(item, index) in list" :key="item">
      <el-card>
        <img :src="item.src" class="image">
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
  import Service from '~plugins/axios'
  export default {
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
        Service.get('/api/product/list').then(data => {
          self.list = JSON.parse(data.request.response).data
        })
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  .el-card {
    border-radius: 0;
    .el-card__body {
      padding: 0;
    }
    .image {
      height: 230px;
      display: block;
    }
    .detail {
      height: 60px;
    }
  }

</style>
