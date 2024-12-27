import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Dotest = ({ test, isStarted }) => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(test.timeLimit || 0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);

  // Countdown Timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Calculate Progress
//   const answeredQuestions = Object.keys(answers).length;
  const totalQuestions = test.number_of_questions;
  

  const handleSaveAnswer = () => {
    const currentAnswer = answers[currentQuestion];
    if (currentAnswer) {
      console.log(`Answer saved for question ${currentQuestion}`);
    } else {
      console.log("Please provide an answer");
    }
  };

  const handleSubmitTest = () => {
    // console.log("Test submitted with answers", answers);
    // navigate("/test-result");
  };

  useEffect(() => {
    const totalAnswered = Object.keys(answers).length; // Đếm số câu hỏi đã trả lời
    setAnsweredQuestions(totalAnswered); // Cập nhật số câu hỏi đã trả lời
  }, [answers]);

  const progress = Math.round((answeredQuestions / totalQuestions) * 100);

  return (
    <div className="p-6 w-full mx-auto bg-gray-100 rounded-lg shadow-xl">
      {/* Timer */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-left text-3xl font-bold text-blue-800">{test.title}</h1>
        {test.timeLimit && (
          <div className="text-right text-xl font-semibold text-red-600">{formatTime(timeLeft)}</div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Question Selector */}
        <div className="w-1/4 bg-white p-4 rounded shadow mr-4">
          <h3 className="text-left text-lg font-semibold text-blue-700 mb-4">質問リスト</h3>
          {/* Progress Bar */}
          <div className="bg-gray-300 rounded-full h-4 relative">
            <div
                className="h-full bg-green-400 rounded-full"
                style={{ width: `${progress}%` }}
                // style={{ width: 100 }}
            ></div>
            <span className="absolute pl-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-gray-700">
                {progress}%
            </span>
            </div>
            <div className="mb-3 w-full bg-gray-300 rounded h-7">
              <div
                className="h-full bg-green-400 rounded"
                style={{ width: 50 }}
              ></div>
            </div>
          

          {/* Question Buttons */}
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: test.number_of_questions }, (_, index) => (
              <button
                key={index}
                className={`px-3 py-2 rounded text-sm font-semibold ${
                  answers[index] ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                } hover:bg-blue-300`}
                onClick={() => setCurrentQuestion(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            onClick={handleSubmitTest}
            className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            提出する
          </button>
        </div>

        {/* Current Question */}
        <div className="w-3/4 bg-white p-4 rounded shadow">
          <h3 className="text-left text-lg font-semibold text-blue-700 mb-4">
            Q{currentQuestion + 1}: {test.questions[currentQuestion].question}
          </h3>
          <div className="mb-4">
            {test.questions[currentQuestion].type === "fill_in_the_blank" && (
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="回答を入力してください"
                value={answers[currentQuestion] || ""}
                onChange={(e) =>
                  setAnswers({ ...answers, [currentQuestion]: e.target.value })
                }
              />
            )}

            {test.questions[currentQuestion].type === "single_choice" && (
              <div className="flex flex-col">
                {test.questions[currentQuestion].options.map((option, index) => (
                  <label key={index} className="flex items-center mb-2">
                    <input
                      type="radio"
                      name={`question-${currentQuestion}`}
                      value={option}
                      checked={answers[currentQuestion] === option}
                      onChange={() => setAnswers({ ...answers, [currentQuestion]: option })}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}

            {test.questions[currentQuestion].type === "multiple_choice" && (
              <div className="flex flex-col">
                {test.questions[currentQuestion].options.map((option, index) => (
                  <label key={index} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      name={`question-${currentQuestion}`}
                      value={option}
                      checked={answers[currentQuestion]?.includes(option) || false}
                      onChange={(e) => {
                        const value = e.target.value;
                        const currentAnswers = answers[currentQuestion] || [];
                        if (currentAnswers.includes(value)) {
                          setAnswers({
                            ...answers,
                            [currentQuestion]: currentAnswers.filter((ans) => ans !== value),
                          });
                        } else {
                          setAnswers({
                            ...answers,
                            [currentQuestion]: [...currentAnswers, value],
                          });
                        }
                      }}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
          </div>
          
          <button
            onClick={handleSaveAnswer}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            回答を保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dotest;
