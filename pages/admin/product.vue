<template>
  <div>
    <h1>产品管理</h1>
    <el-button v-on:click="isAdd = true" v-if="!isAdd">添加</el-button>
    <el-table
      v-if="!isAdd"
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
    <el-form v-if="isAdd" v-cloak :rules="rules" ref="form" :model="ruleForm" label-width="80px" style="width: 80%">
      <el-form-item label="产品名称" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="封面图" prop="cover">
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:8360/api/upload/image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="ruleForm.cover" :src="ruleForm.cover" class="avatar" />
          <i class="el-icon-plus avatar-uploader-icon" v-else></i>
        </el-upload>
        <input type="hidden" v-model="ruleForm.coverid" />
      </el-form-item>
      <el-form-item label="详情图" prop="thumbs">
        <el-upload
          class="upload-demo"
          action="http://127.0.0.1:8360/api/upload/image"
          :on-preview="handlePreview"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          :file-list="ruleForm.thumbs"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件，且不超过500kb</div>
        </el-upload>
        <input type="hidden" v-model="ruleForm.thumbsid" />
      </el-form-item>
      <el-form-item label="产品描述" prop="content">
        <div class="quill-editor"
             :content="ruleForm.content"
             v-model="ruleForm.content"
             v-quill:myQuillEditor="editorOption">
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">确定</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Service from '~plugins/axios'

  export default {
    data () {
      return {
        tableData3: [],
        isAdd: false,  //  是否是添加
        ruleForm: {
          title: '',
          cover: '',
          coverid: '',
          thumbs: [],
          thumbsid: [],
          content: ''
        },
        rules: {
          title: [
            { required: true, message: '请输入产品名称', trigger: 'blur' }
          ],
          coverid: [
            { required: false, message: '请上传封面图', trigger: 'blur' }
          ],
          thumbsid: [
            { required: false, message: '请上传详情图', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入产品描述', trigger: 'blur' }
          ]
        },
        editorOption: {}
      }
    },
    layout: 'admin',
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
      },
      onSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            Service.post('/api/product/add', {
              title: this.ruleForm.title,
              coverid: this.ruleForm.coverid,
              thumbsid: this.ruleForm.thumbsid,
              content: this.ruleForm.content
            }).then(response => {
              console.log(response)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      handleAvatarSuccess (res, file) {
        this.ruleForm.cover = URL.createObjectURL(file.raw)
        this.ruleForm.coverid = res.data.data.file._id
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
      },
      handleRemove (file, fileList) {
        for (let key in this.ruleForm.thumbsid) {
          if (file.uid === this.ruleForm.thumbsid[key].uid) {
            this.ruleForm.thumbsid.splice(key, 1)
            break
          }
        }
      },
      handlePreview (file) {
        console.log(file)
      },
      handleSuccess (res, file, filelist) {
        this.ruleForm.thumbsid.push({
          uid: file.uid,
          id: res.data.data.file._id
        })
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  .ql-container .ql-editor {
    min-height: 20em;
    max-height: 25em;
  }
  .el-form-item__content .ql-toolbar {
    line-height: 24px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
