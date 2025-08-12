// here i will create a database connection utility
import mongoose from 'mongoose';
export default async function connectToDatabase() {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    try {
        console.log("Connecting to MongoDB...", process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error("Failed to connect to database");
    }
}