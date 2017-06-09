<template>
  <el-card>
    <img :src="list.img" class="image">
    <h1>{{list.title}}</h1>
    <ul class="thumb">
      <li v-for="item in list.thumbs">
        <img :src="item.src" :alt="item.alt">
      </li>
    </ul>
    <div class="detail">
      <div class="price">{{list.price}}</div>
      <div class="content" v-html="list.content"></div>
    </div>
  </el-card>
</template>

<script>
  import Service from '~plugins/axios'
  export default {
    data () {
      return {
        list: {}
      }
    },
    mounted () {
      this.getDetail()
    },
    methods: {
      getDetail () {
        let self = this
        let id = self.$route.query.id
        Service.get('/api/product/detail?id=' + id).then(data => {
          self.list = JSON.parse(data.request.response).data
        })
      }
    }
  }
</script>

