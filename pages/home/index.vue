<template>
 <div>
  <el-carousel :interval="4000" type="card" height="200px">
   <el-carousel-item v-for="item in bannerList" :key="item">
    <nuxt :to="item.link">
     <img :src="item.picture" :alt="item.content">
    </nuxt>
   </el-carousel-item>
  </el-carousel>

  <h5>推荐列表</h5>
  <my-list :filters="filters"></my-list>
 </div>
</template>

<script>
  import Service from '~plugins/axios'
  import List from '~components/default/productlist.vue'

  export default {
    data () {
      return {
        filters: {},
        bannerList: []
      }
    },
    mounted () {
      this.getBanner()
    },
    methods: {
      getBanner () {
        let self = this
        Service.get('/api/advert/list?group=index').then(data => {
          self.bannerList = JSON.parse(data.request.response).data
        })
      }
    },
    components: {
      'my-list': List
    }
  }
</script>
