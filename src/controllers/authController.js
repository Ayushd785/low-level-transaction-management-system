import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.js'

export const register = async (req, res) =>{
    const {email, name, password} = req.body;
    try{
        const isExist = await User.findOne({email});
        if(isExist){
            return res.status(400).json({              
                msg:"The user already exists"
            })
        }
        const hashedpassword = await bcrypt.hash(password,10);
        const user = await User.create({
            email,
            name,
            password: hashedpassword,
        });

        const response = {
            email,
            name
        }

        return res.status(201).json({
            response: response,
            msg:"User created successfully"
        });

    }catch(error){
        return res.status(500).json({
            msg:"Unexpected server error",
            err:error
        })
    }
}

export const login =  async(req, res)=>{
    const {email, password} = req.body;
    try{
        if(!email || !password){
            return res.status(300).json({
                msg:"Bad request please enter the credentials"
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(300).json({
                msg:"User does not exist please register"
            })
        }
        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid){
            return res.status(301).json({
                msg:"Incorrect credentials"
            })
        }
        const token = await jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );
        const response = {
            name: user.name,
            email: user.email,
            token
        }

        return res.status(201).json({
            msg:"User logged in successfully",
            res: response,
        })

    }catch(error){
        res.status(400).json({
            "msg":"Server error",
            "err":error.message
        })
    }
}