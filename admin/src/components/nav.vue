<template>
  <div>
    <el-table
      :data="list"
      border
      style="width: 100%">
      <el-table-column
        prop="title"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="link"
        label="链接">
      </el-table-column>
      <el-table-column
        prop="target"
        label="新窗口打开">
      </el-table-column>
      <el-table-column
        prop="sort"
        label="序号">
      </el-table-column>
      <el-table-column
        label="操作">
        <template scope="scope">
          <el-button @click="updateNav(list[scope.$index]._id, scope.$index)" type="text" size="small">修改</el-button>
          <el-button @click="deleteNav(list[scope.$index]._id, scope.$index)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-form v-cloak :rules="rules" ref="form" :model="ruleForm">
      <el-form-item prop="title">
        <el-input v-model="ruleForm.title" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item prop="link">
        <el-input v-model="ruleForm.link" placeholder="链接"></el-input>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="ruleForm.target">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="sort">
        <el-input type="number" v-model.number="ruleForm.sort" placeholder="导航序号" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="addNav('form')">添加</el-button>
        <el-button v-on:click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import Service from '../plugins/axios'
  import Main from '../plugins/main'

  export default {
    props: {
      type: {
        type: String,
        default: '1'
      }
    },
    data () {
      let self = this
      let checkSort = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('序号不能为空'))
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'))
          } else {
            if (value < 0) {
              self.ruleForm.sort = Math.abs(value)
            }
            callback()
          }
        }, 1000)
      }
      return {
        list: [],
        ruleForm: {
          title: '',
          link: '',
          target: '是',
          sort: ''
        },
        rules: {
          title: [
            { required: true, message: '请输入导航名称', trigger: 'blur' }
          ],
          link: [
            { required: true, message: '请输入导航链接', trigger: 'blur' }
          ],
          target: [
            { required: false, message: '请选择新窗口打开方式', trigger: 'blur' }
          ],
          sort: [
            { validator: checkSort }
          ]
        }
      }
    },
    mounted () {
      this.getNav()
    },
    methods: {
      getOneNav (callback) { //  判断同类型的是否已存在相同序号的链接
        let self = this
        let flag = false
        for (let key in self.list) {
          if (parseInt(self.list[key].sort) === parseInt(self.ruleForm.sort)) {
            flag = true
            break
          }
        }
        if (!flag) {
          Service.get('/api/nav/onenav?sort=' + self.ruleForm.sort + '&&type=' + self.type).then(data => {
            let list = JSON.parse(data.request.response).data
            flag = !!list.length
            self.changeNavTip(flag, callback)
          })
        } else {
          self.changeNavTip(flag, callback)
        }
      },
      getNav () {
        let self = this
        Service.get('/api/nav/list?type=' + self.type).then(data => {
          let list = JSON.parse(data.request.response).data
          for (let key in list) {
            list[key].target = parseInt(list[key].target) === 1 ? '是' : '否'
          }
          self.list = list.sort(Main.compare('sort'))
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
        self.$refs[formName].validate((valid) => {
          if (valid) {
            self.getOneNav(self.submitForm)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      changeNavTip (flag, callback) {
        let self = this
        if (flag) {
          self.$confirm('序号为' + self.ruleForm.sort + '的链接已存在，确定要替换其位置吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            callback()
          })
        } else {
          callback()
        }
      },
      submitForm () {
        let self = this
        let target = self.ruleForm.target === '是' ? 1 : 2
        Service.post('/api/nav/add', {
          title: self.ruleForm.title,
          link: self.ruleForm.link,
          sort: self.ruleForm.sort,
          target: target,
          type: self.type
        }).then(data => {
          let max = parseInt(data.data.data.data.max)  //  服务器返回，最大值
          for (let key in self.list) {
            if (parseInt(self.list[key].sort) === parseInt(self.ruleForm.sort)) {
              self.list[key].sort = max + 1
              break
            }
          }
          self.list.push({
            _id: data.data.data.data._id,
            title: self.ruleForm.title,
            link: self.ruleForm.link,
            sort: self.ruleForm.sort,
            target: self.ruleForm.target
          })

          let list = self.list
          self.list = []
          self.list = list.sort(Main.compare('sort'))
          self.ruleForm.sort = max + 1
        })
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .el-table {
    tr {
      th, td {
        &:nth-child(3), &:nth-child(4), &:nth-child(5) {
          text-align: center;
        }
      }
    }
  }
  .el-form {
    margin: 10px 0;
    *, *:after, *:before {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }
    &:after {
      content: '';
      display: table;
      clear: both;
    }
    .el-form-item {

      width: 20%;
      float: left;
      text-align: center;
      padding-left: 3px;
      &:first-of-type {
        padding: 0 10px 0 0;
      }
    }
  }
</style>
