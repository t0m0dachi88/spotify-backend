const musicModel = require('../model/music.model');
const jwt = require('jsonwebtoken');
const { uploadFile } = require('../services/storage.service');

async function createMusic(req, res) {
    console.log('=== Music Upload Debug ===');
    console.log('Request cookies:', req.cookies);
    console.log('Request headers auth:', req.headers.authorization);
    console.log('Request file:', req.file ? 'exists' : 'MISSING');
    console.log('Request body:', req.body);

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized - No token found',
            cookies: req.cookies
        });
    }

    try {
        console.log('Token received:', token.substring(0, 20) + '...');
        const decoded = jwt.verify(token, process.env.JWT);
        console.log('Decoded token:', decoded);

        if (decoded.role !== 'artist') {
            return res.status(403).json({
                message: 'Forbidden - Role not artist',
                role: decoded.role
            });
        }

        const { title } = req.body;
        const file = req.file;

        console.log('File details:', file);

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        console.log('Calling uploadFile service...');
        const result = await uploadFile(file.buffer, file.mimetype);
        console.log('Upload result:', result);

        console.log('Creating music record in DB...');
        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: decoded.id
        });

        console.log('Music created:', music._id);
        res.status(200).json({
            message: 'Music uploaded successfully',
            music
        });
    } catch (err) {
        console.error('Error in createMusic:', err.message);
        console.error('Stack trace:', err.stack);
        return res.status(500).json({
            message: 'Server error',
            error: err.message
        });
    }
}

module.exports = { createMusic };
