import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const PracticeOverview = ({ practice }) => {
    console.log("practice overview:", practice);
    
  const navigate = useNavigate();

  return (
    <div className="p-6 w-full mx-auto bg-gray-100 rounded-lg shadow-xl">
        {/* Back Button */}
        <button
            onClick={() => navigate(-1)}
            className="bg-blue-200 text-blue-600 p-2 rounded hover:bg-blue-300 text-left pl-4 mb-4 flex items-center"
            style={{ clipPath: "polygon(10% 0%, 100% 0%, 100% 100%, 10% 100%, 0% 50%)" }}
        >
            コースに戻る
        </button>

        {/* Title and Navigation */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 ">
        <div className="flex flex-col justify-between h-[130px]">
            {/* Title */}
            <h1 className="text-left text-3xl font-bold text-blue-800">{practice.title}</h1>

            {/* Navigation Buttons */}
            <div className="flex justify-end mt-auto">
                <button className="flex w-[120px] mr-4 items-center bg-blue-200 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-300">
                <FaArrowLeft className="mr-2" /> 前
                </button>
                <button className="justify-end flex w-[120px] items-center bg-blue-200 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-300">
                次 <FaArrowRight className="ml-2" />
                </button>
            </div>
        </div>
        </div>

        {/* Content Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start">
            {/* Left Section */}
            <div className="w-2/3 pr-4">
                <h3 className="text-left text-xl font-semibold text-blue-700 mb-4">シナリオ説明:</h3>
                <p className="text-left text-gray-800 leading-relaxed mb-6">{practice.description}</p>
                <div className="bg-blue-50 p-4 rounded-lg shadow">
                <h4 className="text-left text-lg font-semibold text-blue-700 mb-2">シナリオ詳細:</h4>
                <ul className="list-disc list-inside text-left text-gray-700">
                    <li>
                    <span className="font-bold">質問数:</span> {practice.number_of_questions} 問
                    </li>
                    <li>
                        <span className="font-bold">回答形式:</span> 
                        <span className="font-bold text-red-500"> エッセイの質問、ビデオ</span>
                    </li>
                    <li>
                    <span className="font-bold">時間:</span> 30 分
                    </li>
                </ul>
                </div>
            </div>

            {/* Right Section */}
            <div className="w-1/4">
                <img
                src={practice.practiceImage}
                alt={practice.title}
                className="w-full h-auto rounded-lg shadow-md"
                />
            </div>
            </div>
        </div>

        {/* Start Button */}
        
        </div>
  );
};

export default PracticeOverview;

// Sử dụng component này với data test1 như sau:
// <TestOverview test={test1} />
