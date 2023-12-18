exports.sendToken = (student, statuscode, res)=>{
     const token = student.getjwttoken();

     const expire =new Date(Date.now()+parseInt(process.env.COOKIE_EXPIRE) *24*60*60*1000)

     const options = {
         expires : expire,
         httpOnly : true,
        //  secure:true
     }

     res.status(statuscode).cookie("token",token,options).json({
        success:true,
        token,
        student:student
     })

   //   res.json({token})
}

