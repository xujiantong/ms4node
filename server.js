const express = require("express");
const mongoose = require("mongoose");
const app = express();
// 引入users.js
const users = require("./routes/api/users");
// DB config
const db = require("./config/keys").mongoURI;

// Connect to mongoDB
mongoose.connect(db)
    .then(() => console.log("MongoDB Connected"))
	.catch((err) => console.log(`MongoDB连接失败,详情：${err}`));

app.get("/", (req, res) => {
    res.send("hello world2");
});

// 使用routes
app.use("/api/users", users);
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running port ${port}`);
});