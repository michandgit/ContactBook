const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");


const validateToken = asyncHandler(async (req,res ,next)=>{
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET , (err ,decoded )=>{
            if(err){
                return res.status(401).json({message: "User is not authorised"});
            }else{
                req.user = decoded.user;
                next();
            }
        } )
        if(!token){
            return res.status(401).json({message:"USer is not authorized or token is missing!"});

        }
    }else{
        return res.status(401).json({ message: "No authorization header found" });
    }

})

module.exports = validateToken;