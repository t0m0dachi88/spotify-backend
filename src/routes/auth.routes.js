const express=require('express');

const router=express.Router();

router.post('/api/register',(req,res)=>{
    res.send("User registered successfully");
});

module.exports=router;