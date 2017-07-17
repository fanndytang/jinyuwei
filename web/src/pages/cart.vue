<template>
    <div>
        <el-row class="header">
            <el-col :span="12" class="h1">我的清单</el-col>
            <el-col :span="12" class="" style="text-align:right;">联系店主</el-col>
        </el-row>
        <section class="cart-detail">
            <el-table ref="multipleTable" :data="list" stripe
                    tooltip-effect="dark" style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="商品名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="picture" label="缩略图"></el-table-column>
                <el-table-column label="数量">
                    <template scope="scope"><el-input-number size="small" v-model="scope.row.num"></el-input-number></template>
                </el-table-column>
                <el-table-column prop="price" label="价格"></el-table-column>
            </el-table>
        </section>
        <section class="cart-userinfo">
            <el-input v-model="userinfo.contact" class="input" placeholder="请输入您的手机号码或邮箱"></el-input>
            <el-input v-model="userinfo.username" class="input" placeholder="请输入您的姓名"></el-input>
            <el-input v-model="userinfo.address" type="textarea" class="input" placeholder="请输入您的地址"></el-input>
        </section>
        <footer>
            <el-button @click="selectAll()">全选</el-button>
            <el-button @click="clearAll()">取消选择</el-button>
            <el-button @click="submitFunc()">确认</el-button>
        </footer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                userinfo: {
                    contact: '',
                    username: '',
                    address: ''
                },
                list: [{
                    name: '王小虎',
                    picture: '',
                    num: 1,
                    price: 124
                }, {
                    name: '王小虎',
                    picture: '',
                    num: 1,
                    price: 215416
                }],
                multipleSelection: []
            }
        },

        methods: {
            selectAll() {
               // console.log( this.$refs.multipleTable)
               // rows.forEach(row => {
                  //  this.$refs.multipleTable.setCurrentRow();
              //  });
            },
            clearAll() {
                this.$refs.multipleTable.clearSelection();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            submitFunc() {

            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    .cart-detail {
        .el-table {
            tr {
                td {
                    height: 80px;
                }
            }
        }
    }
</style>
<style rel="stylesheet/less" lang="less" scoped>
    .header, section, footer {
        background: #fff;
        padding: 15px;
        box-shadow: 0 1px 5px rgba(200, 200, 200, .2);
        margin-bottom: 20px;
    }
    .header, footer {
        height: 80px;
        line-height: 80px - 30px;
        .h1 {
            font-size: 24px;
            color: #333;
            font-weight: normal;
        }
    }
    .input {
        margin: 10px;
        width: 50%;
    }
</style>
