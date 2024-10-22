const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "name is required"]
        },
    email:{
        type:String,
        required: [true, "email is required"]
        },
    password:{
        type:String,
        required: [true, "password is required"]
        },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    notification:{
        type:Array,
        default:[]
    },
    seennotification:{
        type:Array,
        default:[]
    }
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;