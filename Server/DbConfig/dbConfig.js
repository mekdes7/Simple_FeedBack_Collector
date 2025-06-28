import mongoose from "mongoose";
import dotenv from "dotenv";
export const dbConfig = async() => {
    dotenv.config();
    try {
      await mongoose.connect(process.env.MONGO_URI)  
        console.log(`Database connected successfully ${process.env.MONGO_URI}`);

    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); 
        
    }
}