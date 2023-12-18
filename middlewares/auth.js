const { verify } = require("jsonwebtoken")
const ErrorHandler = require("../utils/errorHandler")
const { catchAsyncErrors } = require("./catchAsyncErrors")


exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies
    console.log(token)
    if (token) {
        try {
            const { id } = verify(token, process.env.JWT_SECRET)
            req.id=id
            next()
        } catch (error) {
            res.json(error)
        }
    }
    else{
        return next(new ErrorHandler("please login to access", 401))
    }
})