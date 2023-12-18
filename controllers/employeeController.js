const {catchAsyncErrors} = require ("../middlewares/catchAsyncErrors")
const Employee = require("../models/employeeModel")
const Internship = require("../models/internshipModel")
const Job = require("../models/jobModel")
const { sendToken } = require("../utils/SendToken")
const ErrorHandler = require("../utils/errorHandler")
const { sendmail } = require("../utils/nodemailer")
const path = require("path")
const imagekit = require("../utils/imagekit").initImagekit()

exports.employeePage = catchAsyncErrors (async(req,res,next)=>{
        res.json({message:"secure employee page"})     
})

exports.currentEmployee = catchAsyncErrors(async(req,res,next)=>{
   const employee = await Employee.findById(req.id).exec()
   res.json({employee})
})

exports.employeeSignup = catchAsyncErrors (async(req,res,next)=>{
       const employee = await new Employee(req.body).save()
       sendToken(employee,201,res)
})

exports.employeeSignin = catchAsyncErrors (async(req,res,next)=>{
     const employee = await Employee.findOne({email:req.body.email}).select("+password").exec()

     if(!employee){
        return next(new ErrorHandler("User not Found",404))
     }

     const isMatch = employee.comparePassword(req.body.password)
     if(!isMatch){
        return next(new ErrorHandler("Wrong Credentials",500))
     }
      
     sendToken(employee,200,res)
})

exports.employeeSignout = catchAsyncErrors (async(req,res,next)=>{
   res.clearCookie("token")
   res.json({
      message:"successfully signout"
   })
})

exports.employeeSendmail = catchAsyncErrors (async(req,res,next)=>{
   const employee = await Employee.findOne({email : req.body.email})

   if(!employee){
      res.status(404).json({
         message:"user not found"
      })
   }

   const url = `${req.protocol}://${req.get("host")}/employee/forget-link/${employee._id}`

   sendmail(req,res,next,url)

   // employee.resetPasswordToken = "1"
   
   // await employee.save()

   res.json({employee,url})     
})

exports.employeeForgetLink = catchAsyncErrors (async(req,res,next)=>{
   const employee = await Employee.findById(req.params.id)

   if(!employee){
      res.status(404).json({
         message:"user not found"
      })
   }

   employee.password = req.body.password
   await employee.save()
   res.status(200).json({
      message:"password hs been successfully changed"
   })
  
})

exports.employeeresetpassword = catchAsyncErrors (async(req,res,next)=>{
   const employee = await Employee.findById(req.params.id)

   employee.password = req.body.password
   await employee.save()
   
   sendToken(employee,201,res)
  
})

exports.employeeupdate = catchAsyncErrors (async(req,res,next)=>{
   const employee = await Employee.findByIdAndUpdate(req.params.id,req.body)
   res.status(200).json({
      success:true,
      message:"employee details updated",
   })
})

exports.employeeavatar = catchAsyncErrors (async(req,res,next)=>{
   const employee = await Employee.findById(req.params.id)
   const file = req.files.organisationlogo
   const modifiedFilename = `resumebuilder${Date.now()}${path.extname(file.name)}`

   if(employee.organisationlogo.fileId!==""){
      await imagekit.deleteFile(employee.organisationlogo.fileId)
   }

   const {fileId,url} = await imagekit.upload({
      file:file.data,
      fileName : modifiedFilename
   })

   employee.organisationlogo = {fileId,url}
   employee.save()

   res.status(200).json({
      success:true,
      message:"file uploaded"
   })
})

// ------------------------internship--------------------------------

exports.createintern = catchAsyncErrors(async(req,res,next)=>{
    const employee = await Employee.findById(req.id)
    const internship = await Internship(req.body)
    internship.employee = employee._id
    employee.internships.push(internship._id)
    await internship.save()
    await employee.save()
    res.status(201).json({
        success:true,
        internship})
})

exports.readintern = catchAsyncErrors(async(req,res,next)=>{
    const {internships} = await Employee.findById(req.id).populate("internships")
    res.status(200).json({
        success:true,
        internships})
})

exports.readsingleintern = catchAsyncErrors(async(req,res,next)=>{
    const internship = await Internship.findById(req.params.id)
    res.status(200).json({
        success:true,
        internship})
})



// ------------------------job--------------------------------

exports.createjob = catchAsyncErrors(async(req,res,next)=>{
   const employee = await Employee.findById(req.id)
   const job = await Job(req.body)
   job.employee = employee._id
   employee.jobs.push(job._id)
   await job.save()
   await employee.save()
   res.status(201).json({
       success:true,
       job})
})

exports.readjob = catchAsyncErrors(async(req,res,next)=>{
   const {jobs} = await Employee.findById(req.id).populate("jobs")
   res.status(200).json({
       success:true,
       jobs})
})

exports.readsinglejob = catchAsyncErrors(async(req,res,next)=>{
   const job = await Job.findById(req.params.id)
   res.status(200).json({
       success:true,
       job})
})