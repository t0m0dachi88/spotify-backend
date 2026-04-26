const express=require('express');
const { connectDB }=require('./db/db');
const authRoutes=require('./routes/auth.routes');
const app=express();
connectDB();
app.use(express.json());
app.use('/auth', authRoutes);
//app.use(cookiParser());

module.exports=app;