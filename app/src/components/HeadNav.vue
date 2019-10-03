<template>
    <header class="head-nav">
        <el-row :gutter="10">
         <el-col :span="6" class="logo-container">
             <img src="../assets/logo.png" class="logo" alt="">
             <span class="title">在线管理系统</span>
         </el-col>
         <el-col :span="6" class="user">
             <div class="userinfo">
                 <img :src="user.avatar" class="avatar" alt="">
                 <div class="welcome">
                     <p class="name comename">欢迎</p>
                     <p class="name avatarname">{{user.name}}</p>
                 </div>
                 <span class="username"></span>
                 <!--下拉箭头-->
             </div>

         </el-col>
        </el-row>
    </header>
</template>

<script>
    export default {
        name: "HeadNav",
        computed: {
            user() {
                return this.$store.getters.user;
            }
        },
    }
</script>

<style scoped>
    .head-nav {
        width: 100%;
        height: 60px;
        min-width: 600px;
        padding: 5px;
        background: #324057;
        color: #fff;
        border-bottom: 1px solid #1f2d3d;
        box-sizing: border-box;
    }
    .logo-container {
        line-height: 50px;
        min-width: 400px;
    }
    .logo {
        height: 30px;
        width: 30px;
        margin: 0 5px 0 10px;
        vertical-align: middle;
        display: inline-block;
    }
    .title {
        vertical-align: middle;
        font-size: 22px;
        font-family: "Microsoft YaHei";
        letter-spacing: 3px;
    }
    .user {
        line-height: 50px;
        text-align: right;
        float: right;
        padding-right: 10px;
    }
    .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        vertical-align: middle;
        display: inline-block;
        margin-right:10px;
    }
    .welcome {
        display: inline-block;
        width: auto;
        vertical-align: middle;
        padding: 0 5px;
    }
    .name {
        line-height: 20px;
        text-align: center;
        font-size: 14px;
    }
    .comename {
        font-size: 12px;
    }
    .avatarname {
        color: #409eff;
        font-weight: bolder;
    }
    .username {
        cursor: pointer;
        margin-right: 5px;
    }
    .el-dropdown {
        color: #fff;
    }
</style>