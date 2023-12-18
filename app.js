require("dotenv").config({path:"./.env"})

const express = require("express")
const app = express()
const cors = require('cors');


const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, 
  };
  
  app.use(cors(corsOptions));

//db connection 
require("./models/database").connectDatabase()

//logger
const logger = require("morgan")
app.use(logger("tiny"))

//body parser
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//session and cookie
const session = require("express-session")
const cookieparser = require("cookie-parser")
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret: process.env.EXPRESS_SESSION_SECRET
}))
app.use(cookieparser())

//express file-upload
const fileupload = require("express-fileupload")
app.use(fileupload())

const employee =require("./routes/employeeRouter")
const resume = require("./routes/resumeRouter")
//routes
app.use("/",require("./routes/indexRouter"))
app.use("/resume",resume)
app.use("/employee",employee )

//error handling
const ErrorHandler = require("./utils/errorHandler")
const {generatedErrors} = require("./middlewares/error")
app.all("*",(req,res,next)=>{
    next(new ErrorHandler(`requested url not found ${req.url}`,404))
})
app.use(generatedErrors) 

app.listen(process.env.PORT, console.log(`server is running on port ${process.env.PORT}`))