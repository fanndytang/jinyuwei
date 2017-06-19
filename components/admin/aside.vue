<template>
  <div>
    <el-menu v-cloak  style="height: 800px;" default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
      <div v-for="(item, index) in list" :key="index">
        <el-submenu v-if="!!item.list && !!item.list.length" v-bind:index="index+1">
          <template slot="title">{{item.icon}}{{item.title}}</template>
          <el-menu-item v-for="(el, elindex) in item.list" :key="elindex" v-bind:index="index+1 + '-' + elindex+1">
            <nuxt-link :to="el.link">
              {{el.icon}}{{el.title}}
            </nuxt-link>
          </el-menu-item>
        </el-submenu>

        <el-menu-item v-if="!item.list || !!item.list && !item.list.length" v-bind:index="index+1">
          <nuxt-link :to="item.link">
            <i class="item.icon"></i>
            {{item.title}}
          </nuxt-link>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
  import Service from '~plugins/axios'
  import Main from '~plugins/main'

  export default {
    data () {
      return {
        list: []
      }
    },
    mounted: function () {
      this.getMainNav()
    },
    methods: {
      getMainNav () {
        let self = this
        Service.get('/api/nav/list?type=4').then(data => {
          let list = JSON.parse(data.request.response).data
          list = list.sort(Main.compare('sort'))
          self.list = list
        })
      },
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
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
