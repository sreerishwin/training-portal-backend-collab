const noResponse = (res) =>{
    return res.status(204).json({
        status:"success",
        message:"No content"
    });
}
const errorResponse = (res,message,code=500,details="")=>{
    return res.status(code).json({
        status:"error",
        message,
        error:{
            code,details
        }
    });
}
const successResponse = (res,data,message="Successful")=>{
    return res.status(200).json({
        status:"success",
        data,
        message
    })
}
module.exports = {
    noResponse,
    errorResponse,
    successResponse
}