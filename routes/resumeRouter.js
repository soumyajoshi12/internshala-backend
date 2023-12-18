const express = require("express")
const { isAuthenticated } = require("../middlewares/auth")
const router = express.Router()
const {resume,addEduc,editEduc,deleteEduc,addJob,editJob,deletejob, addintern, editintern, deleteintern, addresp, editresp, deleteresp, addcourse ,editcourse,deletecourse, addproject, editproject, deleteproject , addskill,editskill,deleteskill , addaccom,editaccom,deleteaccom} = require("../controllers/resumeController")

//------------------------------------------------------------------------------------------------------

//get
router.get("/resume", isAuthenticated, resume)

//-------------------------------------------------edu--------------------------------

//post /resume/add-edu
router.post("/resume/add-edu", isAuthenticated, addEduc)

//post /resume/edit-edu/id
router.post("/resume/edit-edu/:eduid", isAuthenticated, editEduc)

//post /resume/delete-edu/id
router.post("/resume/delete-edu/:eduid", isAuthenticated, deleteEduc)


//----------------------------------------job-----------------------------------------
//post /resume/add-job
router.post("/resume/add-job", isAuthenticated, addJob)

//post /resume/edit-edu/id
router.post("/resume/edit-job/:jobid", isAuthenticated, editJob)

//post /resume/delete-edu/id
router.post("/resume/delete-job/:jobid", isAuthenticated, deletejob)

//--------------------------------------intern------------------------------------------
//post/add
router.post("/resume/add-intern", isAuthenticated, addintern)

//post /resume/edit-edu/id
router.post("/resume/edit-intern/:internid", isAuthenticated, editintern)

//post /resume/delete-edu/id
router.post("/resume/delete-intern/:internid", isAuthenticated, deleteintern)

//--------------------------------------resp------------------------------------------
//post/add
router.post("/resume/add-resp", isAuthenticated, addresp)

//post /resume/edit-edu/id
router.post("/resume/edit-resp/:respid", isAuthenticated, editresp)

//post /resume/delete-edu/id
router.post("/resume/delete-resp/:respid", isAuthenticated, deleteresp)

//--------------------------------------courses------------------------------------------
//post/add
router.post("/resume/add-course", isAuthenticated, addcourse)

//post /resume/edit-edu/id
router.post("/resume/edit-course/:courseid", isAuthenticated, editcourse)

//post /resume/delete-edu/id
router.post("/resume/delete-course/:courseid", isAuthenticated, deletecourse)

//--------------------------------------project------------------------------------------
//post/add
router.post("/resume/add-project", isAuthenticated, addproject)

//post /resume/edit-edu/id
router.post("/resume/edit-project/:projectid", isAuthenticated, editproject)

//post /resume/delete-edu/id
router.post("/resume/delete-project/:projectid", isAuthenticated, deleteproject)

//--------------------------------------skill------------------------------------------
//post/add
router.post("/resume/add-skill", isAuthenticated, addskill)

//post /resume/edit-edu/id
router.post("/resume/edit-skill/:skillid", isAuthenticated, editskill)

//post /resume/delete-edu/id
router.post("/resume/delete-skill/:skillid", isAuthenticated, deleteskill)

//--------------------------------------accom------------------------------------------
//post/add
router.post("/resume/add-accom", isAuthenticated, addaccom)

//post /resume/edit-edu/id
router.post("/resume/edit-accom/:accomid", isAuthenticated, editaccom)

//post /resume/delete-edu/id
router.post("/resume/delete-accom/:accomid", isAuthenticated, deleteaccom)



module.exports =router