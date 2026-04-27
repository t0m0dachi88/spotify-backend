const express=require('express');
const multer=require('multer');
const router=express.Router();

const upload=multer(
    {
        storage:multer.memoryStorage()
    }
)

const uploadMusic=require('../controllers/music.controller');
router.post('/upload',upload.single('music'),uploadMusic.createMusic);

module.exports=router;