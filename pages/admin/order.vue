<template>
  <div>
    <h1>订单管理</h1>
    <el-table
      v-if="!isAdd"
      :data="list"
      border
      style="width: 100%">
      <el-table-column
        prop="title"
        label="产品名称">
      </el-table-column>
      <el-table-column
        width="180"
        label="操作">
        <template scope="scope">
          <router-link :to="{ path: '/home/detail', query: { id: list[scope.$index]._id }}">查看</router-link>
          <el-button @click="handleClick(list[scope.$index]._id, scope.$index)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import Service from '~plugins/axios'

  export default {
    data () {
      return {
        list: []
      }
    },
    layout: 'admin',
    mounted () {
      this.getList()
    },
    methods: {
      handleClick (id, index) {
        let self = this
        Service.post('/api/order/delete', {id: id}).then(data => {
          self.list.splice(index, 1)
        })
      },
      getList () {
        let self = this
        Service.get('/api/order/list').then(data => {
          self.list = JSON.parse(data.request.response).data
        })
      }
    }
  }
</script>
