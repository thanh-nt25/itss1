import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddExercises = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    questionName: "",
    type: "テスト",
    content: "",
    answer: "",
    score: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    navigate(-1); // Quay lại trang trước đó
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("質問が追加されました！");
    // Xử lý logic gửi dữ liệu ở đây
  };

  return (
    <div className="p-6 mb-10 max-w-3xl mx-auto bg-white rounded"
    style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)" }}>
      {/* Tiêu đề */}
      <h1 className="text-2xl font-bold mb-6">問題追加</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tên câu hỏi */}
        <div>
          <label htmlFor="questionName" className="block text-sm font-medium text-gray-700 mb-1">
            問題名
          </label>
          <input
            type="text"
            id="questionName"
            name="questionName"
            value={formData.questionName}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Loại */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            タイプ
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="テスト">テスト</option>
            <option value="シナリオ">シナリオ</option>
          </select>
        </div>

        {/* Nội dung */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            内容
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows="5"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Trả lời */}
        <div>
          <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-1">
            答え
          </label>
          <input
            type="text"
            id="answer"
            name="answer"
            value={formData.answer}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Điểm */}
        <div>
          <label htmlFor="score" className="block text-sm font-medium text-gray-700 mb-1">
            点数
          </label>
          <input
            type="number"
            id="score"
            name="score"
            value={formData.score}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Nút hành động */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            追加
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExercises;
