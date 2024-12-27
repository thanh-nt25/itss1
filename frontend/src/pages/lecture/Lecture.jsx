import React, { useEffect, useState } from "react";
// import "./lecture.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axiosInstance from "@/api/axiosInstance";
import { sample_course_id } from "@/main"

const Lecture = ({ user }) => {
  const location = useLocation();
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
  // const navigate = useNavigate();

  async function fetchLectures() {
    try {
      const { data } = await axiosInstance.get(`/api/lectures/${sample_course_id}`);
      setLectures(data.lectures);
      setLoading(false);
      // console.log(data.lectures.length);
      
      if (data.lectures.length > 0) {
        setLecture(data.lectures[0]);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

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
    <div className="flex flex-col bg-gray-100 min-h-screen">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="lecture-page flex flex-col lg:flex-row justify-between min-h-[80vh] w-full">
            {/* Left Section */}
            <div className="left w-full p-4 flex flex-col items-center bg-white shadow-md">
              {lecLoading ? (
                <Loading />
              ) : (
                <>
                  {lecture ? (
                    <>
                      <div className="flex w-full mb-4">
                        <button
                          onClick={() => navigate(-1)}
                          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-left pl-4"
                          style={{
                            clipPath: "polygon(10% 0%, 100% 0%, 100% 100%, 10% 100%, 0% 50%)",
                          }}
                        >
                          コースに戻る
                        </button>
                      </div>

                      <div className="flex h-[150px] w-full justify-between items-center">
                        <div className="relative w-full h-full">
                          <h1 className="absolute top-0 left-0 text-left text-xl font-bold m-4 text-gray-900">
                            Lecture {lectures.findIndex((lec) => lec._id === lecture._id) + 1}: {lecture.title}
                          </h1>
                        </div>
                        <div className="flex justify-between mt-10">
                          <button
                            onClick={() => navigateLecture("prev")}
                            className={`w-[150px] mr-2 bg-gray-300 p-2 rounded flex items-center justify-center hover:bg-gray-400 ${
                              lectures.findIndex((lec) => lec._id === lecture._id) === 0
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            disabled={lectures.findIndex((lec) => lec._id === lecture._id) === 0}
                          >
                            <FaArrowLeft />
                            <p className="ml-2 text-gray-700">前</p>
                          </button>

                          <button
                            onClick={() => navigateLecture("next")}
                            className={`w-[150px] bg-gray-300 rounded flex items-center justify-center hover:bg-gray-400 ${
                              lectures.findIndex((lec) => lec._id === lecture._id) === lectures.length - 1
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            disabled={lectures.findIndex((lec) => lec._id === lecture._id) === lectures.length - 1}
                          >
                            <p className="mr-2 text-gray-700">次</p>
                            <FaArrowRight />
                          </button>
                        </div>
                      </div>

                      <iframe
                        width="100%"
                        height="600"
                        src={lecture.video.startsWith("http") ? lecture.video : `${import.meta.env.VITE_API_END_POINT}/${lecture.video}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="mb-4 rounded border border-gray-300"
                      ></iframe>

                      <div className="flex justify-start w-full">
                        <h3 className="text-left text-gray-600 w-full pl-4">
                          Description: {lecture.description}
                        </h3>
                      </div>
                    </>
                  ) : (
                    <h1 className="text-gray-500 text-center">講義を選択してください</h1>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Lecture;
