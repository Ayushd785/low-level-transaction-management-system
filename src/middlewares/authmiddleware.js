import express from 'express'
import jwt from 'jsonwebtoken'

export const authMiddleware = (req,res,next) =>{
    const authHeader = req.headers.authorization;

    const token = authHeader || req.cookies.token;

    if(!token){
        return res.status(400).json({
            msg:"Token is not provided in a valid format"
        });
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.userId = decoded.userId;
        next();
    }catch(error){
        return res.status(500).json({
            msg:"Server error",
            err:error.message
        })
    }
}