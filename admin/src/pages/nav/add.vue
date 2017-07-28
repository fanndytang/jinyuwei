<template>
    <el-form v-cloak :rules="rules" ref="ruleForm" :model="ruleForm">
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
        <el-form-item prop="type">
            <el-input type="number" v-model.number="ruleForm.type" placeholder="导航类型" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="addNav('ruleForm')">添加</el-button>
            <el-button @click="$refs['ruleForm'].resetFields()">重置</el-button>

         <!--   <el-button @click="ruleForm.type = 4">添加后端导航</el-button>-->
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
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
                ruleForm: {
                    title: '',
                    link: '',
                    target: '是',
                    sort: '',
                    type: 2
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
        methods: {
            addNav (formName) {
                let that = this
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                      //  console.log(that.$store.state);
                        let flag = that.MyMain.arrayIn(that.$store.state.nav_list.map((data) => {
                            return data.sort;
                        }), that.ruleForm.sort);
                        if(flag) {
                            that.$confirm('序号为' + that.ruleForm.sort + '的链接已存在，确定要替换其位置吗？', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                that.submitForm()
                            }).catch(() => {

                            })
                        }else {
                            that.$http.get('/api/nav/onenav?sort=' + that.ruleForm.sort + '&&type=' + that.type).then(data => {
                                let list = JSON.parse(data.request.response).data
                                flag = !!list.length
                                if (flag) {
                                    that.$confirm('序号为' + that.ruleForm.sort + '的链接已存在，确定要替换其位置吗？', '提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        type: 'warning'
                                    }).then(() => {
                                        that.submitForm()
                                    })
                                } else {
                                    that.submitForm()
                                }
                            })
                        }
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            submitForm () {
                let that = this;
                that.$http.post('/api/nav/add', that.ruleForm).then(data => {
                    that.$message({
                        message: data.data.data.info,
                        type: 'success'
                    });
                   /* that.list.push({
                        _id: data.data.data.data._id,
                        title: that.ruleForm.title,
                        link: that.ruleForm.link,
                        sort: that.ruleForm.sort,
                        target: that.ruleForm.target
                    });*/
                    that.$emit('add',{
                        _id: data.data.data.data._id,
                        title: that.ruleForm.title,
                        link: that.ruleForm.link,
                        sort: that.ruleForm.sort,
                        target: that.ruleForm.target
                    });
                 /*   that.$store.state.nav_list.push({

                    });*/
               //     console.log(that.$store.state.nav_list)
                  /*  that.add = {
                        max: parseInt(data.data.data.data.max),
                    }*/
                }).catch(() => {})
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
