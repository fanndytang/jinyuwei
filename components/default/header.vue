<template>
  <el-menu v-cloak :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item v-for="(item, index) in list" :key="index" v-bind:index="index">
      <nuxt-link :to="item.link">
        <i class="item.icon"></i>
        {{item.title}}
      </nuxt-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
  import Service from '~plugins/axios'
  import Main from '~plugins/main'

  export default {
    data () {
      return {
        activeIndex: '1',
        list: []
      }
    },
    mounted: function () {
      this.getMainNav()
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      },
      getMainNav () {
        let self = this
        Service.get('/api/nav/list?type=2').then(data => {
          let list = JSON.parse(data.request.response).data
          list = list.sort(Main.compare('sort'))
          self.list = list
        })
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  .el-menu-item a {
    display: block;
    color: #666;
    text-decoration: none;
  }
</style>
