<template>
  <div>
    <h1>设置</h1>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="logo管理" name="logo管理">
        <my-logo></my-logo>
      </el-tab-pane>
      <el-tab-pane label="权限管理" name="权限管理">
        <my-auth></my-auth>
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="角色管理">
        <my-role></my-role>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import auth from '../components/auth.vue'
  import role from '../components/role.vue'
  import logo from '../components/logo.vue'

  export default {
    data () {
      return {
        activeName: '权限管理'
      }
    },
    layout: 'admin',
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      }
    },
    components: {
      'my-auth': auth,
      'my-role': role,
      'my-logo': logo
    }
  }
</script>
