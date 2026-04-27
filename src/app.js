const express=require('express');
const cookieParser = require('cookie-parser');
const cors=require('cors');

require('dotenv').config();
const { connectDB }=require('./db/db');
const authRoutes=require('./routes/auth.routes');
const musicRoutes=require('./routes/music.routes');
const app=express();
connectDB();
app.use(express.json());

app.use(cors({
    origin:'http://localhost:3001',
    credentials:true
}));
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/music', musicRoutes);
//app.use(cookiParser());

module.exports=app;