<template>
  <div>
    <h1>广告管理</h1>
    <el-button v-on:click="isAdd = true" v-if="!isAdd" style="margin: 20px 0;">添加</el-button>
    <el-table
      v-if="!isAdd"
      :data="list"
      border
      style="width: 100%">
      <el-table-column
        prop="group"
        label="所属组"
        width="180">
      </el-table-column>
      <el-table-column
        prop="link"
        label="链接"
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
        prop="content"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="image"
        label="广告图">
      </el-table-column>
      <el-table-column
        label="操作">
        <template scope="scope">
          <el-button @click="updateAdvert(list[scope.$index]._id, scope.$index)" type="text" size="small">修改</el-button>
          <el-button @click="deleteAdvert(list[scope.$index]._id, scope.$index)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-form v-if="isAdd" v-cloak :rules="rules" ref="form" :model="ruleForm" label-width="120px" style="width: 80%">
      <el-form-item label="所属组" prop="group">
        <el-input v-model="ruleForm.group"></el-input>
      </el-form-item>
      <el-form-item label="链接" prop="link">
        <el-input v-model="ruleForm.link"></el-input>
      </el-form-item>
      <el-form-item label="是否新窗口" >
        <el-radio-group v-model="ruleForm.target">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="序号" prop="sort">
        <el-input v-model="ruleForm.sort"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="content">
        <el-input v-model="ruleForm.content"></el-input>
      </el-form-item>
      <el-form-item label="广告图">
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:8360/api/upload/image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="ruleForm.images" :src="ruleForm.images" class="avatar" />
          <i class="el-icon-plus avatar-uploader-icon" v-else></i>
        </el-upload>
        <input type="hidden" v-model="ruleForm.imagesid" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="addAdvert('form')">确定</el-button>
        <el-button v-on:click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Main from '../plugins/main'

  export default {
    data () {
      return {
        list: [],
        isAdd: false, // 是否要添加
        ruleForm: {
          group: '',
          link: '',
          target: '是',
          sort: '',
          images: '',
          imagesid: '',
          content: ''
        },
        rules: {
          group: [
            { required: true, message: '', trigger: 'blur' }
          ],
          link: [
            { required: true, message: '', trigger: 'blur' }
          ],
          target: [
            { required: true, message: '', trigger: 'blur' }
          ],
          sort: [
            { required: true, message: '', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '', trigger: 'blur' }
          ]
        }
      }
    },
    layout: 'admin',
    mounted () {
      this.getAdvert()
    },
    methods: {
      getAdvert () {
        let self = this
        self.$http.get('/api/advert/list').then(data => {
          self.list = JSON.parse(data.request.response).data.sort(Main.compare('sort'))
        })
      },
      deleteAdvert (id, index) {
        let self = this
        self.$http.post('/api/advert/delete', {
          id: id
        }).then(data => {
          self.list.splice(index, 1)
        })
      },
      updateAdvert (id, index) {
        let self = this
        self.$http.post('/api/advert/update', {
          id: id,
          group: self.ruleForm.group,
          link: self.ruleForm.link,
          sort: self.ruleForm.sort,
          content: self.ruleForm.content,
          target: self.ruleForm.target,
          imagesid: self.ruleForm.imagesid
        }).then(data => {
          self.list.splice(index, 1, JSON.parse(data.request.response).data)
        })
      },
      addAdvert (formName) {
        let self = this
        self.$http.post('/api/advert/add', {
          group: self.ruleForm.group,
          link: self.ruleForm.link,
          sort: self.ruleForm.sort,
          content: self.ruleForm.content,
          target: self.ruleForm.target,
          imagesid: self.ruleForm.imagesid
        }).then(data => {
          window.location.reload()
        })
      },
      handleAvatarSuccess (res, file) {
        this.ruleForm.images = URL.createObjectURL(file.raw)
        this.ruleForm.imagesid = res.data.data.file._id
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isPNG = file.type === 'image/png'
        const isGif = file.type === 'image/gif'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG && !isPNG && !isGif) {
          this.$message.error('上传图片格式只允许jpg, png, gif')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }
</script>
