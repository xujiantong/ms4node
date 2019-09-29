const express = require("express");
const app = express();

app.get("", (req, res)=>{
	res.send("hello world2");
})

const port = process.env.PORT || 5000;


app.listen(port, ()=>{
	console.log(`Server is running port ${port}`);
})