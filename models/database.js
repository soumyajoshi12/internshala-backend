const mongoose = require("mongoose")

exports.connectDatabase = async()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/internshala")
        console.log(`database connection established`);
    } catch (error) {
        console.log(error.message);
    }
}