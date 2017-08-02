<template>
    <el-table :data="list" border style="width: 100%;">
        <el-table-column prop="title" label="产品名称" width="150"></el-table-column>
        <el-table-column label="封面图" width="150">
            <template scope="scope">
                <img :src="list[scope.$index].cover.path" style="max-width: 100%;margin-top:8px;">
            </template>
        </el-table-column>
        <el-table-column prop="price" label="产品价格（元）" width="150"></el-table-column>
        <el-table-column prop="discount" label="产品抵扣（%）"  width="150"></el-table-column>
        <el-table-column prop="summary" label="简介"></el-table-column>
        <el-table-column label="操作" width="200">
            <template scope="scope">
                <router-link :to="{ path: '/home/detail', query: { id: list[scope.$index]._id }}"
                             style="text-decoration: none; color: #20a0ff;font-size: 12px;margin-right: 10px;">
                    查看
                </router-link>
                <el-button @click="handleClick(list[scope.$index]._id, scope.$index)" type="text" size="small">删除</el-button>
                <el-button type="text" size="small" @click="$parent.isAdd = true;">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        data () {
            return {
                list: []
            }
        },
        mounted () {
            this.getList()
        },
        methods: {
            handleClick (id, index) {
                let that = this
                that.$http.post('/api/product/delete', {id: id}).then(data => {
                    that.list.splice(index, 1)
                    that.$message(data.data.data.info);
                })
            },
            getList () {
                let that = this
                that.$http.get('/api/product/list').then(data => {
                    that.list = data.data.data.data;
                })
            }
        }
    }
</script>

