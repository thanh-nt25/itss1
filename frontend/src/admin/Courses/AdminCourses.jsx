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

  // Mock data for courses (this would normally come from an API)
  const courses = [
    { id: 1, name: "React for Beginners", level: "Beginner", participants: 120, status: "Active", category: "Web Development" },
    { id: 2, name: "Advanced JavaScript", level: "Advanced", participants: 85, status: "Inactive", category: "Programming" },
    { id: 3, name: "Python Fundamentals", level: "Beginner", participants: 200, status: "Active", category: "Data Science" },
    { id: 4, name: "Full Stack Development", level: "Intermediate", participants: 150, status: "Inactive", category: "Web Development" },
    { id: 5, name: "Machine Learning 101", level: "Advanced", participants: 180, status: "Active", category: "Data Science" },
    { id: 6, name: "UI/UX Design Basics", level: "Beginner", participants: 100, status: "Active", category: "Design" },
    // Add more mock courses as needed
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

        {/* Right side: Search and Filter */}
        <div className="filter-right">
          {/* <FaFilter className="text-gray-700 text-2xl cursor-pointer hover:text-blue-500" /> */}
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
            
            {/* <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" /> */}
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
              <option>メール</option>
              <option>名前</option>
              <option>年齢</option>
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
                {course.status === "Active" ? "Active" : "Inactive"}
              </td>
              <td>{course.category}</td>
              <td className="actions">
                <button className="edit"　onClick={hanleViewCourse}>View</button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteCourse(course.id)}
                >
                  Delete
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
