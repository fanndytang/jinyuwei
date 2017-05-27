<template>
  <div>
    <el-form v-cloak :rules="rules" ref="form" :model="ruleForm" label-width="80px" style="width: 80%">
      <el-form-item label="产品名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="封面图" prop="cover">
        <a class="btn" @click="toggleShow">设置头像</a>
        <vue-image-crop-upload field="img"
                   :width="300"
                   :height="300"
                   url="/upload"
                   :params="params"
                   :headers="headers"
                   :value.sync="show"
                   img-format="png"></vue-image-crop-upload>
        <img :src="imgDataUrl">
        <el-input v-model="ruleForm.cover"></el-input>
      </el-form-item>
      <el-form-item label="详情图" prop="thumbs">
        <el-input v-model="ruleForm.thumbs"></el-input>
      </el-form-item>
      <el-form-item label="产品描述" prop="content">
        <div class="quill-editor"
             :content="ruleForm.content"
             v-quill:myQuillEditor="editorOption">
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        show: true,
        params: {
          token: '123456798',
          name: 'avatar'
        },
        headers: {
          smail: '*_~'
        },
        imgDataUrl: '',
        ruleForm: {
          name: '',
          cover: '',
          thumbs: '',
          content: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入产品名称', trigger: 'blur' }
          ],
          cover: [
            { required: true, message: '请上传封面图', trigger: 'blur' }
          ],
          thumbs: [
            { required: true, message: '请上传详情图', trigger: 'blur' }
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
      toggleShow () {
        this.show = !this.show
      },
      onSubmit () {
        console.log('submit!')
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
</style>
