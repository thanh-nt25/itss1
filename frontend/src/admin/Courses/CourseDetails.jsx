import React, { useState } from "react";
import { Switch } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faCheck, faLock } from "@fortawesome/free-solid-svg-icons";
import {Button} from "@mui/material";
import { faFileAlt, faVideo, faEye } from "@fortawesome/free-solid-svg-icons";
import { FaBook, FaPlus, FaRegListAlt, FaEye  } from "react-icons/fa";


const AdminCoursesDetails = () => {
  const navigate = useNavigate();
  const [courseName, setCourseName] = useState("日本語1");
  const [category, setCategory] = useState("ビジネス");
  const [content, setContent] = useState("ビジネス日本語マスターコースでは、実際の職場で必要となる日本語スキルを総合的に学ぶことができます。このコースでは、メールや電話でのやり取り、敬語や丁寧語の使い方、会議やプレゼンテーションでの表現力を重点的に強化します。また、日本のビジネスマナーや文化についても学び、異文化の中での円滑なコミュニケーションができるようサポートします。初心者から中級者まで幅広いレベルに対応しており、学習者が自信を持って日本語を活用できるようになることを目指しています。");
  const [level, setLevel] = useState("初級");
  const [status, setStatus] = useState(true);
  const [activeTab, setActiveTab] = useState("資料"); // "資料" hoặc "練習"
  const [isActive, setIsActive] = useState(false);
  const [openChapters, setOpenChapters] = useState({}); // Track opened/closed chapters

  const toggleChapter = (chapterId) => {
    console.log(chapterId);
    
    setOpenChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

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
    },
  ];
  
  const [questions, setQuestions] = useState([
    "練習問題 1",
    "練習問題 2",
    "練習問題 3",
    "練習問題 4",
  ]);

  const handleAddQuestion = () => {
    navigate("/admin/course/course-details/add-exercises")
  };

  const handleAddDocuments = () => {
    navigate("/admin/course/course-details/add-documents")
  }
  
  const handleToggle = (event) => {
    setIsActive(event.target.checked);
  };

  const handleSave = () => {
    console.log("Saving course details...", { courseName, category, content, level, status });
    toast.success("Saved course");
    navigate("/admin/course");
  };

  const handleCancel = () => {
    console.log("Cancel editing...");
    toast.error("Cancelled");
    navigate("/admin/course");
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-left text-2xl font-bold mb-6">コース管理</h1>

      {/* 1. Course Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">コース名</label>
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          placeholder={"コース名"}
          className="w-[800px] mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-between">
        {/* 2. Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">カテゴリー</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-[200px] mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ビジネス">ビジネス</option>
            <option value="テクノロジー">テクノロジー</option>
            <option value="ライフスタイル">ライフスタイル</option>
          </select>
        </div>

        {/* 4. Level */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">レベル</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-[100px] mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="初級">初級</option>
            <option value="中級">中級</option>
            <option value="上級">上級</option>
          </select>
        </div>

      </div>

      <div className="flex justify-between p-0 m-0">
        {/* 3. Content */}
        <div className="p-0 m-0">
          <label className="block text-sm font-medium text-gray-700">コース内容</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="6"
            className="w-[700px] mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* 5. Status */}
        <div className="pb-20 m-0 flex items-center">
          <label className="block text-sm font-medium text-gray-700 mr-4">ステータス</label>
          <Switch
              checked={isActive}
              onChange={handleToggle}
              color="primary" // Tùy chỉnh màu sắc
            />
            
        </div>
      </div>

      {/* 6. Tabs */}
      <div className="mb-6">
        <div className="flex border-b">
          <button
            className={`px-4 py-2 focus:outline-none ${activeTab === "資料" ? "border-b-2 border-blue-500" : "text-gray-500"}`}
            onClick={() => setActiveTab("資料")}
          >
            資料
          </button>
          <button
            className={`px-4 py-2 focus:outline-none ${activeTab === "練習" ? "border-b-2 border-blue-500" : "text-gray-500"}`}
            onClick={() => setActiveTab("練習")}
          >
            練習
          </button>
        </div>
        {/* {activeTab === "資料" && (
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">セクション</h3>
            <p>ここに資料のセクションが表示されます。</p>
          </div>
        )} */}
        {activeTab === "資料" && (
                <div className="mt-4">
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
                              <h2 className="font-bold">セクション:</h2>
                              <p> {chapter?.description}</p>
                            </div>

                            {/* Danh sách bài học */}
                            <div className="flex">
                              <Link
                                // to={`/lectures/${course._id}`}
                                className="m-2 w-full bg-gray-200 text-black rounded hover:bg-gray-300 flex items-center justify-between gap-2 py-2 p-2"
                              > 
                              <div>
                                <FontAwesomeIcon icon={faFileAlt} className="text-gray-600 text-2xl" />
                                <span className="ml-4 text-left">理論やスライドで学習をサポートします</span>
                              </div>
                                <FontAwesomeIcon icon={faEye} className="text-green-500 text-[20px]" />
                              </Link>
                            </div>
                            <div className="flex">
                              <Link
                                // to={`/lectures/${course._id}`}
                                className="m-2 w-full bg-gray-200 text-black rounded hover:bg-gray-300 flex items-center justify-between gap-2 py-2 p-2"
                              > 
                              <div>

                                <FontAwesomeIcon icon={faVideo} className="text-gray-600 text-2xl" />
                                <span className="ml-1 text-left">実例を通じて直感的に学べます</span>
                              </div>
                                <FontAwesomeIcon icon={faEye} className="text-green-500 text-[20px]" />
                              </Link>
                            </div>
                            {/* het bai hoc */}
                            <div className="flex space-x-4 ml-8 mt-4">
                                {/* Nút 1: コンテンツ追加 */}
                                <button className="flex items-center px-4 py-2 bg-gray-200 border border-gray-300 rounded shadow hover:bg-gray-300">
                                  <FaBook className="mr-2 text-gray-600" />
                                  <span>コンテンツ追加</span>
                                </button>

                                {/* Nút 2: テスト追加 */}
                                <button className="flex items-center px-4 py-2 bg-gray-200 border border-gray-300 rounded shadow hover:bg-gray-300">
                                  <FaRegListAlt  className="mr-2 text-gray-600" />
                                  <span>テスト追加</span>
                                </button>
                            </div>

                          </div>
                        ) : 
                        openChapters[chapter.id] && (
                          <div className="mt-2 pl-4">
                            {/* Mô tả chương */}
                            <div className="mb-4 text-gray-700 font-medium">
                              <h2 className="font-bold">セクション:</h2>
                              <p> {chapter?.description}</p>
                            </div>

                            {/* Danh sách bài học */}
                            <div className="flex">
                              <Link
                                // to={`/lectures/${course._id}`}
                                className="m-2 w-full bg-gray-200 text-black rounded hover:bg-gray-300 flex items-center justify-between gap-2 py-2 p-2"
                              > 
                              <div>
                                <FontAwesomeIcon icon={faFileAlt} className="text-gray-600 text-2xl" />
                                <span className="ml-4 text-left">理論やスライドで学習をサポートします</span>
                              </div>
                                <FontAwesomeIcon icon={faEye} className="text-green-500 text-[20px]" />
                              </Link>
                            </div>
                            <div className="flex">
                              <Link
                                // to={`/lectures/${course._id}`}
                                className="m-2 w-full bg-gray-200 text-black rounded hover:bg-gray-300 flex items-center justify-between gap-2 py-2 p-2"
                              > 
                              <div>

                                <FontAwesomeIcon icon={faVideo} className="text-gray-600 text-2xl" />
                                <span className="ml-1 text-left">実例を通じて直感的に学べます</span>
                              </div>
                                <FontAwesomeIcon icon={faEye} className="text-green-500 text-[20px]" />
                              </Link>
                            </div>
                            {/* het bai hoc */}
                            <div className="flex space-x-4 ml-8 mt-4">
                                {/* Nút 1: コンテンツ追加 */}
                                <button className="flex items-center px-4 py-2 bg-gray-200 border border-gray-300 rounded shadow hover:bg-gray-300">
                                  <FaBook className="mr-2 text-gray-600" />
                                  <span>コンテンツ追加</span>
                                </button>

                                {/* Nút 2: テスト追加 */}
                                <button className="flex items-center px-4 py-2 bg-gray-200 border border-gray-300 rounded shadow hover:bg-gray-300">
                                  <FaRegListAlt  className="mr-2 text-gray-600" />
                                  <span>テスト追加</span>
                                </button>
                            </div>
                            

                          </div>
                        )
                      }   
                    </div>
                  ))}
                  <button
                      onClick={handleAddDocuments}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-200 border border-gray-300 rounded-lg shadow hover:bg-gray-300"
                    >
                      <div className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-full">
                        <FaPlus className="text-gray-600" />
                      </div>

                      <span className="text-gray-600">追加</span>
                    </button>
                </div>
              )}



        {

            activeTab === "練習" && (
              <div className="mt-4">
                {/* Title */}
                <h3 className="text-lg font-bold mb-4">練習内容</h3>

                {/* Questions List */}
                <div className="space-y-2">
                  {questions.map((question, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border border-gray-300 rounded-lg px-4 py-2 bg-gray-100"
                    >
                      {/* 6.2.a: Câu hỏi ôn tập */}
                      <span>{question}</span>

                      {/* 6.2.b: Biểu tượng con mắt */}
                      <FontAwesomeIcon icon={faEye} className="text-green-500 text-[20px]" />
                    </div>
                  ))}
                </div>

                {/*  them bai tap */}
                <div className="mt-4">
                  <button
                    onClick={handleAddQuestion}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-200 border border-gray-300 rounded-lg shadow hover:bg-gray-300"
                  >
                    <div className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-full">
                      <FaPlus className="text-gray-600" />
                    </div>
                    <span>追加</span>
                  </button>
                </div>
              </div>
            )
          }
      </div>

      {/* Buttons*/}
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleCancel}
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-gray-400"
        >
          キャンセル
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          保存
        </button>
      </div>
    </div>
  );
};

export default AdminCoursesDetails;
