require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
 
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on("connected", () => {
        console.log('MongoDB connected successfully ✅');
    });
    db.on("error", (error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    });
    console.log("MongoDB connected");
    
};

module.exports = connectDB; 