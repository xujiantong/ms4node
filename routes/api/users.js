// @login & register
const express = require("express");
const router = express.Router();

// $route GET api/users/test
// @desc 返回的请求的json数据
// @access public
router.get("/test.json",(req, res)=>{
   res.json({
       msg : "login works"
   })
});

module.exports = router;