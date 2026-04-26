const express=require('express');
require('dotenv').config();
const { connectDB }=require('./db/db');
const authRoutes=require('./routes/auth.routes');
const app=express();
connectDB();
app.use(express.json());
app.use('/api/auth', authRoutes);
//app.use(cookiParser());

module.exports=app;