const jwt = require("jsonwebtoken");

exports.AuthorizeUser = async (req,res,next) => {
    // Check whether access token exists
    if(!req.headers['access-token']) 
        return res.status(401).send({msg : "Unauthorised : Access Token not found"})
    
    // Verify token
    try{
        req.body.user = await jwt.verify(req.headers['access-token'], process.env.SECRET_KEY);
        next();
    } catch(err) {
        res.status(401).send({msg : "Unauthorised : Invalid Access Token"})
    }
}

exports.isAdmin = async (req,res,next) => {
    req.body.user.role === "Admin" ? next() : res.status(401).send({msg : "You are not Admin"})   
}