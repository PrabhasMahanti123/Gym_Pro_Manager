const mongoose = require('mongoose');

const availableSlotSchema = new mongoose.Schema({
    date:{
        type: String,
        required: true
    },
    numOfSlots:{
        type:  Number,
        required: true
    },
    numOfPeople:{
        type:  Number,
        required: true
    },
    time:{
        type: Array,
        required: true,
        default:[]
    },
    
    
}, {timestamps: true})

const availableSlotModel = mongoose.model('Availableslot', availableSlotSchema)

module.exports = availableSlotModel
