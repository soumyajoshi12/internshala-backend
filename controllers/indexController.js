const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");
const { sendToken } = require("../utils/SendToken");
const ErrorHandler = require("../utils/errorHandler");
const { sendmail } = require("../utils/nodemailer");
const path = require("path");
const imagekit = require("../utils/imagekit").initImagekit();

exports.homePage = catchAsyncErrors(async (req, res, next) => {
  res.json({ message: "secure homepage" });
});

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id)
  .populate("jobs")
  .populate("internships")
  
  res.json({ student });
});

exports.studentSignup = catchAsyncErrors(async (req, res, next) => {
  const student = await new Student(req.body).save();
  console.log(student);
  sendToken(student, 201, res);
});

exports.studentSignin = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email })
    .select("+password")
    .exec();

  if (!student) {
    return next(new ErrorHandler("User not Found", 404));
  }

  const isMatch = student.comparePassword(req.body.password);
  if (!isMatch) {
    return next(new ErrorHandler("Wrong Credentials", 500));
  }

  sendToken(student, 200, res);
});

exports.studentSignout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token");
  res.json({
    message: "successfully signout",
  });
});

exports.studentSendmail = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email });

  if (!student) {
    res.status(404).json({
      message: "user not found",
    });
  }

  const url = Math.floor(Math.random()*9000+1000)
  sendmail(req,res,next,url)
  student.resetPasswordToken=`${url}`
  await student.save()
  res.json({message:"mail sent successfully"})
});

exports.studentForgetLink = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findOne({email : req.body.email });

  if (!student) {
    res.status(404).json({
      message: "user not found",
    });
  }

  if(student.resetPasswordToken === req.body.otp){
    student.resetPasswordToken = "0"
    student.password = req.body.password
    await student.save()
  }
  else{
    res.status(403).json({
      message: "Invalid Reset password link",
    });
  }
});

exports.studentresetpassword = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.params.id);

  student.password = req.body.password;

  await student.save();

  sendToken(student, 201, res);
});

exports.studentupdate = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json({
    success: true,
    message: "student details updated",
  });
});

exports.studentavatar = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.params.id);
  const file = req.files.avatar;
  const modifiedFilename = `resumebuilder${Date.now()}${path.extname(
    file.name
  )}`;

  if (student.avatar.fileId !== "") {
    await imagekit.deleteFile(student.avatar.fileId);
  }

  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: modifiedFilename,
  });

  student.avatar = { fileId, url };
  student.save();

  res.status(200).json({
    success: true,
    message: "file uploaded",
  });
});

//-------read all jobs ----------
exports.readalljobs = catchAsyncErrors(async(req,res,next)=>{
  const jobs = await Job.find()
  res.status(200).json({jobs})
})

//-------read all internships ----------
exports.readallinternships = catchAsyncErrors(async(req,res,next)=>{
  const jobs = await Internship.find()
  res.status(200).json({internships})
})

//---------apply internship-----
exports.applyinternship = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id);
  const internship = await Internship.findById(req.params.internshipid);

  student.internships.push(internship._id);
  internship.students.push(student._id);

  student.save();
  internship.save();

  res.json({ student, internship });
});

//---------apply job-----
exports.applyjob = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id);
  const job = await Job.findById(req.params.jobid);

  student.jobs.push(job._id);
  job.students.push(student._id);

  student.save();
  job.save();

  res.json({ student, job });
});
