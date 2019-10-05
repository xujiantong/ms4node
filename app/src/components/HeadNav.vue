<template>
    <header class="head-nav">
        <el-row :gutter="10">
            <el-col :span="6" class="logo-container">
                <div class="home-logo" @click="goHome">
                    <img src="../assets/logo.png" class="logo" alt="">
                    <span class="title">在线管理系统</span>
                </div>
            </el-col>
            <el-col :span="6" class="user">
                <div class="userinfo">
                    <img :src="user.avatar" class="avatar" alt="">
                    <div class="welcome">
                        <p class="name comename">欢迎</p>
                        <p class="name avatarname">{{user.name}}</p>
                    </div>
                    <span class="username">
                          <!--下拉箭头-->
                         <el-dropdown trigger="click" @command="setDialogInfo">
                          <span class="el-dropdown-link">
                            <i class="el-icon-caret-bottom el-icon--right"></i>
                          </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                                <el-dropdown-item command="logout">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </span>


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
        methods:{
            goHome(){
                this.$router.push("/")
            },
            setDialogInfo(cmdItem){
                switch (cmdItem) {
                    case "info":
                        this.showInfoList();
                        break;
                    case "logout":
                        this.logout();
                        break;
                }
            },
            showInfoList(){
                this.$router.push("/infoshow")
            },
            logout(){
                // 清除token
                localStorage.removeItem("eleToken");
                // 设置vuex store
                this.$store.dispatch('clearCurrentState');
                // 跳转
                this.$router.push("/login")
            }
        }
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
    .home-logo{
        cursor: pointer;
    }
    .logo {
        height: 30px;
        width: 30px;
        margin: 0 15px 0 10px;
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
        margin-right: 7px;
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

    .username >>> .el-dropdown {
        color: #fff;
    }
</style>