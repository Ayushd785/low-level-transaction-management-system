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