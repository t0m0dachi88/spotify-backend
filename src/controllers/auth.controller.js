const userModel = require("../model/user.model");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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
const hash=await bcrypt.hash(password,10)
const newUser=await userModel.create(
    {
        username,
        email,
        password:hash,
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

async function loginUser(req,res)
{
    const {username,email,password}=req.body;
 const newUser=await  userModel.findOne(
    {
        $or:[
            {username},
            {email}
        ]
    }
)
if(!newUser)
    {
        return res.status(400).json({message:"Invalid credentials"})    
        
    }
const isPasswordValid=await bcrypt.compare(password,newUser.password);
  if(!isPasswordValid)  {
    return res.status(400).json({message:"Invalid credentials"})    
  }
  const token=jwt.sign(
    {
        id:newUser._id,
        role:newUser.role
    },process.env.JWT
  )
  res.cookie("token",token)
  res.status(200).json(
    {   message:"user logged in successfully",
        user:{
            id:newUser._id,
            username:newUser.username,
            email:newUser.email,
            role:newUser.role
        }
    }
)
}

module.exports={
    registerUser,
    loginUser
}