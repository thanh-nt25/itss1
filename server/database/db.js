import mongoose from "mongoose";
import { User } from "../models/User.js"; 
import { Courses } from "../models/Courses.js"; 
import { Lecture } from "../models/Lecture.js"; 
import dotenv from 'dotenv';

export const connectDb = async () => {
  dotenv.config();
  const mongoURI = process.env.DB; 
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database Connected Successfully");

   
  } catch (error) {
    console.log("Database connection error:", error);
  }
};
