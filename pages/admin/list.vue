<template>
  <el-table
    :data="tableData3"
    border
    style="width: 100%">
    <el-table-column
      prop="title"
      label="产品名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="cover"
      label="封面图"
      width="180">
    </el-table-column>
    <el-table-column
      prop="thumbs"
      label="详情图">
    </el-table-column>
    <el-table-column
      label="操作">
      <template scope="scope">
        <router-link :to="{ path: '/home/detail', query: { id: tableData3[scope.$index]._id }}">查看</router-link>
        <el-button @click="handleClick(tableData3[scope.$index]._id, scope.$index)" type="text" size="small">删除</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import Service from '~plugins/axios'
  export default {
    data () {
      return {
        tableData3: []
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      handleClick (id, index) {
        let self = this
        Service.post('/api/product/delete', {id: id}).then(data => {
          self.tableData3.splice(index, 1)
        })
      },
      getList () {
        let self = this
        Service.get('/api/product/list').then(data => {
          self.tableData3 = JSON.parse(data.request.response).data
        })
      }
    }
  }
</script>
