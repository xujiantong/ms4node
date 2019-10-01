const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
// 引入users.js
const users = require("./routes/api/users");
// DB config
const db = require("./config/keys").mongoURI;

// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Connect to mongoDB
mongoose.connect(db)
    .then(() => console.log("MongoDB Connected"))
	.catch((err) => console.log(`MongoDB连接失败,详情：${err}`));

// passport 初始化
app.use(passport.initialize());
require("./config/passport")(passport);
// 使用routes
app.use("/api/users", users);
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running port ${port}`);
});