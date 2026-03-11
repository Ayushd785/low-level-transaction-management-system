import  accountModel from "../models/account.js";

export const createAccount = async(req,res)=>{

    try{
        const userId = req.userId;
        if(!userId){
            return res.status(400).json({
                msg:"User not verified",
            })
        }

        const account = await accountModel.create({
            userId :userId
        })

        const response = {
            accountId: account._id,
        }

        res.status(200).json({
            msg:"Account created successfully",
            ...response
        })
    
    }catch(Err){
        return res.status(400).json({
            msg:"Error happened",
            error:Err.message
        })
    }

}