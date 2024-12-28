import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { CourseData } from "../../context/CourseContext";
import courseImageJapanese from "./assets/japan-course.png";
import courseImageCulture from "./assets/Culture.jpg";
import courseImageVietnamese from "./assets/vietnamese.jpg";
import axios from "axios";
// import { CalendarIcon } from "@heroicons/react/outline";
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faCheck, faLock } from "@fortawesome/free-solid-svg-icons";
import {Button} from "@mui/material";
import axiosInstance from "@/api/axiosInstance";

const CourseStudy = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [completedLectures, setCompletedLectures] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Tab1");

  const params = useParams();
  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  const handleLectureCompletion = (lectureId) => {
    setCompletedLectures((prev) => [...prev, lectureId]);
  };

  async function fetchLectures() {
    try {
      const { data } = await axiosInstance.get(`/api/lectures/${params.id}`);
      setLectures(data.lectures);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function fetchProgress() {
    try {
      const { data } = await axiosInstance.get(`/api/user/progress?course=${params.id}`);
      setCompletedLectures(data.completedLectures);
      setProgress(data.progress);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCourse(params.id);
    fetchLectures();
    fetchProgress();
  }, [params.id]);

  // if (user && user.role !== "admin" && !user.subscription.includes(params.id)) return navigate("/");

  const categoryImages = {
    Japanese: courseImageJapanese,
    Culture: courseImageCulture,
    Vietnamese: courseImageVietnamese,
    Default: courseImageJapanese,
  };

  const [openChapters, setOpenChapters] = useState({}); // Track opened/closed chapters

  const toggleChapter = (chapterId) => {
    setOpenChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };
  const exercises = [
    {id: 1,
      title: "練習問題 1"
    },
    {id: 2,
      title: "練習問題 2"
    },
    {id: 3,
      title: "練習問題 3"
    },
    {id: 4,
      title: "練習問題 4"
    },
  ]

  const chapters = [
    {
      id: 1,
      title: "セクション1: 入門",
      description: "この章では、日本語の基本的な知識を学びます。",
      lectures: [
        "第1課: 日本語の概要",
        "第2課: ひらがなとカタカナ",
        "第3課: 挨拶と基本フレーズ",
      ],
      test: "テスト１:漢字"
    },
    {
      id: 2,
      title: "セクション2: 文法の基礎",
      description: "この章では、日本語の文法について学びます。",
      lectures: [
        "第1課: 動詞と形容詞の使い方",
        "第2課: 助詞の基本",
        "第3課: 日常会話の例",
      ],
      test: "テスト２:文法"
    },
    {
      id: 3,
      title: "セクション3: 応用",
      description: "この章では、応用的な日本語スキルを習得します。",
      lectures: [
        "第1課: ビジネス日本語の基本",
        "第2課: 読解と作文の練習",
        "第3課: 試験対策",
      ],
      test: "テスト３:リスニング"
    },
  ];
  
  const handleRedirect = () => {
    navigate(`/lectures/${course._id}`);
  };

  return (
    <>
  {course && (
    <div className="flex flex-col gap-6 h-[1200px]">
      {/* Section 1: Course Title and Progress Bar */}
      <div className="flex flex-col gap-4 border-b pb-4 bg-gradient-to-r from-blue-100 to-blue-300 pl-5 text-gray-800 shadow-lg rounded-lg">
        <h1 className="text-left text-[45px] font-bold text-blue-900">{course.title}</h1>
        <div className="flex">
          {/* Progress */}
          <div className="w-48">
            <div className="h-7 bg-gray-300 rounded">
              <div
                className="h-full bg-green-400 rounded"
                style={{ width: "30%" }}
              ></div>
            </div>
          </div>
          {/* Start Date */}
          <div className="flex ml-6 items-center">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-700 pr-3" size="lg" />
            <div>
              <p className="text-gray-800">11-03-2024</p>
            </div>
          </div>
        </div>
        {/* bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 */}
        <button onClick={handleRedirect} className="w-[200px] bg-blue-500 from-green-400 to-green-600 text-white py-2 px-4 rounded shadow hover:bg-blue-600 transition-all duration-300">
          続ける
        </button>
      </div>

      <div className="flex ">
        {/* Section 3 */}
        <div className="m-8 mt-6 w-full bg-gray-100 shadow rounded-lg">
            {/* Tab Headers */}
            <div className="flex border-b">
              <button
                className={`flex-1 py-2 px-4 text-center ${
                  activeTab === "Tab1" ? "bg-blue-200 font-bold border-b-2 border-blue-200" : "text-gray-600"
                }`}
                onClick={() => setActiveTab("Tab1")}
              >
                学習
              </button>
              <button
                className={`flex-1 py-2 px-4 text-center ${
                  activeTab === "Tab2" ? "bg-blue-200 font-bold border-b-2 border-blue-200" : "text-gray-600"
                }`}
                onClick={() => setActiveTab("Tab2")}
              >
                練習
              </button>
            </div>

            <div className="p-4">
              {activeTab === "Tab1" && (
                <div>
                  {chapters.map((chapter) => (
                    <div key={chapter.id} className="mb-4">
                      {/* Chapter Header */}
                      <button
                        className="w-full text-left py-2 px-4 bg-gray-300 rounded flex justify-between items-center"
                        onClick={() => toggleChapter(chapter.id)}
                      >
                        <span className="font-bold">{chapter.title}</span>
                        <span>{openChapters[chapter.id] ? "▲" : "▼"}</span>
                      </button>
                      
                      {chapter.id === 1 ? 
                        openChapters[chapter.id] && (
                          <div className="mt-2 pl-4">
                            {/* Mô tả chương */}
                            <div className="mb-4 text-gray-700 font-medium">
                              <p>{chapter?.description}</p>
                            </div>

                            {/* Danh sách bài học */}
                            <div className="flex">
                              <Link
                                to={`/lectures/${course._id}`}
                                className="m-2 w-full bg-gray-200 text-black rounded hover:bg-gray-300 flex items-center justify-between gap-2 py-2 p-2"
                              >
                                <span className="text-left">{chapter?.lectures[0]}</span>
                                <FontAwesomeIcon icon={faCheck} className="text-green-500 text-[20px]" />
                              </Link>
                            </div>
                            <div className="flex">
                              <Link
                                to={`/lectures/${course._id}`}
                                className="m-2 w-full bg-gray-200 text-black rounded hover:bg-gray-300 flex items-center justify-between gap-2 py-2 p-2"
                              >
                                <span className="text-left">{chapter?.lectures[1]}</span>
                                <FontAwesomeIcon icon={faCheck} className="text-green-500 text-[20px]" />
                              </Link>
                            </div>
                            <div className="flex">
                              <Link
                                to={`/lectures/${course._id}`}
                                className="m-2 w-full bg-gray-200 text-black rounded hover:bg-gray-300 flex items-center justify-between gap-2 py-2 p-2"
                              >
                                <span className="text-left">{chapter?.lectures[2]}</span>
                                <FontAwesomeIcon icon={faCheck} className="text-green-500 text-[20px]" />
                              </Link>
                            </div>

                            {/* test */}
                            <div className="flex">
                              <Link
                                to={`/course/${course._id}/tests`}
                                className="m-2 w-full bg-red-200 text-black rounded hover:bg-red-300 flex items-center justify-between gap-2 py-2 p-2"
                              >
                                <span className="text-left">{chapter?.test}</span>
                                <FontAwesomeIcon icon={faCheck} className="text-green-500 text-[20px]" />
                              </Link>
                            </div>

                          </div>
                        ) : 
                        openChapters[chapter.id] && (
                          <div className="mt-2 pl-4">
                            {/* Mô tả chương */}
                            <div className="mb-4 text-gray-700 font-medium">
                              <p>{chapter?.description}</p>
                            </div>

                            {/* Danh sách bài học */}
                            <div className="flex">
                              <Link
                                to={`/lectures/${course._id}`}
                                className="m-2 w-full bg-gray-200 text-black rounded hover:bg-gray-300 flex items-center justify-between gap-2 py-2 p-2"
                              >
                                <span className="text-left">{chapter?.lectures[0]}</span>
                                <FontAwesomeIcon icon={faLock} className="text-green-500 text-[20px]" />
                              </Link>
                            </div>
                            <div className="flex">
                              <Link
                                to={`/lectures/${course._id}`}
                                className="m-2 w-full bg-gray-200 text-black rounded hover:bg-gray-300 flex items-center justify-between gap-2 py-2 p-2"
                              >
                                <span className="text-left">{chapter?.lectures[1]}</span>
                                <FontAwesomeIcon icon={faLock} className="text-green-500 text-[20px]" />
                              </Link>
                            </div>
                            <div className="flex">
                              <Link
                                to={`/lectures/${course._id}`}
                                className="m-2 w-full bg-gray-200 text-black rounded hover:bg-gray-300 flex items-center justify-between gap-2 py-2 p-2"
                              >
                                <span className="text-left">{chapter?.lectures[2]}</span>
                                <FontAwesomeIcon icon={faLock} className="text-green-500 text-[20px]" />
                              </Link>
                            </div>
                            {/* test */}
                            <div className="flex">
                              <Link
                                to={`/course/${course._id}/tests`}
                                className="m-2 w-full bg-red-200 text-black rounded hover:bg-red-300 flex items-center justify-between gap-2 py-2 p-2"
                              >
                                <span className="text-left">{chapter?.test}</span>
                                <FontAwesomeIcon icon={faLock} className="text-green-500 text-[20px]" />
                              </Link>
                            </div>


                          </div>
                        )
                      }   
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "Tab2" && 
              <div>
                {/* Đây là nội dung của Tab 2. */}
                {
                  exercises.map((exercise) => (
                    <div className="flex">
                      <Link
                        to={`/course/${course._id}/practices`}
                        className="m-2 w-full bg-gray-200 text-black rounded hover:bg-gray-300 flex items-center justify-between gap-2 py-2 p-2"
                      >
                        <span className="text-left">{exercise.title}</span>
                        
                      </Link>
                    </div>
                  )
                    
                  )
                }
              </div>}
            </div>
        </div>

        {/* Section 2: Course Stats */}
        <div className="h-[400px] w-[600px] p-4 bg-white shadow-lg rounded-lg flex flex-col gap-4">
          <div className="w-full bg-yellow-200 rounded-lg overflow-hidden flex justify-center items-center">
            <img
              src={categoryImages[course.category] || categoryImages["Default"]}
              alt="Thumbnail"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-gray-800">
            <p className="font-medium text-500">レッスン数: 10</p>
            <p className="font-medium text-500">演習問題数: 4</p>
            <p className="font-medium text-500">テスト数: 9</p>
            <p className="font-medium text-500">受講者数: 11</p>
          </div>
          <button onClick={handleRedirect} className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            続ける
          </button>
        </div>
        {/* </div> */}
      </div>

    </div>
  )}
</>

  );
};

export default CourseStudy;
