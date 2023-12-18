exports.generatedErrors = (err,req,res,next)=>{
    const statusCode = err.statusCode || 500

    if(err.name ==="MongoServerError"){
        err.message="duplicate data"
    }

    res.status(statusCode).json({
        message : err.message,
        errName: err.name,
        // stack: err.stack  
    })
}