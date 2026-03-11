import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        index: true
    },
    status:{
        type: String,
        enum:{
            values:["ACTIVE","FROZEN","CLOSED"],
            message:"Status can only be ACTIVE, FROZEN or CLOSED",
            
        },
        default: "ACTIVE"
    },
    currency:{
        type: String,
        required: true,
        default: "INR"
    }
},{
    timestamps: true
})

accountSchema.index({userId: 1, status: 1});


const accountModel = mongoose.model("account", accountSchema);

export default accountModel;