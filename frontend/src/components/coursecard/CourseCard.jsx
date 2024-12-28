import React from "react";
import "./courseCard.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import courseImageJapanese from "./japan-course.png";
import courseImageCulture from "./Culture.jpg";
import courseImageVietnamese from "./vietnamese.jpg";
import { useLocation } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
import { sample_course_id } from "@/main"

const CourseCard = ({ course }) => {
  const categoryImages = {
    "Japanese": courseImageJapanese,
    "Culture": courseImageCulture,
    "Vietnamese": courseImageVietnamese,
    "Default": courseImageJapanese, 
  };

  // Checking if we are in the Admin route
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const navigate = useNavigate();

  // Simulating user's progress for each course (static data)
  const completedLessons = course.completedLessons || 0;  // Static number of completed lessons
  const totalLessons = course.totalLessons || 0;  // Total lessons in the course
  const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;  // Calculate progress

  // Simulate whether the user has subscribed or studied the course
  const isSubscribed = true;  // Simulate subscription status (for demo purposes)

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this course")) {
      try {
        const { data } = await axiosInstance.delete(`/api/course/${id}`);
        toast.success(data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  // Status - Studied or Not Studied
  const isStudied = isSubscribed ? "Studied" : "Not Studied"; 

  return (
    <div className="course-card">
      <img
        src={categoryImages[course.category] || categoryImages["Default"]}
        alt={course.category}
        className="course-image"
      />
      <h3 className="text-left">{course.title}</h3>
      
      <p  className="text-left">講師: {course.createdBy}</p>
      <p  className="text-left">間隔: {course.duration} 週間</p>

      
      {
      [
        "676cc96539a994da77bac09b",
        "676cc96539a994da77bac09d",
        "676cc96539a994da77bac09f",
        "676cc96539a994da77bac0a0",
        "676cc96539a994da77bac0a1",
        "676cc96539a994da77bac0a3",
      ].includes(course?._id) ? (
        <div className="flex justify-between items-center space-x-4">
          {/* Progress Bar */}
          <div className="w-28">
            <div className="h-7 bg-gray-300 rounded">
              <div
                className="h-full bg-green-400 rounded"
                style={{ width: "30%" }}
              ></div>
            </div>
          </div>

          {/* Button */}
          <div className="mb-2">
            <button
              onClick={() => navigate(`/course/${course._id}`)}
              className="h-7 flex items-center justify-center bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              続ける
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center space-x-4">
          {/* Progress Bar */}
          <div className="w-28">
            <div className="h-7 bg-white-300 rounded">
              <div
                className="h-full bg-white-400 rounded"
                style={{ width: "30%" }}
              ></div>
            </div>
          </div>

          {/* Button */}
          <div className="mb-2">
            <button
              onClick={() => navigate(`/course/${course._id}`)}
              className="h-7 flex items-center justify-center bg-blue-500 text-white rounded hover:bg-blue-600"
              style={{
                clipPath: "polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%)",
              }}
            >
              登録
            </button>
          </div>
        </div>
      )
    }
      

      

      
    </div>
  );
};

export default CourseCard;
