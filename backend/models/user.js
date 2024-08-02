const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

UserSchema.pre('save',async function(next){
    console.log("hii pre")
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password , 12);
    }
    next();
})

const User = mongoose.model('USER',UserSchema);
module.exports = User;