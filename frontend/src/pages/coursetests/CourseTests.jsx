import React, { useEffect, useState } from "react";
// import "./lecture.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import TestOverview from "../../components/testoverview/TestOverview"
import DoTest from "../../components/testoverview/DoTest"
import TestResult from "../../components/testoverview/TestResult"
import axiosInstance from "@/api/axiosInstance";
import { sample_course_id } from "@/main"

export const testSet = {
  "test1": {
    "title": "JLPT N5 練習テスト",
    "timeLimit": 600,
    "testImage": "https://newwindows.edu.vn/wp-content/uploads/2023/05/dang-ky-jlpt.jpg",
    "id": "test_001",
    "number_of_questions": 20,
    "description":"このテストは、日本語能力を測定するためのものです。語彙、文法、読解力を中心に、空欄補充や選択式の問題が含まれています。全20問で構成されており、初心者から中級レベルの学習者に適しています。すべての質問に正確に答え、あなたの実力を確認してください。頑張ってください！",
    "questions": [
      {
        "id": "q1",
        "type": "single_choice",
        "question": "「本」のせつめいはどれですか？",
        "options": [
          "Book",
          "Pen",
          "Chair",
          "Bag"
        ],
        "answer": "Book",
        "image": "https://example.com/question1.jpg"
      },
      {
        "id": "q2",
        "type": "single_choice",
        "question": "あさっての意味はどれですか？",
        "options": [
          "Today",
          "Tomorrow",
          "The day after tomorrow",
          "Yesterday"
        ],
        "answer": "The day after tomorrow",
        "image": "https://example.com/question2.jpg"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "「タベもの」に入るものはどれ？",
        "options": [
          "Apple",
          "Car",
          "Pen",
          "Chair"
        ],
        "answer": ["Apple", "Car"],
        "image": "https://example.com/question3.jpg"
      },
      {
        "id": "q4",
        "type": "single_choice",
        "question": "「かっこいい」の意味は？",
        "options": [
          "Cool",
          "Hot",
          "Cute",
          "Funny"
        ],
        "answer": "Cool",
        "image": "https://example.com/question4.jpg"
      },
      {
        "id": "q5",
        "type": "single_choice",
        "question": "「どっち」の意味は？",
        "options": [
          "Where",
          "Which",
          "Who",
          "What"
        ],
        "answer": "Which",
        "image": "https://example.com/question5.jpg"
      },
      {
        "id": "q6",
        "type": "single_choice",
        "question": "「雪」のせつめいは？",
        "options": [
          "Rain",
          "Snow",
          "Wind",
          "Fog"
        ],
        "answer": "Snow",
        "image": "https://example.com/question6.jpg"
      },
      {
        "id": "q7",
        "type": "single_choice",
        "question": "「きれい」の意味は？",
        "options": [
          "Dirty",
          "Clean",
          "Old",
          "New"
        ],
        "answer": "Clean",
        "image": "https://example.com/question7.jpg"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "「きる」の意味は？",
        "options": [
          "To eat",
          "To wear",
          "To cut",
          "To drink"
        ],
        "answer": ["To wear", "To cut"],
        "image": "https://example.com/question8.jpg"
      },
      {
        "id": "q9",
        "type": "single_choice",
        "question": "「とけい」のせつめいは？",
        "options": [
          "Clock",
          "Table",
          "Chair",
          "Bag"
        ],
        "answer": "Clock",
        "image": "https://example.com/question9.jpg"
      },
      {
        "id": "q10",
        "type": "single_choice",
        "question": "「通り」の意味は？",
        "options": [
          "Street",
          "Building",
          "Bridge",
          "Station"
        ],
        "answer": "Street",
        "image": "https://example.com/question10.jpg"
      },
      {
        "id": "q11",
        "type": "single_choice",
        "question": "「食堂」の意味は？",
        "options": [
          "Restaurant",
          "Kitchen",
          "Office",
          "Bathroom"
        ],
        "answer": "Restaurant",
        "image": "https://example.com/question11.jpg"
      },
      {
        "id": "q12",
        "type": "single_choice",
        "question": "「月」のせつめいは？",
        "options": [
          "Sun",
          "Moon",
          "Star",
          "Sky"
        ],
        "answer": "Moon",
        "image": "https://example.com/question12.jpg"
      },
      {
        "id": "q13",
        "type": "single_choice",
        "question": "「よる」の意味は？",
        "options": [
          "Morning",
          "Evening",
          "Afternoon",
          "Night"
        ],
        "answer": "Night",
        "image": "https://example.com/question13.jpg"
      },
      {
        "id": "q14",
        "type": "multiple_choice",
        "question": "「かんたん」の意味は？",
        "options": [
          "Easy",
          "Complicated",
          "Simple",
          "Difficult"
        ],
        "answer": ["Easy", "Simple"],
        "image": "https://example.com/question14.jpg"
      },
      {
        "id": "q15",
        "type": "single_choice",
        "question": "「みどり」の意味は？",
        "options": [
          "Blue",
          "Green",
          "Red",
          "Yellow"
        ],
        "answer": "Green",
        "image": "https://example.com/question15.jpg"
      },
      {
        "id": "q16",
        "type": "single_choice",
        "question": "「電車」の意味は？",
        "options": [
          "Car",
          "Bus",
          "Train",
          "Bike"
        ],
        "answer": "Train",
        "image": "https://example.com/question16.jpg"
      },
      {
        "id": "q17",
        "type": "single_choice",
        "question": "「食べる」の意味は？",
        "options": [
          "To drink",
          "To eat",
          "To cook",
          "To serve"
        ],
        "answer": "To eat",
        "image": "https://example.com/question17.jpg"
      },
      {
        "id": "q18",
        "type": "multiple_choice",
        "question": "「どれ」の意味は？",
        "options": [
          "Which",
          "What",
          "Who",
          "Where"
        ],
        "answer": ["Which", "What"],
        "image": "https://example.com/question18.jpg"
      },
      {
        "id": "q19",
        "type": "single_choice",
        "question": "「さけ」の意味は？",
        "options": [
          "Fish",
          "Wine",
          "Rice",
          "Water"
        ],
        "answer": "Wine",
        "image": "https://example.com/question19.jpg"
      },
      {
        "id": "q20",
        "type": "single_choice",
        "question": "「きょう」の意味は？",
        "options": [
          "Today",
          "Tomorrow",
          "Yesterday",
          "The day before yesterday"
        ],
        "answer": "Today",
        "image": "https://example.com/question20.jpg"
      }
    ]
    
  }
}

const Tests = () => {
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
  const [isStart, setIsStart] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

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

  const handleEndTest = () => {
    toast.success("Test finished!");
    setIsEnd(true);
    setIsStart(false);
  }

  const handleStartTest = () => {
    setIsStart(true);
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
    <div className="">
      
      {
        loading ? (<Loading />) :(
          isEnd ? <TestResult/> :
        <>
          {
            isStart ? <DoTest test = {testSet.test1} isStart={isStart}/> : <TestOverview test = {testSet.test1}/> 
          }
          {
            isStart ? 
            <div className="flex justify-center mt-10">
              <button
                onClick={handleEndTest}
                className="px-8 mb-5 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600"
                >
                提出する
              </button>
            </div>
            : 
            <div className="flex justify-center mt-10">
              <button
                onClick={handleStartTest}
                className="px-8 mb-5 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600"
                >
                始める
              </button>
            </div>
          }
          
        </>
        )
        
      }
    </div>
  
   
  )}



export default Tests;
{/* <TestOverview test = {test1}/> */}