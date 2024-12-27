import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddDocuments = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "PPT",
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleCancel = () => {
    navigate(-1); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("資料が追加されました！");

  };

  return (
    <div className="mb-10 p-6 max-w-3xl mx-auto bg-white rounded"
        style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)" }}>
      <h1 className="text-2xl font-bold mb-6">資料追加</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            資料名
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            説明
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="5"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


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
            <option value="PPT">PPT</option>
            <option value="PDF">PDF</option>
            <option value="Video">ビデオ</option>
          </select>
        </div>


        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
            ファイルをアップロード
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            required
            className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
          />
        </div>


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

export default AddDocuments;
