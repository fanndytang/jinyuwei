<template>
    <div>
        <el-table :data="list" border style="width: 100%">
            <el-table-column prop="title" label="名称"></el-table-column>
            <el-table-column prop="link" label="链接"></el-table-column>
            <el-table-column prop="target" label="新窗口打开"></el-table-column>
            <el-table-column prop="sort" label="序号"></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button @click="updateNav(list[scope.$index]._id, scope.$index)" type="text" size="small">修改</el-button>
                    <el-button @click="deleteNav(list[scope.$index]._id, scope.$index)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                type: 2,
                list:[]
            }
        },
        mounted () {
            let that = this;
            that.getNav();
        },
        methods: {
            getNav () {
                let that = this;
                that.$http.get('/api/nav/list?type=' +that.type).then((data) => {
                    that.list = data.data.data.sort(that.MyMain.compare('sort'));
                }).catch(error => {});
            },
            deleteNav (id, index) {
                let that = this
                that.$http.post('/api/nav/delete', {
                    id: id
                }).then(data => {
                    that.list.splice(index, 1);
                    that.$message(data.data.data.info);
                })
            },
            updateNav (id, index) {
                let that = this
                that.$http.post('/api/nav/update', {
                    id: id,
                    title: '',
                    link: '',
                    sort: '',
                    target: ''
                }).then(data => {
                    that.$store.state.nav_list.splice(index, 1, JSON.parse(data.request.response).data)
                })
            },
            resetForm (formName) {
                this.$refs[formName].resetFields()
            },
            submitForm () {
                let that = this
                let target = that.ruleForm.target === '是' ? 1 : 2
                that.$http.post('/api/nav/add', {
                    title: that.ruleForm.title,
                    link: that.ruleForm.link,
                    sort: that.ruleForm.sort,
                    target: target,
                    type: that.type
                }).then(data => {
                    let max = parseInt(data.data.data.data.max)  //  服务器返回，最大值
                    for (let key in that.list) {
                        if (parseInt(that.list[key].sort) === parseInt(that.ruleForm.sort)) {
                            that.$store.state.nav_list[key].sort = max + 1
                            break
                        }
                    }
                    that.$store.state.nav_list.push({
                        _id: data.data.data.data._id,
                        title: that.ruleForm.title,
                        link: that.ruleForm.link,
                        sort: that.ruleForm.sort,
                        target: that.ruleForm.target
                    })

                    let list = that.list
                    that.$store.state.nav_list = []
                    that.$store.state.nav_list = list.sort(that.MyMain.compare('sort'))
                    that.ruleForm.sort = max + 1
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
