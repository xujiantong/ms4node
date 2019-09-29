const express = require("express");
const mongoose = require("mongoose");
const app = express();

// DB config
const db = require("./config/keys").mongoURI;

// Connect to mongoDB
mongoose.connect(db)
		.then(()=>{
			console.log("MongoDB Connected");
		})
		.catch((err)=>{
			console.log(err);
		})

app.get("", (req, res)=>{
	res.send("hello world2");
})

const port = process.env.PORT || 5000;


app.listen(port, ()=>{
	console.log(`Server is running port ${port}`);
})