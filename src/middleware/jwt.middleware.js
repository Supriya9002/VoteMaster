import Jwt from "jsonwebtoken";
import ApplicationError from "./../error/applicationError.js"

const jwtAuth = (req, res, next)=>{
    const token = req.headers["authorization"];
    //console.log("token",token);
    if(!token){
        res.status(404).send("Unauthorized");
    }
    try{
        const payload = Jwt.verify(token, process.env.JWT_SECRET);
        //console.log("payload",payload);
        req.UserID = payload.UserID;
        //console.log("req.UserID",req.UserID)
    }catch(err){
        console.log(err);
        throw new ApplicationError("server error! Try later!!", 500);
    }
    next();
}

export default jwtAuth;