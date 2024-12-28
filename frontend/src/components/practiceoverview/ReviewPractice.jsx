import React from "react";
// import { jsPDF } from "jspdf";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ReviewPractice = ({ practice }) => {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);

  const handleDownloadAnswers = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`テスト名: ${practice.title}`, 10, 10);

    practice.questions.forEach((question, index) => {
      doc.setFontSize(12);
      doc.text(`Q${index + 1}: ${question.question}`, 10, 20 + index * 30);
      doc.text(`答え: ${question.answer}`, 10, 30 + index * 30);
      doc.text(`説明: ${question.explanation || "N/A"}`, 10, 40 + index * 30);
    });

    doc.save("test_review.pdf");
  };

  return (
    <div className="p-6 w-full mx-auto bg-gray-100 rounded-lg shadow-xl">
      {/* Title and Timer */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-left text-3xl font-bold text-blue-800">{practice.title}</h1>
        <div className="text-right text-xl font-semibold text-red-600">
          00:00:00
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Question Selector */}
        <div className="w-1/4 bg-white p-4 rounded shadow mr-4">
          <h3 className="text-left text-lg font-semibold text-blue-700 mb-4">質問リスト</h3>
          <div className="grid grid-cols-5 gap-2">
            {practice.questions.map((_, index) => (
              <button
                key={index}
                className={`px-3 py-2 rounded text-sm font-semibold ${
                  index === currentQuestion
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                } hover:bg-blue-300`}
                onClick={() => setCurrentQuestion(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Current Question Review */}
        <div className="w-3/4 bg-white p-4 rounded shadow">
          <h3 className="text-left text-lg font-semibold text-blue-700 mb-4">
            Q{currentQuestion + 1}: {practice.questions[currentQuestion].question}
          </h3>
          <div className="mb-4">
            <p className="text-gray-800 mb-2">
              <span className="font-bold">答え:</span> {practice.questions[currentQuestion].answer}
            </p>
            <p className={`mb-4 font-bold ${practice.questions[currentQuestion].isCorrect ? "text-green-600" : "text-red-600"}`}>
              {practice.questions[currentQuestion].isCorrect ? "正しい" : "間違い"}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">説明:</span> {practice.questions[currentQuestion].explanation || "説明がありません。"}
            </p>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={handleDownloadAnswers}
          className="px-8 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600"
        >
          回答をダウンロード
        </button>
      </div>
    </div>
  );
};

export default ReviewPractice;
