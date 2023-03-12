const { response } = require("express");
const userModel = require("../Model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// to get user details
exports.getUser = async(req,res,next)=>{
    try{
        const user = await userModel.find();
        res.send(user)
    }catch(err){
        console.log(err)
    }
}

// signup
exports.signup = async (req,res,next)=>{
    const userData = new userModel({...req.body.user})
    const email = userData.email
    const phone = userData.phone
    try{
        // to check the email is exist or not 
        const usermail = await userModel.findOne({email})
        if(usermail){
            res.status(400).send({msg:"Email Already Exist"})
            // console.log("Email Already Exist")
            return
        }
        // check the mobile number is 10digit or not
        if(phone.toString().length !==10){
            res.status(400).send({msg:"Please enter a valid mobile number"})
            return
        }
        // to check the mobile number exist or not
        const userphone = await userModel.findOne({phone})
        if(userphone){
            res.status(400).send({msg:"Mobile Number Already Exist"})
            // console.log("Mobile Number Already Exist")
            return
        }
        // password pattern chekking
        if(!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8}$/g.test(userData.password)){
            res.status(400).send({msg:"Password pattern did not match..,Password should be in minimum 8 charector,a combination of uppercase and lowercase letters and symbols.."})
        }
        // create the hashed password
        userData.password = await bcrypt.hash(userData.password,10)
        // console.log(userData.password)
        var response = await userData.save();
        res.send(response);
    }catch(err){
        console.log(err)
    }
}

exports.signin = async(req,res,next)=>{
    const userData = new userModel({...req.body.user})
    const email = userData.email
    const password = userData.password
    try{
        const storedMail = await userModel.findOne({email})
        if(!storedMail){
            res.status(401).send({msg:"Invalid Credential"})
        }
        const storedPassword = storedMail.password;
        // console.log(password,storedPassword,storedMail._id)
        const passMatch = await bcrypt.compare(password,storedPassword)  
        if(passMatch){
            // console.log("passmatch")
            const token = jwt.sign({id:storedMail._id},process.env.SECRET_KEY);
            res.send({msg:"Successfully login", token : token})
        } else{
            res.status(401).send({msg : "Invalid Credential"})
        }  
        res.send(passMatch)  
        
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
            // console.log(response,"Updated successfully")
            res.send(response)
    }catch(err){
        // console.log(err,"Not updated")
        res.send(err)
    }
}

exports.deleteUser = async (req,res,next)=>{
    try{
        var response = await userModel.findByIdAndRemove(req.params.userId)
        // console.log("Deleted Successfully")
        res.send(response) 
    }catch(err){
        console.log(err,"Not deleted")

    }
}