const express = require("express")
const { homePage , studentSignup ,studentSignin,studentSignout, currentUser, studentSendmail,studentForgetLink, studentresetpassword, studentupdate, studentavatar,applyinternship,applyjob, readalljobs, readallinternships} = require("../controllers/indexController")
const { isAuthenticated } = require("../middlewares/auth")
const router = express.Router()

//get
router.get("/", homePage)

//post/student
router.post("/student",currentUser)

//post /student / signup
router.post("/student/signup",studentSignup)

//post /student / signin
router.post("/student/signin",studentSignin)

//get /student / signout
router.get("/student/signout",isAuthenticated ,studentSignout)

//post /student / send-mail
router.post("/student/send-mail",studentSendmail)

//get /student / forget-link/studentid
router.get("/student/forget-link",studentForgetLink)

//get /student / reset password/studentid
router.get("/student/reset-password/:id",isAuthenticated,studentresetpassword)

//post /student /update/studentid
router.post("/student/update/:id",isAuthenticated,studentupdate)

//post /student /avatar/studentid
router.post("/student/avatar/:id",isAuthenticated,studentavatar)

// ------read all jobs-------
router.get("/student/alljobs",isAuthenticated,readalljobs)

// ------read all internships-------
router.get("/student/allinternships",isAuthenticated,readallinternships)

// -----------apply internship-------------

//post /student /apply/internshipid
router.post("/student/apply/internship/:internshipid",isAuthenticated,applyinternship)

// -----------apply job-------------

//post /student /apply/jobid
router.post("/student/apply/job/:jobid",isAuthenticated,applyjob)

module.exports = router