const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    phone:{
        type: Number,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    tokens:[
        {
            token:{
            type:String,
            required:true}
        }

    ]

})
userSchema.pre('save',async function(next){
    console.log("ha chala");
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
        
    }
    next();
});
userSchema.methods.generateAuthToken = async function (){
    try{
        let tokenn = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:tokenn})
        await this.save();
        return tokenn;   
    }catch(err){
        console.log(err);
    }
}
const User = mongoose.model('User',userSchema);
module.exports = User;

