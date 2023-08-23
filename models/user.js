const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    username:{
        type:'String',
        required:true,
    },
    email:{
        type:'String',
        required:true,
    },
    password:{
        type:'String',
        required:true,
    }

},{timestamps:true});

userSchema.methods.isValidatePassword=async function(password) {
    return this.password===password;
}

const User=new mongoose.model('User',userSchema);
module.exports=User;
