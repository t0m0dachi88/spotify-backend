const mongoose=require('mongoose');

async function connectDB()
{
    try {
        await mongoose.connect(process.env.MONGOOSE);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:',error);
        process.exit(1);
    }
}

module.exports = { connectDB };