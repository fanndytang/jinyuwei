<template>
  <div>
    <el-form v-cloak :rules="rules" ref="form" :model="ruleForm" label-width="80px" style="width: 80%">
      <el-form-item label="产品名称" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="封面图" prop="cover">
     <!--   <a class="btn" @click="toggleShow">设置头像</a>
        <div id="app">
          <a class="btn" @click="toggleShow">set avatar</a>
          <vue-image-crop-upload field="img"
                                 v-model="show"
                                 :width="300"
                                 :height="300"
                                 url="/upload"
                                 :params="params"
                                 :headers="headers"
                                 img-format="png"></vue-image-crop-upload>
          <img :src="imgDataUrl">
        </div>-->

        <el-input v-model="ruleForm.cover"></el-input>
      </el-form-item>
      <el-form-item label="详情图" prop="thumbs">
        <el-input v-model="ruleForm.thumbs"></el-input>
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
        ruleForm: {
          title: '',
          cover: '',
          thumbs: '',
          content: ''
        },
        rules: {
          title: [
            { required: true, message: '请输入产品名称', trigger: 'blur' }
          ],
          cover: [
            { required: false, message: '请上传封面图', trigger: 'blur' }
          ],
          thumbs: [
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
    methods: {
      onSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            Service.post('/api/product/add', {title: this.ruleForm.title, content: this.ruleForm.content}).then(response => {
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
      }
    },
    mounted () {}
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
</style>
