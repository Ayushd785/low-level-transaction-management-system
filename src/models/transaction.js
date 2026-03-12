import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    fromAccound:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: true,
        index: true
    },
    toAccount:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: true,
        index: true,
    },
    status:{
        enum:{
            values:["PENDING","COMPLETED","FAILED","REVERSED"],
            message:"Status can either be pending, completed , failed or reversed"
        },
        default: "PENDING"
    },
    amount:{
        type:Number,
        required: true,
        min: 0
    },

    idempotencyKey:{
        type: String,
        required: true,
        index: true,
        unique: true,
    }

},{
    timestamps:true
})