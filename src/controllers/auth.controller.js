const userModel = require('../models/user.model');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
 const {username, email,password,role}=req.body
 const isUserAlreadyExist=await userModel.findOne(
    {$or:[
        {username},
        {email}
    ]}
 )

if(isUserAlreadyExist)
{
    return res.status(400).json({message:"User already exist"})
}
const newUser=await userModel.create(
    {
        username,
        email,
        password,
        role
    }
)
const token=jwt.sign(
    {
        id:newUser._id,
        role:newUser.role
    },
    process.env.JWT
)
res.cookie("token",token)
res.status(200).json(
    {
        message:"user reg successfully",
        user:{
            id:newUser._id,
            username:newUser.username,
            email:newUser.email,
            role:newUser.role
        }
    }
)
}