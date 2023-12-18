const mongoose = require("mongoose")

const internshipModel = new mongoose.Schema({
    students:[{
        type:mongoose.Schema.Types.ObjectId,
            ref:'student'
    }],
    employee:{
        type:mongoose.Schema.Types.ObjectId,
            ref:'employee'
    },
    profile:String,
    skill:String,
    internshipType :{
        type: String,
        enum:["In office","Remote"]
    },
    openings:Number,
    from:String,
    to:String,
    duration:String,
    responsibility:String,
    stipend:{
        status:{
            type:String,
            enum:["Fixed","Negotiable","Unpaid","Performance based"]
        },
        amount:Number
    },
    perks:String,
    assesments:String
},{timestamps:true})

const Internship = mongoose.model("internship",internshipModel)

module.exports=Internship