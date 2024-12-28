import React from "react";
import { useNavigate } from "react-router-dom";
import { sample_course_id } from "@/main"

const PracticeResult = ({ practiceName="シナリオ練習", score="0", totalQuestions="20", remainingTime="0" }) => {
  const navigate = useNavigate();

  return (
    <div className="p-6 mb-4 w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">結果</h1>

      <div className="bg-blue-50 p-4 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold text-blue-700 mb-2">
         練習: <span className="text-gray-800">{practiceName}</span>
        </h3>
        <p className="text-gray-800">
          正解:{" "}
          <span className="font-bold text-green-600">
            {score}/{totalQuestions} ({Math.round((score / totalQuestions) * 100)}%)
          </span>
        </p>
        <p className="text-gray-800">
          残り時間: <span className="font-bold text-red-600">{remainingTime}</span>
        </p>
      </div>

      <div className="flex justify-center">
        <button
        
        //   onClick={() => navigate(`/course/${sample_course_id}/`)}
          onClick={() => navigate(`/course/${sample_course_id}/practiced`)}
          className="px-6 py-3 border-2 border-blue-500 text-blue-500 text-lg font-semibold rounded-lg hover:bg-blue-500 hover:text-white"
        >
          回答を確認する
        </button>
      </div>
    </div>
  );
};

export default PracticeResult;
