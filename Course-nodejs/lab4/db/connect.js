const mongoose = require('mongoose');

async function connectDB(uri) {
  const mongoUri = uri || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lab3';
  await mongoose.connect(mongoUri, {
    // useNewUrlParser and useUnifiedTopology are defaults in recent mongoose
  });
  console.log('Connected to MongoDB');
}

module.exports = connectDB;
