<template>
  <el-row :gutter="20">
    <el-col :span="6" v-for="(item, index) in list" :key="item">
      <el-card>
        <img :src="item.img" class="image">
        <div class="detail">
          <div class="price">{{item.price}}</div>
          <div class="content">{{item.describle}}</div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data () {
      return {
        list: [
          {
            img: 'assets/images/hamburger.png',
            router: '',
            price: 30,
            describle: 'ttest'
          },
          {
            img: 'assets/images/hamburger.png',
            router: '',
            price: 30,
            describle: 'ttest'
          }
        ]
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
