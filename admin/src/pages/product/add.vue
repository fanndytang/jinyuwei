<template>
    <el-form v-cloak :rules="rules" ref="form" :model="form" label-width="80px" style="width: 80%">
        <el-form-item label="产品名称" prop="title"><el-input v-model="form.title"></el-input></el-form-item>
        <el-form-item label="简介" prop="summary"><el-input v-model="form.summary"></el-input></el-form-item>
        <el-form-item label="封面图" prop="cover">
            <el-upload class="avatar-uploader" action="/api/upload/image"
                       :show-file-list="false"
                       :on-error="upload.cover.failedUpload"
                       :on-change="upload.cover.changeUpload"
                       :on-success="upload.cover.successUpload"
                       :before-upload="upload.cover.beforeUpload">
                <img v-if="upload.cover.src" :src="upload.cover.src" class="avatar" />
                <i class="el-icon-plus avatar-uploader-icon" v-else></i>
            </el-upload>
            <el-input type="hidden" v-model="form.cover" style="display:none;"></el-input>
        </el-form-item>
        <el-form-item label="详情图" prop="thumbs">
            <el-upload class="upload-demo" action="/api/upload/image"
                    :on-success="handleSuccess"
                    :on-remove="handleRemove"
                    :file-list="upload.thumbs"
                    list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件，且不超过500kb</div>
            </el-upload>
            <el-input type="hidden" v-model="form.thumbs" style="display:none;"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="category">
            <el-upload class="upload-demo" action="/api/upload/image"
                       :on-success="handleSuccess1"
                       :on-remove="handleRemove1"
                       :file-list="upload.category"
                       list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件，且不超过500kb</div>
            </el-upload>
            <el-input type="hidden" v-model="form.category" style="display:none;"></el-input>
        </el-form-item>
        <el-form-item label="产品描述" prop="content">
            <quill-editor v-model="form.content" ref="myQuillEditor"
                          :content="form.content"
                          :options="editorOption">
            </quill-editor>
        </el-form-item>
        <el-form-item label="产品价格" prop="price" style="width:50%;">
            <el-input v-model="form.price"  type="number"  min="0" max="100" placeholder="请输入价格">
                <template slot="append">元</template>
            </el-input>
        </el-form-item>
        <el-form-item label="产品抵扣" prop="discount" style="width:50%;">
            <el-input v-model="form.discount" type="number"  min="0" max="100" placeholder="请输入抵扣百分比">
                <template slot="append">%</template>
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">确定</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        data () {
            return {
                upload: {
                    cover: this.MyMain.setUpload(),
                    thumbs: [],
                    category: []
                },
                form: {
                    title: '',
                    summary: '',
                    cover: '',
                    thumbs: '',
                    category: '',
                    content: '',
                    price: '',
                    discount: 0  //  折扣比率
                },
                rules: {
                    title: [
                        { required: true, message: '请输入产品名称', trigger: 'blur' }
                    ],
                    summary: [
                        { required: true, message: '请输入产品简介', trigger: 'blur' }
                    ],
                    cover: [
                        { required: true, message: '请上传封面图', trigger: 'blur' }
                    ],
                    thumbs: [
                        { required: false, message: '请上传详情图', trigger: 'blur' }
                    ],
                    category: [
                        { required: false, message: '请上传分类图', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请输入产品描述', trigger: 'blur' }
                    ],
                    price: [
                        { required: true, message: '请输入产品价格', trigger: 'blur' }
                    ]
                },
                editorOption: {}
            }
        },
        watch: {
            "upload.cover.fid": function(val) {
                this.form.cover = val;
            },
            "upload.thumbs": function(val) {
                let arr = [];
                for(let key in val) {
                    arr[key] = val[key].fid;
                }
                this.form.thumbs = arr.join(',');
            },
            "upload.category": function(val) {
                let arr = [];
                for(let key in val) {
                    arr[key] = val[key].fid;
                }
                this.form.category = arr.join(',');
            }
        },
        methods: {
            onSubmit (formName) {
                let that = this;
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        that.$http.post('/api/product/add', that.form).then(res => {
                            that.$message({
                                message: res.data.data.info,
                                type: 'success'
                            });
                            window.location.reload();
                          //  that.$parent.$emit('add', {
//
                           // });
                        }).catch(() =>{});
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            resetForm (formName) {
                this.$refs[formName].resetFields()
            },
            handleRemove (file, fileList) {
                for (let key in this.upload.thumbs) {
                    if (file.uid === this.upload.thumbs[key].uid) {
                        this.upload.thumbs.splice(key, 1)
                        break
                    }
                }
            },
            handleSuccess (res, file, filelist) {
                this.upload.thumbs.push({
                    uid: file.uid,
                    url: file.url,
                    fid: res.data.data.file._id
                });
            },

            handleRemove1 (file, fileList) {
                for (let key in this.upload.category) {
                    if (file.uid === this.upload.category[key].uid) {
                        this.upload.category.splice(key, 1)
                        break
                    }
                }
            },
            handleSuccess1 (res, file, filelist) {
                this.upload.category.push({
                    uid: file.uid,
                    url: file.url,
                    fid: res.data.data.file._id
                });
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
