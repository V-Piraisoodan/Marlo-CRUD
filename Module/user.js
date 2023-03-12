const { response } = require("express");
const userModel = require("../Model/user");


exports.getUser = async(req,res,next)=>{
    try{
        const user = await userModel.find();
        res.send(user)
    }catch(err){
        console.log(err)
    }
}


exports.createUser = async (req,res,next)=>{
    const userData = new userModel({...req.body.user})
    const email = userData.email
    const phone = userData.phone
    try{
        const usermail = await userModel.findOne({email})
        if(usermail){
            res.send({msg:"Email Already Exist"})
            console.log("Email Already Exist")
            return
        }
        const userphone = await userModel.findOne({phone})
        if(userphone){
            res.send({msg:"Mobile Number Already Exist"})
            console.log("Mobile Number Already Exist")
            return
        }
        var response = await userData.save();
        res.send(response);
    }catch(err){
        console.log(err)
    }
}

exports.updateUser = async(req,res,next)=>{
    try{
        var response = await userModel.updateOne(
            {_id : req.params.userId},
            {...req.body.user},
            {runValidators : true})
            console.log(response,"Updated successfully")
            res.send(response)
    }catch(err){
        console.log(err,"Not updated")
        res.send(err)
    }
}

exports.deleteUser = async (req,res,next)=>{
    try{
        var response = await userModel.findByIdAndRemove(req.params.userId)
        console.log("Deleted Successfully")
        res.send(response) 
    }catch(err){
        console.log(err,"Not deleted")

    }
}