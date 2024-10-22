const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    firstName:{
        type:String,
        required:[true, 'first name is requiered']
    },
    lastName:{
        type:String,
        required:[true, 'last name is requiered']
    },
    phone:{
        type:String,
        required:[true, 'phone number is requiered']
    },
    email:{
        type:String,
        required:[true, 'email is requiered'],
    },
    website:{
        type:String
    },
    address:{
        type:String,
        required:[true, 'address is requiered']
    },
    specialization:{
        type:String,
        required:[true, 'specialization is requiered']
    },
    experience:{
        type:String,
        required:[true, 'experience is requiered']
    },
    feesPerCunsaltation:{
        type:Number,
        required:[true, 'fees per cunsaltation is requiered']
    },
    status:{
        type:String,
        default:'pending'
    },
    timings:{
        type:Object,
        required:[true, 'timings is requiered']
    }
}, {timestamps:true}
);

const doctorModel = mongoose.model("doctors",doctorSchema);
module.exports = doctorModel;