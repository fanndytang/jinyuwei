<template>
  <div>
    <transition name="fade" mode="out-in">
      <el-button type="primary" v-if="!isAdd" v-on:click="isAdd = true" key="add"  style="margin: 10px 0;">添加产品</el-button>
      <el-button type="primary" v-else       v-on:click="isAdd = false" key="back" style="margin: 10px 0;" >&emsp;返回&emsp;</el-button>
    </transition>

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

