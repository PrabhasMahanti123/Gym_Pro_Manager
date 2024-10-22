const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB Connected: ${mongoose.connection.host}`.bgGreen.white);
    } catch (error) {
        console.log(`MongoDB Server Error: ${error.message}`.bgRed.white);
        console.log(error.cause);
    }
};

module.exports = connectDB;
