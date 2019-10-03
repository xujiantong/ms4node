<template>
    <div class="login">
        <section class="form-container">
            <div class="manage-tip">
                <span class="title">在线后台管理系统</span>

                <el-form :model="loginUser" status-icon :rules="rules" ref="loginForm" label-width="60px"
                         class="loginForm">
                    <el-form-item label="邮箱" prop="email">
                        <el-input  v-model="loginUser.email" autocomplete='email' placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password"  v-model="loginUser.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="submit-btn" @click="submitForm('loginForm')">登陆</el-button>
                    </el-form-item>
                    <div class="tiparea">
                        <p>还没有账号?现在<router-link to="/register">注册</router-link></p>
                    </div>
                </el-form>

            </div>
        </section>
    </div>
</template>

<script>
    import jwt_decode from 'jwt-decode'
    export default {
        name: "login",
        components: {},
        data() {
            return {
                loginUser:{
                    email:"",
                    password:""
                },
                rules: {
                    email: [
                        {type: "email", required: true, message: "邮箱格式不正确", trigger: "blur"}
                    ],
                    password: [
                        {required: true, message: "密码不能为空", trigger: "blur"},
                        {min: 6, max:30, message: "密码长度应在6-30位之间", trigger: "blur"}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post("/api/users/login", this.loginUser)
                            .then(res=>{
                                const {token} = res.data;
                                // 存储到ls
                                localStorage.setItem("eleToken", token);
                                this.$router.push('/index');
                                // 解析token
                                const decoded = jwt_decode(token);
                                // token存储到vuex中
                                this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
                                this.$store.dispatch("setUser", decoded);
                            })
                    }
                });
            },
            isEmpty(value){
                return (
                    value === undefined ||
                    value === null ||
                    (typeof value === "object" && Object.keys(value).length === 0) ||
                    (typeof value === "string" && value.trim().length === 0)
                )
            }
        },
    }
</script>

<style scoped>
    .login {
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

    .loginForm {
        margin-top: 20px;
        background-color: #fff;
        padding: 20px 40px 20px 20px;
        border-radius: 5px;
        /*box-shadow: 0px 5px 10px #cccc;*/
        min-height: 200px;
    }
    .loginForm >>> .el-select{
        width: 100%;
    }

    .submit-btn {
        width: 100%;
    }
    .tiparea {
        text-align: right;
        font-size: 12px;
        color: #333;
    }
    .tiparea p a {
        color: #409eff;
    }
</style>