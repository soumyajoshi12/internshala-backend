const {catchAsyncErrors} = require ("../middlewares/catchAsyncErrors")
const Student = require("../models/studentModel")
const ErrorHandler = require("../utils/errorHandler")
const { v4: uuidv4 } = require('uuid');

exports.resume = catchAsyncErrors (async(req,res,next)=>{
        try{
            const resume = await Student.findById(req.id)
            res.json({message:"secure resume page",resume}) 
        }catch(err){
            res.json(err);
        }    
})

// ----------------------------------education-----------------------------------------

exports.addEduc = catchAsyncErrors (async(req,res,next)=>{
    try{
        const student = await Student.findById(req.id)
        student.resume.education.push({...req.body,id:uuidv4()})
        await student.save()
        res.json({message:"education added!"}) 
    }catch(err){
        res.json(err);
    }    
})

exports.editEduc = catchAsyncErrors (async(req,res,next)=>{
    try{
        const student = await Student.findById(req.id).exec()
        const eduIndex = student.resume.education.findIndex((i)=>i.id===req.params.eduid)
        student.resume.education[eduIndex]={...student.resume.education[eduIndex],...req.body}
        await student.save()
        res.json({message:"education updated!"}) 
    }catch(err){
        res.json(err);
    }    
})

exports.deleteEduc = catchAsyncErrors (async(req,res,next)=>{
    try{
        const student = await Student.findById(req.id).exec()
        const filterededu = student.resume.education.filter((i)=>i.id!==req.params.eduid)
        student.resume.education=filterededu
        await student.save()
        res.json({message:"education deleted!"}) 
    }catch(err){
        res.json(err);
    }    
})

// ------------------------------------jobs--------------------------------
exports.addJob = catchAsyncErrors (async(req,res,next)=>{
    try{
        const student = await Student.findById(req.id)
        student.resume.jobs.push({...req.body,id:uuidv4()})
        await student.save()
        res.json({message:"job added!"}) 
    }catch(err){
        res.json(err);
    }    
})

exports.editJob = catchAsyncErrors (async(req,res,next)=>{
    try{
        const student = await Student.findById(req.id).exec()
        const jobIndex = student.resume.jobs.findIndex((i)=>i.id===req.params.jobid)
        student.resume.jobs[jobIndex]={...student.resume.jobs[jobIndex],...req.body}
        await student.save()
        res.json({message:"job updated!"}) 
    }catch(err){
        res.json(err);
    }    
})

exports.deletejob = catchAsyncErrors (async(req,res,next)=>{
    try{
        const student = await Student.findById(req.id).exec()
        const filteredjob = student.resume.jobs.filter((i)=>i.id!==req.params.jobid)
        student.resume.jobs=filteredjob
        await student.save()
        res.json({message:"job deleted!"}) 
    }catch(err){
        res.json(err);
    }    
})

//-----------------------------------internships------------------------------
exports.addintern = catchAsyncErrors (async(req,res,next)=>{
    try{
        const student = await Student.findById(req.id)
        student.resume.internships.push({...req.body,id:uuidv4()})
        await student.save()
        res.json({message:"internship added!"}) 
    }catch(err){
        res.json(err);
    }    
})

exports.editintern = catchAsyncErrors (async(req,res,next)=>{
    try{
        const student = await Student.findById(req.id).exec()
        const internIndex = student.resume.internships.findIndex((i)=>i.id===req.params.internid)
        student.resume.jobs[internIndex]={...student.resume.jobs[internIndex],...req.body}
        await student.save()
        res.json({message:"internship updated!"}) 
    }catch(err){
        res.json(err);
    }    
})

exports.deleteintern = catchAsyncErrors (async(req,res,next)=>{
    try{
        const student = await Student.findById(req.id).exec()
        const filteredinternship = student.resume.internships.filter((i)=>i.id!==req.params.internid)
        student.resume.internships=filteredinternship
        await student.save()
        res.json({message:"internship deleted!"}) 
    }catch(err){
        res.json(err);
    }    
})

//-----------------------------------responsibilities------------------------------
exports.addresp = catchAsyncErrors (async(req,res,next)=>{
    try{
        const student = await Student.findById(req.id)
        student.resume.responsibilities.push({...req.body,id:uuidv4()})
        await student.save()
        res.json({message:"responsibility added!"}) 
    }catch(err){
        res.json(err);
    }    
})

exports.editresp = catchAsyncErrors (async(req,res,next)=>{
    try{
        const student = await Student.findById(req.id).exec()
        const respIndex = student.resume.responsibilities.findIndex((i)=>i.id===req.params.respid)
        student.resume.jobs[respIndex]={...student.resume.responsibilities[respIndex],...req.body}
        await student.save()
        res.json({message:"responsibility updated!"}) 
    }catch(err){
        res.json(err);
    }    
})

exports.deleteresp = catchAsyncErrors (async(req,res,next)=>{
    try{
        const student = await Student.findById(req.id).exec()
        const filteredresp = student.resume.responsibilities.filter((i)=>i.id!==req.params.respid)
        student.resume.responsibilities=filteredresp
        await student.save()
        res.json({message:"responsibility deleted!"}) 
    }catch(err){
        res.json(err);
    }    
})

//-----------------------------------courses------------------------------
exports.addcourse = catchAsyncErrors (async(req,res,next)=>{
    try{
        const student = await Student.findById(req.id)
        student.resume.courses.push({...req.body,id:uuidv4()})
        await student.save()
        res.json({message:"course added!"}) 
    }catch(err){
        res.json(err);
    }    
})

exports.editcourse = catchAsyncErrors (async(req,res,next)=>{
    try{
        const student = await Student.findById(req.id).exec()
        const courseIndex = student.resume.courses.findIndex((i)=>i.id===req.params.couseid)
        student.resume.courses[courseIndex]={...student.resume.courses[courseIndex],...req.body}
        await student.save()
        res.json({message:"course updated!"}) 
    }catch(err){
        res.json(err);
    }    
})

exports.deletecourse = catchAsyncErrors (async(req,res,next)=>{
    try{
        const student = await Student.findById(req.id).exec()
        const filteredcourse = student.resume.courses.filter((i)=>i.id!==req.params.courseid)
        student.resume.courses=filteredcourse
        await student.save()
        res.json({message:"course deleted!"}) 
    }catch(err){
        res.json(err);
    }    
})

//-----------------------------------projects------------------------------
exports.addproject = catchAsyncErrors (async(req,res,next)=>{
    try{
        const student = await Student.findById(req.id)
        student.resume.projects.push({...req.body,id:uuidv4()})
        await student.save()
        res.json({message:"project added!"}) 
    }catch(err){
        res.json(err);
    }    
})

exports.editproject = catchAsyncErrors (async(req,res,next)=>{
    try{
        const student = await Student.findById(req.id).exec()
        const projectIndex = student.resume.projects.findIndex((i)=>i.id===req.params.projectid)
        student.resume.projects[projectIndex]={...student.resume.projects[projectIndex],...req.body}
        await student.save()
        res.json({message:"project updated!"}) 
    }catch(err){
        res.json(err);
    }    
})

exports.deleteproject = catchAsyncErrors (async(req,res,next)=>{
    try{
        const student = await Student.findById(req.id).exec()
        const filteredproject = student.resume.projects.filter((i)=>i.id!==req.params.projectid)
        student.resume.projects=filteredproject
        await student.save()
        res.json({message:"project deleted!"}) 
    }catch(err){
        res.json(err);
    }    
})

//-----------------------------------skills------------------------------
exports.addskill = catchAsyncErrors (async(req,res,next)=>{
    try{
        const student = await Student.findById(req.id)
        student.resume.skills.push({...req.body,id:uuidv4()})
        await student.save()
        res.json({message:"skill added!"}) 
    }catch(err){
        res.json(err);
    }    
})

exports.editskill = catchAsyncErrors (async(req,res,next)=>{
    try{
        const student = await Student.findById(req.id).exec()
        const skillIndex = student.resume.skills.findIndex((i)=>i.id===req.params.skillid)
        student.resume.skills[skillIndex]={...student.resume.skills[skillIndex],...req.body}
        await student.save()
        res.json({message:"skill updated!"}) 
    }catch(err){
        res.json(err);
    }    
})

exports.deleteskill = catchAsyncErrors (async(req,res,next)=>{
    try{
        const student = await Student.findById(req.id).exec()
        const filteredskill = student.resume.skills.filter((i)=>i.id!==req.params.skillid)
        student.resume.skills=filteredskill
        await student.save()
        res.json({message:"skill deleted!"}) 
    }catch(err){
        res.json(err);
    }    
})

//-----------------------------------accomplishments------------------------------
exports.addaccom = catchAsyncErrors (async(req,res,next)=>{
    try{
        const student = await Student.findById(req.id)
        student.resume.accomplishments.push({...req.body,id:uuidv4()})
        await student.save()
        res.json({message:"accomplishment added!"}) 
    }catch(err){
        res.json(err);
    }    
})

exports.editaccom = catchAsyncErrors (async(req,res,next)=>{
    try{
        const student = await Student.findById(req.id).exec()
        const accomIndex = student.resume.accomplishments.findIndex((i)=>i.id===req.params.accomid)
        student.resume.accomplishments[accomIndex]={...student.resume.accomplishments[accomIndex],...req.body}
        await student.save()
        res.json({message:"accomplishment updated!"}) 
    }catch(err){
        res.json(err);
    }    
})

exports.deleteaccom = catchAsyncErrors (async(req,res,next)=>{
    try{
        const student = await Student.findById(req.id).exec()
        const filteredaccom = student.resume.accomplishments.filter((i)=>i.id!==req.params.accomid)
        student.resume.accomplishments=filteredaccom
        await student.save()
        res.json({message:"accomplishment deleted!"}) 
    }catch(err){
        res.json(err);
    }    
})