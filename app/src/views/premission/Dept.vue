<template>
    <div>
        <div class="header">
            <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>部门管理</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="header-right">
                <el-button type="primary" size="small" @click="addDept()">新增部门</el-button>
            </div>
        </div>
        <DialogDept :dialog="dialog" :form="form"></DialogDept>
    </div>
</template>

<script>
    import DialogDept from "../../components/DialogDept";
    export default {
        name: "dept",
        components: {DialogDept},
        data(){
            return {
                dialog: {
                    show: false,
                    title: "",
                    option: "add"
                },
                form:{
                    id:"",
                    name:"",
                    parentId:0,
                    seq:0,
                    remark:""
                }
            }
        },
        methods:{
            addDept(){
                // 添加
                this.dialog = {
                    show: true,
                    title: "新增部门",
                    option: "add"
                };
                this.form = {
                    id: "",
                    name:"",
                    parentId:0,
                    seq:0,
                    remark:""
                };
            }
        }
    }
</script>

<style scoped>
    .header{
        height: 40px;
        line-height: 40px;
        padding:0 20px;
        box-sizing: border-box;
    }
    .bread{
        float:left;
        height: 40px;
        line-height: 40px;
    }
    .header-right{
        float: right;
        padding-right: 20px;
    }
</style>