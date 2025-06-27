const logRequest = (req, res, next)=>{
    console.log("Request to:", req.path);
    next();
}

module.exports = logRequest;