const mongoose = require('mongoose');
require('dotenv').config();

async function cleanupNameField() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://irfan:noorejannat@ac-63qoga5-shard-00-00.oakenxg.mongodb.net:27017,ac-63qoga5-shard-00-01.oakenxg.mongodb.net:27017,ac-63qoga5-shard-00-02.oakenxg.mongodb.net:27017/spotify-backend?ssl=true&replicaSet=atlas-s2do6s-shard-0&authSource=admin&retryWrites=true&w=majority&appName=yt-backend");
    console.log('Connected to MongoDB');
    
    const db = mongoose.connection.db;
    
    // First, check how many documents have a name field (any value, including null)
    const countWithName = await db.collection('users').countDocuments({ name: { $exists: true } });
    console.log(`Documents with 'name' field: ${countWithName}`);
    
    // If there are any, unset the name field
    if (countWithName > 0) {
      const result = await db.collection('users').updateMany(
        { name: { $exists: true } },
        { $unset: { name: "" } }
      );
      console.log(`Unset name field in ${result.modifiedCount} documents`);
    } else {
      console.log('No documents with name field found.');
    }
    
    // Verify by checking again
    const countAfter = await db.collection('users').countDocuments({ name: { $exists: true } });
    console.log(`Documents with 'name' field after cleanup: ${countAfter}`);
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

cleanupNameField();