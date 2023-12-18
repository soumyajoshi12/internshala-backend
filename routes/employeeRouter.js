const express = require("express")
const { isAuthenticated } = require("../middlewares/auth")
const { employeePage, employeeSignup , employeeForgetLink,employeeSendmail,employeeSignin,employeeSignout,employeeresetpassword,employeeupdate, currentEmployee,employeeavatar,createintern,readintern,readsingleintern, createjob,readjob,readsinglejob } = require("../controllers/employeeController")
const router = express.Router()

//get
router.get("/", employeePage)

//post/student
router.get("/current", isAuthenticated, currentEmployee)

//post /student / signup
router.post("/signup",employeeSignup)

//post /student / signin
router.post("/signin",employeeSignin)

//get /employee / signout
router.get("/signout",isAuthenticated ,employeeSignout)

//post /employee / send-mail
router.post("/send-mail",employeeSendmail)

//get /employee / forget-link/employeeid
router.get("/forget-link/:id",employeeForgetLink)

//get /employee / reset password/employeeid
router.get("/reset-password/:id",isAuthenticated,employeeresetpassword)

//post /employee /update/employeeid
router.post("/update/:id",isAuthenticated,employeeupdate)

//post /employee /avatar/employeeid
router.post("/avatar/:id",isAuthenticated,employeeavatar)

//---------------------------------------internship-------------------------------------

//post /employee/internship/create
router.post("/internship/create",isAuthenticated,createintern)


//get /employee/internship/read
router.get("/internship/read",isAuthenticated,readintern)

//get/employee/internship/read/id
router.get("/internship/read/:id",isAuthenticated,readsingleintern)

//---------------------------------------job-------------------------------------

//post /employee/job/create
router.post("/job/create",isAuthenticated,createjob)


//get /employee/job/read
router.get("/job/read",isAuthenticated,readjob)

//get/employee/job/read/id
router.get("/job/read/:id",isAuthenticated,readsinglejob)

module.exports = router