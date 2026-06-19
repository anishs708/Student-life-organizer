const errorHandler = (err,req,res,next)=>{
    const status = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
    res.status(status).json({
    error: err.message || "server error"
    });
}
export default errorHandler;