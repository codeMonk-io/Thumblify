import { Request, Response } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

//register User
export const registerUser=async(req: Request, res: Response )=>{
    try {
        const{name,email,password}=req.body;
        if(!name || !email || !password) return res.status(400).json({message:"All fields are required"});
        
        const user= await User.findOne({email});
        if(user) return res.status(400).json({message:"User already exists"});

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser= new User({name,email,password:hashedPassword});
        await newUser.save();
        req.session.isLoggedIn = true;
        req.session.userId = String(newUser._id);

        return res.json({
            message:"User registered successfully",
            user:{
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email
            }
        })



        
        
    } catch (error:any) {
        console.log(error);
        
        return res.status(500).json({message:error.message});
    }
} 

//login user
export const loginUser= async (req: Request, res: Response)=>{
    try {
        const{email,password}=req.body;
        if( !email || !password) return res.status(400).json({message:"All fields are required"});
        
        const user= await User.findOne({email});
        if(!user) return res.status(400).json({message:"invalid email or password"});
        const isPasswordCorrect= await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect) return res.status(400).json({message:"invalid email or password"});


        req.session.isLoggedIn = true;
        req.session.userId = String(user._id);

        return res.json({
            message:"login successfully",
            user:{
                _id:user._id,
                name:user.name,
                email:user.email
            }
        })
        
    } catch (error:any) {
        console.log(error);
        
        return res.status(500).json({message:"Server error"});
        
    }
}

// logout user
export const logoutUser = async (req: Request, res: Response)=>{
    req.session.destroy((error: any)=>{
        if(error){
            console.log(error)
            return res.status(500).json({message: error.message})
        }
    })
    return res.json({message: 'Logout successful'})
}

// verify user
export const verifyUser= async (req: Request, res: Response)=>{
     try {
        const {userId}=req.session;
        const user= await User.findById(userId).select("-password");
        if(!user) return res.status(400).json({message:"User not found"});
        return res.json({user});

    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ message: "error.message" });
    }      
}


