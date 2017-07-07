<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="前端顶部导航" name="前端顶部导航">
        <nav-pane type="1"></nav-pane>
      </el-tab-pane>
      <el-tab-pane label="前端主导航" name="前端主导航">
        <nav-pane type="2"></nav-pane>
      </el-tab-pane>
      <el-tab-pane label="后端顶部导航" name="后端顶部导航">
        <nav-pane type="3"></nav-pane>
      </el-tab-pane>
      <el-tab-pane label="后端主导航" name="后端主导航">
        <nav-pane type="4"></nav-pane>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import navPane from '../components/nav.vue'
  export default {
    data () {
      return {
        activeName: '后端主导航'
      }
    },
    layout: 'admin',
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      }
    },
    components: {
      'nav-pane': navPane
    }
  }
</script>
