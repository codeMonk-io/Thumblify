import { Request,Response ,NextFunction } from "express";

const protect= async(req:Request,res:Response,next:NextFunction)=>{
    const {isLoggedIn,userId}=req.session; 
    if(!isLoggedIn || !userId) return res.status(401).json({message:"Not Logged in"});

    next();


}

export default protect;