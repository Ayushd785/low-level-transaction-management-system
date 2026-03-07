import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required : [true, "email is required"],
        unique: true,
        trim: true,
        lowercase: true, 
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email"]
    },
    name:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        minLength: 6,
        required: true,
    }
})

export const User = mongoose.model("user",userSchema);