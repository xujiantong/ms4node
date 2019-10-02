<template>
    <div class="register">
        <section class="form-container">
            <div class="manage-tip">
                <span class="title">在线后台管理系统</span>

                <el-form :model="registerUser" status-icon :rules="rules" ref="registerForm" label-width="80px"
                         class="registerForm">
                    <el-form-item label="用户名" prop="name">
                        <el-input  v-model="registerUser.name"  placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="name">
                        <el-input  v-model="registerUser.email" autocomplete='email' placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password"  v-model="registerUser.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="password2">
                        <el-input type="password"  v-model="registerUser.password2" placeholder="请输入确认密码"></el-input>
                    </el-form-item>
                    <el-form-item label="身份">
                        <el-select v-model="registerUser.identity" placeholder="请选择用户身份">
                            <el-option label="员工" value="employee"></el-option>
                            <el-option label="管理员" value="manage"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="submit-btn" @click="submitForm('registerForm')">注册</el-button>
                    </el-form-item>
                </el-form>

            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "register",
        components: {},
        data() {
            return {
                registerUser:{
                    name:"",
                    email:"",
                    password:"",
                    password2:"",
                    identity:"employee",
                },
                rules:{}
            }
        },
        methods: {
            submitForm(){

            }
        }
    }
</script>

<style scoped>
    .register {
        width: 100%;
        height: 100%;
        background: #eee;
        /*background: linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%),*/
        /*radial-gradient(at top center, rgba(255, 255, 255, 0.40) 0%, rgba(0, 0, 0, 0.40) 120%) #989898;*/
        /*background-blend-mode: multiply, multiply;*/
    }

    .form-container {
        width: 370px;
        height: 210px;
        position: absolute;
        top: 10%;
        left: 34%;
        padding: 25px;
        border-radius: 5px;
        text-align: center;
    }

    .form-container .manage-tip .title {
        font-family: "Microsoft YaHei";
        /*font-weight: bold;*/
        font-size: 26px;
        color: #333;
    }

    .registerForm {
        margin-top: 20px;
        background-color: #fff;
        padding: 20px 40px 20px 20px;
        border-radius: 5px;
        /*box-shadow: 0px 5px 10px #cccc;*/
        min-height: 200px;
    }
    .registerForm >>> .el-select{
        width: 100%;
    }

    .submit-btn {
        width: 100%;
    }
</style>