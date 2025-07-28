const mongoose =require('mongoose');

const actors = require('../config/config')

const userSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    role:{
        type:String,
        enum:[actors.MANAGER,actors.ADMIN,actors.USER],
        default:actors.USER
    }
})

module.exports = mongoose.model('users',userSchema)