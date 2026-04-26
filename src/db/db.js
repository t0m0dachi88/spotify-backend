const mongoose=require('mongoose');

async function connectDB()
{
    try {
        await mongoose.connect("mongodb://irfan:noorejannat@ac-63qoga5-shard-00-00.oakenxg.mongodb.net:27017,ac-63qoga5-shard-00-01.oakenxg.mongodb.net:27017,ac-63qoga5-shard-00-02.oakenxg.mongodb.net:27017/spotify-backend?ssl=true&replicaSet=atlas-s2do6s-shard-0&authSource=admin&retryWrites=true&w=majority&appName=yt-backend");
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:',error);
        process.exit(1);
    }
}

module.exports = { connectDB };