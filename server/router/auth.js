const express = require('express');
//const User = require('../model/userSchema');
const router = express.Router('router');
const bcrypt = require('bcryptjs');
require("../DB/conn");
const User = require("../model/userSchema");
const jwt = require('jsonwebtoken');
router.get('/',(req,res) =>{
    res.send("hii");
});


// router.post('/on',(req,res)=> 
// {
//     console.log("hehe bete");
//     console.log(req.body);
//     const {name, email, phone, password} = req.body;
//     console.log(name);
//     if (!name || !email || !phone || !password){
//         return res.status(422).json({err:"this is not we expect"});
//     } 
//     User.findOne({email:email})
//     .then((userExist)=>{
//         if(userExist)
//         {
//             res.status(422).json({messege:"already"});
//         }
//         const user = new User({name, email, phone, password})
//         user.save().then(()=>{
//             res.status(201).json({messege:"user registered successgully"});
//         }).catch(err => res.status(500).json({err:"failed"})) ; 
//     }).catch(err=>{console.log(err)});

// });

// UserRegistration
router.post('/on', async(req,res)=> 
{
    console.log("hehe bete");
    console.log(req.body);
    const {name, email, phone, password} = req.body;
    console.log(name);
    if (!name || !email || !phone || !password){
        return res.status(422).json({err:"this is not we expect"});
    }
    try{
        const userExist = await User.findOne({email:email});

        if (userExist){
            return res.status(422).json({messege:"already"});
        }
        const user = new User({name, email, phone, password});
        const userRegister = await user.save();
        if (userRegister){
            return res.status(201).json({messege:"user registered successgully"});
            }
        }
    catch(err){
        console.log(err);
    } 

});

//UserLogin
router.post('/lo',async(req,res)=>{
    const { email, password} = req.body;
    if (!email || !password){
        return res.json({messege:"invalid"})
    }
    try{
        const userLogin = await User.findOne({email:email});
        const token = await userLogin.generateAuthToken();
        console.log(token);
        res.cookie("token",token,{
            expires:new Date(Date.now()+25892000000),
            httpOnly:true
        });

        if (!userLogin){
            return res.json({messege:"invalid user"});
        }
        const check = await bcrypt.compare(password,userLogin.password);
        if(check){
            return res.json({messege:"useer loged in "})
        }
        else{
            return res.json({messege:"invalid user"})
        }
    }
    catch(err){
        console.log(err);
    }
    
});
module.exports = router;
