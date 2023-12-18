const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const studentModel = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"First name is required"],
    },
    LastName:{
        type:String,
        required:[true,"Last name is required"],
    },
    avatar:{
        type:Object,
        default:{
            fileId:'',
            url:"https://images.unsplash.com/photo-1695338035806-af02c934af38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
        }
    },
    contact :{
        type:Number,
        required:[true,"contact is required"],
        minLength:[10,"contact should have 10 characters"],
        maxLength:[10,"contact should have 10 characters"]
    },
    city:{
        type:String,
        required:[true,"city is required"],
        minLength:[2,"city should atleast have 2 characters"],
    },
    gender:{
        type:String,
        required:[true,"gender  is required"],
        enum:["Male","Female","Others"]
    },
    email : {
        type:String,
        unique:true,
        required:[true,"Email is required"],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type:String,
        select:false,
        maxLength:[15,"Password should not exceed more than 15 characters"],
        minLength:[6,"Password should have atleast 6 characters"],
        // match:[]
    },
    resetPasswordToken :{
        type:String,
        default:"0"
    },
    resume:{
        education:[],
        jobs:[],
        internships:[],
        responsibilities:[],
        courses:[],
        projects:[],
        skills:[],
        accomplishments:[]
    },
    internships:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'internship'
        }
    ],
    jobs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'job'
        }
    ]
},{timestamps:true})

studentModel.pre("save", function (next) {
    if (!this.isModified("password")) {
        // If the password is not modified, move to the next middleware.
        return next();
    }

    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

studentModel.methods.comparePassword = function(password){
    return bcrypt.compareSync(password,this.password)
}

studentModel.methods.getjwttoken = function() {
    const jwtsecret = process.env.JWT_SECRET
    const expire = process.env.JWT_EXPIRE
    return jwt.sign(
        {id : this._id},
        jwtsecret,
        {expiresIn:expire})
} 

const Student = mongoose.model("student",studentModel)

module.exports=Student