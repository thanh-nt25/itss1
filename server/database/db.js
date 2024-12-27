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

    // const seedData = async () => {
    //   const seedUsers = [
    //     {
    //       name: "John Doe",
    //       email: "johndoe@example.com",
    //       password: "hashedpassword123",
    //       role: "admin",
    //       mainrole: "admin",
    //       subscription: [],
    //       resetPasswordExpire: null,
    //     },
    //     {
    //       name: "Jane Smith",
    //       email: "janesmith@example.com",
    //       password: "hashedpassword456",
    //       role: "user",
    //       mainrole: "user",
    //       subscription: [],
    //       resetPasswordExpire: null,
    //     },
    //     {
    //       name: "Jane ",
    //       email: "janes@example.com",
    //       password: "hashedpassword4567",
    //       role: "user",
    //       mainrole: "user",
    //       subscription: [],
    //       resetPasswordExpire: null,
    //     },
    //     {
    //       name: "Smith",
    //       email: "smith@example.com",
    //       password: "hashedpassword45678",
    //       role: "user",
    //       mainrole: "user",
    //       subscription: [],
    //       resetPasswordExpire: null,
    //     },
    //   ];

    //   const seedCourses = [
    //     {
    //       title: "Japanese Advanced 1",
    //       description: "Learn the advanced of Japanese with instructor.",
    //       image: "https://www.classcentral.com/report/wp-content/uploads/2023/02/ASL-BCG-Banner.png",
    //       price: 0,
    //       duration: 40,
    //       category: "Japanese",
    //       createdBy: "Kimura",
    //     },
    //     {
    //       title: "Japanese Culture",
    //       description: "Learn the advanced of Japanese Culture with instructor.",
    //       image: "https://www.classcentral.com/report/wp-content/uploads/2023/02/ASL-BCG-Banner.png",
    //       price: 0,
    //       duration: 40,
    //       category: "Culture",
    //       createdBy: "Kimura",
    //     },
    //     {
    //       title: "Vietnamese",
    //       description: "Learn the advanced of Vietnamese with instructor.",
    //       image: "https://www.classcentral.com/report/wp-content/uploads/2023/02/ASL-BCG-Banner.png",
    //       price: 0,
    //       duration: 40,
    //       category: "Vietnamese",
    //       createdBy: "Nguyen Thi Thu Huong",
    //     },
    //     {
    //       title: "Japanese Advanced",
    //       description: "Learn the advanced of Japanese with instructor.",
    //       image: "https://www.classcentral.com/report/wp-content/uploads/2023/02/ASL-BCG-Banner.png",
    //       price: 0,
    //       duration: 40,
    //       category: "Japanese",
    //       createdBy: "Kimura",
    //     },
    //     {
    //       title: "Japanese Culture",
    //       description: "Learn the advanced of Japanese Culture with instructor.",
    //       image: "https://www.classcentral.com/report/wp-content/uploads/2023/02/ASL-BCG-Banner.png",
    //       price: 0,
    //       duration: 40,
    //       category: "Culture",
    //       createdBy: "Kimura",
    //     },
    //     {
    //       title: "Vietnamese",
    //       description: "Learn the advanced of Vietnamese with instructor.",
    //       image: "https://www.classcentral.com/report/wp-content/uploads/2023/02/ASL-BCG-Banner.png",
    //       price: 0,
    //       duration: 40,
    //       category: "Vietnamese",
    //       createdBy: "Nguyen Thi Thu Huong",
    //     },
    //     {
    //       title: "Japanese Advanced",
    //       description: "Learn the advanced of Japanese with instructor.",
    //       image: "https://www.classcentral.com/report/wp-content/uploads/2023/02/ASL-BCG-Banner.png",
    //       price: 0,
    //       duration: 40,
    //       category: "Japanese",
    //       createdBy: "Kimura",
    //     },
    //     {
    //       title: "Japanese Culture",
    //       description: "Learn the advanced of Japanese Culture with instructor.",
    //       image: "https://www.classcentral.com/report/wp-content/uploads/2023/02/ASL-BCG-Banner.png",
    //       price: 0,
    //       duration: 40,
    //       category: "Culture",
    //       createdBy: "Kimura",
    //     },
    //     {
    //       title: "Vietnamese",
    //       description: "Learn the advanced of Vietnamese with instructor.",
    //       image: "https://www.classcentral.com/report/wp-content/uploads/2023/02/ASL-BCG-Banner.png",
    //       price: 0,
    //       duration: 40,
    //       category: "Vietnamese",
    //       createdBy: "Nguyen Thi Thu Huong",
    //     },
    //     {
    //       title: "Japanese Advanced",
    //       description: "Learn the advanced of Japanese with instructor.",
    //       image: "https://www.classcentral.com/report/wp-content/uploads/2023/02/ASL-BCG-Banner.png",
    //       price: 0,
    //       duration: 40,
    //       category: "Japanese",
    //       createdBy: "Kimura",
    //     },
    //     {
    //       title: "Japanese Culture",
    //       description: "Learn the advanced of Japanese Culture with instructor.",
    //       image: "https://www.classcentral.com/report/wp-content/uploads/2023/02/ASL-BCG-Banner.png",
    //       price: 0,
    //       duration: 40,
    //       category: "Culture",
    //       createdBy: "Kimura",
    //     },
    //     {
    //       title: "Vietnamese",
    //       description: "Learn the advanced of Vietnamese with instructor.",
    //       image: "https://www.classcentral.com/report/wp-content/uploads/2023/02/ASL-BCG-Banner.png",
    //       price: 0,
    //       duration: 40,
    //       category: "Vietnamese",
    //       createdBy: "Nguyen Thi Thu Huong",
    //     },
    //     {
    //       title: "Japanese Advanced",
    //       description: "Learn the advanced of Japanese with instructor.",
    //       image: "https://www.classcentral.com/report/wp-content/uploads/2023/02/ASL-BCG-Banner.png",
    //       price: 0,
    //       duration: 40,
    //       category: "Japanese",
    //       createdBy: "Kimura",
    //     },
    //     {
    //       title: "Japanese Culture",
    //       description: "Learn the advanced of Japanese Culture with instructor.",
    //       image: "https://www.classcentral.com/report/wp-content/uploads/2023/02/ASL-BCG-Banner.png",
    //       price: 0,
    //       duration: 40,
    //       category: "Culture",
    //       createdBy: "Kimura",
    //     },
    //     {
    //       title: "Vietnamese",
    //       description: "Learn the advanced of Vietnamese with instructor.",
    //       image: "https://www.classcentral.com/report/wp-content/uploads/2023/02/ASL-BCG-Banner.png",
    //       price: 0,
    //       duration: 40,
    //       category: "Vietnamese",
    //       createdBy: "Nguyen Thi Thu Huong",
    //     },
        
    //   ];

    //   const seedLectures = [
    //     {
    //       title: "Introduction to Japanese Language",
    //       description: "Overview of the Japanese language, its history, and basic structure.",
    //       video: "https://www.youtube.com/embed/BGz3pkoGPag",
    //       course: null,
    //     },
    //     {
    //       title: "Hiragana and Katakana Basics",
    //       description: "Learn the basic alphabets of Japanese: Hiragana and Katakana.",
    //       video: "https://www.youtube.com/embed/BGz3pkoGPag",
    //       course: null,
    //     },
    //     {
    //       title: "Japanese Greetings and Common Phrases",
    //       description: "Master essential greetings and everyday phrases in Japanese.",
    //       video: "https://www.youtube.com/embed/BGz3pkoGPag",
    //       course: null,
    //     },
    //     {
    //       title: "Numbers and Counting in Japanese",
    //       description: "Learn how to count and use numbers in Japanese.",
    //       video: "https://www.youtube.com/embed/BGz3pkoGPag",
    //       course: null,
    //     },
    //     {
    //       title: "Introduction to Kanji",
    //       description: "Explore the basics of Kanji, its origins, and simple Kanji characters.",
    //       video: "https://www.youtube.com/embed/BGz3pkoGPag",
    //       course: null,
    //     },
    //     {
    //       title: "Japanese Sentence Structure",
    //       description: "Understand the basic sentence structure and word order in Japanese.",
    //       video: "https://www.youtube.com/embed/BGz3pkoGPag",
    //       course: null,
    //     },
    //     {
    //       title: "Daily Conversations in Japanese",
    //       description: "Practice basic dialogues for everyday situations.",
    //       video: "https://www.youtube.com/embed/BGz3pkoGPag",
    //       course: null,
    //     },
    //     {
    //       title: "Introduction to Japanese Verbs",
    //       description: "Learn about verb groups, basic conjugation, and common verbs.",
    //       video: "https://www.youtube.com/embed/BGz3pkoGPag",
    //       course: null,
    //     },
    //     {
    //       title: "Cultural Insights: Japanese Traditions",
    //       description: "Explore traditional Japanese customs and their significance.",
    //       video: "https://www.youtube.com/embed/BGz3pkoGPag",
    //       course: null,
    //     },
    //     {
    //       title: "Pronunciation and Intonation in Japanese",
    //       description: "Improve your pronunciation and understand the intonation patterns in Japanese.",
    //       video: "https://www.youtube.com/embed/BGz3pkoGPag",
    //       course: null,
    //     },
    //     {
    //       title: "Getting Started with Python",
    //       description: "Introduction to Python syntax and basics.",
    //       video: "https://www.youtube.com/embed/BGz3pkoGPag",
    //       course: null, 
    //     },
    //     {
    //       title: "JavaScript Event Handling",
    //       description: "Learn how to handle events in JavaScript.",
    //       video: "https://www.youtube.com/embed/BGz3pkoGPag",
    //       course: null, 
    //     },
    //     {
    //       title: "JavaScript Event Handling",
    //       description: "Learn how to handle events in JavaScript.",
    //       video: "https://www.youtube.com/embed/BGz3pkoGPag",
    //       course: null, 
    //     },
    //     {
    //       title: "JavaScript Event Handling",
    //       description: "Learn how to handle events in JavaScript.",
    //       video: "https://www.youtube.com/embed/BGz3pkoGPag",
    //       course: null, 
    //     },
    //     {
    //       title: "JavaScript Event Handling",
    //       description: "Learn how to handle events in JavaScript.",
    //       video: "https://www.youtube.com/embed/BGz3pkoGPag",
    //       course: null, 
    //     },
    //     {
    //       title: "JavaScript Event Handling",
    //       description: "Learn how to handle events in JavaScript.",
    //       video: "https://www.youtube.com/embed/BGz3pkoGPag",
    //       course: null, 
    //     },
    //     {
    //       title: "JavaScript Event Handling",
    //       description: "Learn how to handle events in JavaScript.",
    //       video: "https://example.com/video2.mp4",
    //       course: null, 
    //     },
    //     {
    //       title: "JavaScript Event Handling",
    //       description: "Learn how to handle events in JavaScript.",
    //       video: "https://example.com/video2.mp4",
    //       course: null, 
    //     },
    //     {
    //       title: "JavaScript Event Handling",
    //       description: "Learn how to handle events in JavaScript.",
    //       video: "https://example.com/video2.mp4",
    //       course: null, 
    //     },
    //     {
    //       title: "JavaScript Event Handling",
    //       description: "Learn how to handle events in JavaScript.",
    //       video: "https://example.com/video2.mp4",
    //       course: null, 
    //     },
    //     {
    //       title: "JavaScript Event Handling",
    //       description: "Learn how to handle events in JavaScript.",
    //       video: "https://example.com/video2.mp4",
    //       course: null, 
    //     },
    //     {
    //       title: "JavaScript Event Handling",
    //       description: "Learn how to handle events in JavaScript.",
    //       video: "https://example.com/video2.mp4",
    //       course: null, 
    //     },
    //     {
    //       title: "JavaScript Event Handling",
    //       description: "Learn how to handle events in JavaScript.",
    //       video: "https://example.com/video2.mp4",
    //       course: null, 
    //     },
    //     {
    //       title: "JavaScript Event Handling",
    //       description: "Learn how to handle events in JavaScript.",
    //       video: "https://example.com/video2.mp4",
    //       course: null, 
    //     },
    //     {
    //       title: "JavaScript Event Handling",
    //       description: "Learn how to handle events in JavaScript.",
    //       video: "https://example.com/video2.mp4",
    //       course: null, 
    //     },
    //   ];

    //   try {
    //     await User.deleteMany({});
    //     await Courses.deleteMany({});
    //     await Lecture.deleteMany({});
    //     console.log("Old data removed");

    //     const users = await User.insertMany(seedUsers);
    //     console.log("Users added:", users);

    //     const courses = await Courses.insertMany(seedCourses);
    //     console.log("Courses added:", courses);
        
    //     // course 1
    //     seedLectures[0].course = courses[0]._id;
    //     seedLectures[1].course = courses[0]._id;
    //     seedLectures[2].course = courses[0]._id;
    //     seedLectures[3].course = courses[0]._id;
    //     seedLectures[4].course = courses[0]._id;
    //     seedLectures[5].course = courses[0]._id;
    //     seedLectures[6].course = courses[0]._id;
    //     seedLectures[7].course = courses[0]._id;
    //     seedLectures[8].course = courses[0]._id;
    //     seedLectures[9].course = courses[0]._id;
    //     // course 1
    //     seedLectures[10].course = courses[1]._id;
    //     seedLectures[11].course = courses[1]._id;
    //     seedLectures[12].course = courses[2]._id;
    //     seedLectures[13].course = courses[3]._id;
    //     seedLectures[14].course = courses[4]._id;
    //     seedLectures[15].course = courses[5]._id;
    //     seedLectures[16].course = courses[6]._id;
    //     seedLectures[17].course = courses[7]._id;
    //     seedLectures[18].course = courses[8]._id;
    //     seedLectures[19].course = courses[9]._id;
    //     seedLectures[20].course = courses[10]._id;
    //     seedLectures[21].course = courses[11]._id;
    //     seedLectures[22].course = courses[12]._id;
    //     seedLectures[23].course = courses[13]._id;
    //     seedLectures[24].course = courses[14]._id;

    //     const lectures = await Lecture.insertMany(seedLectures);
    //     console.log("Lectures added:", lectures);
    //   } catch (error) {
    //     console.error("Error seeding data:", error);
    //   }
    // };

    // const shouldSeed = true; 
    // if (shouldSeed) {
    //   await seedData();
    // }
  } catch (error) {
    console.log("Database connection error:", error);
  }
};
