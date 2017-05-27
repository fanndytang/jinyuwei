<template>
  <el-card>
    <img :src="list.img" class="image">
    <div class="detail">
      <div class="price">{{list.price}}</div>
      <div class="content">{{list.describle}}</div>
    </div>
  </el-card>
</template>

<script>
  export default {
    data () {
      return {
        list: {
          img: 'assets/images/hamburger.png',
          router: '',
          price: 30,
          describle: 'ttest'
        }
      }
    }
  }
</script>

