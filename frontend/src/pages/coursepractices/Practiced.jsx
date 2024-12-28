import React, { useEffect, useState } from "react";
// import "./lecture.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import PracticeOverview from "../../components/practiceoverview/PracticeOverview"
import DoPractice from "../../components/practiceoverview/DoPractice"
import PracticeResult from "../../components/practiceoverview/PracticeResult"
import ReviewPractice from "../../components/practiceoverview/ReviewPractice"
import axiosInstance from "@/api/axiosInstance";
import { sample_course_id } from "@/main"
import { practiceSet } from "@/pages/coursepractices/CoursePractices"


const Practiced = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState({});
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [isReview, setIsReview] = useState(false);

  async function fetchLectures() {
    try {
      const { data } = await axiosInstance.get(`/api/lectures/${sample_course_id}`);
      setLectures(data.lectures);
      setLoading(false);
      
      if (data.lectures.length > 0) {
        setLecture(data.lectures[0]);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const handleEndPractice = () => {
    toast.success("Practice finished!");
    setIsEnd(true);
    setIsStart(false);
  }

    const handleReview = () => {
        setIsReview(true);
    }  

  const handleStartPractice = () => {
    setIsStart(true);
  }

  const handleBack = () => {
    navigate(-1); // Quay lại trang trước
  };

  const navigateLecture = (direction) => {
    const currentIndex = lectures.findIndex((lec) => lec._id === lecture._id);
    const nextIndex =
      direction === "next"
        ? (currentIndex + 1) % lectures.length
        : (currentIndex - 1 + lectures.length) % lectures.length;
    setLecture(lectures[nextIndex]);
  };

  useEffect(() => {
    fetchLectures();
  }, []);
  
  return (
    <div className="">
      {
        loading ? (<Loading />) :(
          isEnd ? <PracticeResult/> :
        <>
          {
            isReview ? <ReviewPractice practice = {practiceSet.practice1}/> : <PracticeOverview practice = {practiceSet.practice1}/> 
          }
          <div className="flex justify-center mt-10">
          {isReview ? (
              <button
              onClick={handleBack}
              className="px-8 mb-5 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 shadow-md transition-all duration-200"
            >
              コースに戻る
            </button>
            ) : (
              <button
                onClick={handleReview}
                className="px-8 mb-5 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600"
              >
                レビュー
              </button>
            )}
            </div>
            
        </>
        )
      }
    </div>
  )}

export default Practiced;
{/* <TestOverview test = {test1}/> */}