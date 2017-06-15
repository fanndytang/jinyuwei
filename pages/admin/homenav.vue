<template>
  <div>
    <el-table
      :data="list"
      border
      style="width: 100%">
      <el-table-column
        prop="title"
        label="导航名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="link"
        label="导航链接"
        width="180">
      </el-table-column>
      <el-table-column
        prop="target"
        label="是否新窗口">
      </el-table-column>
      <el-table-column
        prop="sort"
        label="序号">
      </el-table-column>
      <el-table-column
        label="操作">
        <template scope="scope">
          <el-button @click="updateNav(tableData3[scope.$index]._id, scope.$index)" type="text" size="small">修改</el-button>
          <el-button @click="deleteNav(tableData3[scope.$index]._id, scope.$index)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-form v-cloak :rules="rules" ref="form" :model="ruleForm" label-width="120px" style="width: 80%">
      <el-form-item label="导航名称" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="导航链接" prop="link">
        <el-input v-model="ruleForm.link"></el-input>
      </el-form-item>
      <el-form-item label="是否新窗口">
        <el-select v-model="ruleForm.target" placeholder="请选择">
          <el-option label="新窗口" value="_blank"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="序号" prop="sort">
        <el-input v-model="ruleForm.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="addNav('form')">确定</el-button>
        <el-button v-on:click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Service from '~plugins/axios'
  export default {
    data () {
      return {
        list: [],
        ruleForm: {
          title: '',
          link: '',
          target: '',
          sort: ''
        },
        rules: {
          title: [
            { required: true, message: '请输入导航名称', trigger: 'blur' }
          ],
          link: [
            { required: false, message: '请输入导航链接', trigger: 'blur' }
          ],
          target: [
            { required: false, message: '请选择新窗口打开方式', trigger: 'blur' }
          ],
          content: [
            { required: false, message: '导航序号格式有误', trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {
      this.getNav()
    },
    methods: {
      getNav () {
        let self = this
        Service.get('/api/nav/list?type=home').then(data => {
          self.list = JSON.parse(data.request.response).data
        })
      },
      deleteNav (id, index) {
        let self = this
        Service.post('/api/nav/delete', {
          id: id
        }).then(data => {
          self.list.splice(index, 1)
        })
      },
      updateNav (id, index) {
        let self = this
        Service.post('/api/nav/update', {
          id: id,
          title: '',
          link: '',
          sort: '',
          target: ''
        }).then(data => {
          self.list.splice(index, 1, JSON.parse(data.request.response).data)
        })
      },
      addNav (formName) {
        let self = this
        Service.post('/api/nav/add', {
          title: self.ruleForm.title,
          link: self.ruleForm.link,
          sort: self.ruleForm.sort,
          target: self.ruleForm.target,
          type: 'home'
        }).then(data => {
          self.list.push({
            _id: '',
            title: self.ruleForm.title,
            link: self.ruleForm.link,
            sort: self.ruleForm.sort,
            target: self.ruleForm.target
          })
        })
      }
    }
  }
</script>
