<template>
  <div>
   <!-- <h1>产品管理</h1>-->
    <el-button v-on:click="isAdd = true" v-show="!isAdd" style="margin: 20px 0;">添加</el-button>
    <proList v-show="!isAdd"></proList>
    <proAdd v-show="isAdd"></proAdd>
  </div>
</template>

<script>
  import proList from 'src/pages/product/list.vue'
  import proAdd from 'src/pages/product/add.vue'

  export default {
      data () {
          return {
              isAdd: false
          }
      },
      mounted: function() {
       //   let that = this;
      //    that.$on('add', function() {
          //    that.isAdd = false;
        //  });
      },
      components: {
        proList,
          proAdd
      }
  }
</script>

