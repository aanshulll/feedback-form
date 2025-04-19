const mongoose = require("mongoose");

let db;

const connectDB = async () => {
    try {
        db = await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/testdb", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

const closeDB = async () => {
    if (db) {
        await mongoose.connection.close();
        console.log("MongoDB connection closed");
    }
};

module.exports = { connectDB, closeDB };