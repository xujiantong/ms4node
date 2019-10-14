// @login & register
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const keys = require("../../config/keys");
const passport = require("passport");

const User = require("../../models/User");
// $route GET api/users/test
// @desc 返回的请求的json数据
// @access public
router.get("/test.json",(req, res)=>{
   res.json({
       msg : "login works"
   })
});

// $route POST api/users/register
// @desc 返回的请求的json数据
// @access private
router.post("/register",(req, res)=>{
    // console.log(req.body);
    // 查询数据库中是否拥有邮箱
    User.findOne({email: req.body.email})
        .then((user)=>{
            if(user){
                return res.status(400).json({msg:"邮箱已被注册"});
            }
            var avatar = gravatar.url(req.body.email,
                {s: '200', r: 'pg', d: 'mm'});
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password,
                identity: req.body.identity
            });

            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then((user)=> res.json(user))
                        .catch(err=> console.log(err));
                });
            });
        })

});


// $route POST api/users/login
// @desc 返回token jwt passport
// @access private
router.post("/login", (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    // 查询数据库
    User.findOne({email})
        .then(user =>{
            if(!user){
                return res.status(404).json({msg: "用户不存在"})
            }
            // 密码匹配
            bcrypt.compare(password, user.password)
                .then(isMatch=>{
                    if(isMatch){
                        // 匹配成功
                        // jwt.sign("规则","加密名字","过期时间(秒)","箭头函数")
                        const rule = {
                            id:user.id,
                            name: user.name,
                            email: user.email,
                            avatar: user.avatar,
                            identity: user.identity
                        };
                        jwt.sign(rule, keys.secretOrKey,{expiresIn:3600},(err, token)=>{
                           if(err) throw err;
                            res.json({
                                success: true,
                                token: "Bearer "+ token
                            })
                        });
                        // res.json({msg:"success", user})
                    }else{
                        return res.status(400).json({msg:"密码错误"})
                    }
                })
        })
});

// $route GET api/users/current
// @desc 返回 current user
// @access private
router.get("/current",passport.authenticate("jwt", {session:false}), (req, res)=>{
   res.json({
       id: req.user.id,
       name: req.user.name,
       email: req.user.email,
       identity: req.user.identity
   })
});
module.exports = router;