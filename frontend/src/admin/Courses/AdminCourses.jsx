import React, { useState } from "react";
import Layout from "../Utils/Layout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./admincourses.css";
import { FaFilter, FaSearch } from "react-icons/fa";

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log("isMenuOpen", isMenuOpen);
  };

  const courses = [
    { id: 1, name: "簡単な日本語報告スキル", level: "初級", participants: 120, status: "アクティブ", category: "報告" },
    { id: 2, name: "簡単なベトナム語報告の基本", level: "上級", participants: 85, status: "インアクティブ", category: "連絡" },
    { id: 3, name: "仕事で使うベトナム語報告", level: "中級", participants: 200, status: "アクティブ", category: "日本文化" },
    { id: 4, name: "日越文化を比較する", level: "中級", participants: 150, status: "アクティブ", category: "相談" },
    { id: 5, name: "ベトナム文化の深淵を探る", level: "初級", participants: 180, status: "インアクティブ", category: "連絡" },
    { id: 6, name: "日越文化交流の歴史", level: "上級", participants: 100, status: "インアクティブ", category: "報告" },
  ];

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 5;

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Get current courses for the page
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Total pages calculation
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  // Handle delete course
  const handleDeleteCourse = (courseId) => {
    toast.error(`Course with ID: ${courseId} deleted!`);
    // Add deletion logic here (this is just a mock)
  };

  const hanleViewCourse = () => {
    navigate("/admin/course/course-details")
  }

  return (
    <div className="admin-courses">
      <h1 className="text-left">コース管理</h1>

      <div className="filter-section">
        <div className="filter-left">
          <p>表示</p>
          <select>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
          <p>件</p>
        </div>

        <div className="filter-right">
          <div className="flex w-[200px] max-w-sm">
            <div
              onClick={toggleMenu}
              className="p-2 bg-white-200 rounded-full hover:bg-gray-300 cursor-pointer flex items-center justify-center"
              role="button"
              tabIndex={0}
              aria-label="Filter"
            >
              <FaFilter className="text-gray-700 text-2xl" />
            </div>
            
            <input
              type="text"
              placeholder="コース名"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
        </div>
        {/* Menu Filter */}
      {isMenuOpen && (
        <div className="absolute top-60 right-14 w-60 bg-white shadow-lg rounded-lg p-4 border border-gray-300 z-50">
          <h3 className="text-lg font-bold mb-4">フィルター</h3>
          {/* Dòng 1 */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              カテゴリー
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>報告</option>
              <option>連絡</option>
              <option>相談</option>
              <option>日本文化</option>
            </select>
          </div>
          {/* Dòng 2 */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              レベル
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>初級</option>
              <option>中級</option>
              <option>上級</option>
            </select>
          </div>
          {/* Dòng 3 */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              フィルタース
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>アクティブ</option>
              <option>インアクティブ</option>
              <option>オンライン</option>
              <option>オフライン</option>
            </select>
          </div>
          {/* Nút áp dụng */}
          <button onClick={toggleMenu} className="w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600">
            フィルターを適用
          </button>
        </div>
      )}

        <button className="add-user-btn ml-2" onClick={() => alert("Add user clicked!")}>+ 新規追</button>
      </div>



      {/* Course Table */}
      <table className="course-table">
        <thead>
          <tr>
            <th>コース名</th>
            <th>レベル</th>
            <th>学習者数</th>
            <th>ステータス</th>
            <th>カテゴリー</th>
            <th>アクション</th>
          </tr>
        </thead>
        <tbody>
          {currentCourses.map((course) => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>{course.level}</td>
              <td>{course.participants}</td>
              <td className={`status ${course.status}`}>
                {course.status === "アクティブ" ? "アクティブ" : "インアクティブ"}
              </td>
              <td>{course.category}</td>
              <td className="actions">
                <button className="edit"　onClick={hanleViewCourse}>表示</button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteCourse(course.id)}
                >
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          前へ
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              className={currentPage === page ? "active" : ""}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          )
        )}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          次
        </button>
      </div>
    </div>
  );
};

export default AdminCourses;
