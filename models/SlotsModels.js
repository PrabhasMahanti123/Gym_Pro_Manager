const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    time:{
        type: Array,
        default:[],
        required: true
    },
    
    
}, {timestamps: true})

const slotModel = mongoose.model('slot', slotSchema)

module.exports = slotModel
