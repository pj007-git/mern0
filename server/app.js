const app  = express();
const dotenv = require('dotenv');
const express =require('express');
const mongoose = require('mongoose');
app.use(require("./router/auth"));
const User = require("./model/userSchema");
require("./DB/conn");
dotenv.config({path:'./config.env'});
app.use(express.json());

const middlewear = (req,res,next) => {
    console.log(`hii this is mid`);
    next();
}
// middlewear();
// app.get('/h',middlewear,(req,res) => {
//     console.log("after calling mid");
//     res.send("hello World");
// });

app.listen(3000,()=>{
    console.log("running..");
});