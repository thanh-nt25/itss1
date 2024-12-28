import React, { useState, useEffect } from "react";
import "./courses.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import { useSearch } from "@/context/SearchContext";

const Courses = () => {
  const { searchTerm } = useSearch();
  const { courses } = CourseData();
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 10; // Set to 10 cards per page

  // Cập nhật filteredCourses dựa trên searchTerm, category, và level
  useEffect(() => {
    const normalizedSearchTerm = searchTerm ? searchTerm.toLowerCase() : "";

    const filtered = courses.filter((course) => {
      const matchesSearch = course?.title?.toLowerCase().includes(normalizedSearchTerm);
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(course.category);
      const matchesLevel =
        selectedLevels.length === 0 || selectedLevels.includes(course.level);

      return matchesSearch && matchesCategory && matchesLevel;
    });

    setFilteredCourses(filtered);
  }, [searchTerm, selectedCategories, selectedLevels, courses]);

  // Xử lý thay đổi checkbox của category
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((category) => category !== value)
    );
  };

  // Xử lý thay đổi checkbox của level
  const handleLevelChange = (e) => {
    const { value, checked } = e.target;
    setSelectedLevels((prev) =>
      checked ? [...prev, value] : prev.filter((level) => level !== value)
    );
  };

  // Pagination Logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  return (
    <div className="courses">
      <div className="courses-layout">
        {/* Filter Section */}
        <div className="filter-container">
          <h3>カテゴリー</h3>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                value="報告"
                onChange={handleCategoryChange}
              />
              報告
            </label>
            <label>
              <input
                type="checkbox"
                value="連絡"
                onChange={handleCategoryChange}
              />
              連絡
            </label>
            <label>
              <input
                type="checkbox"
                value="相談"
                onChange={handleCategoryChange}
              />
              相談
            </label>
            <label>
              <input
                type="checkbox"
                value="日本文化"
                onChange={handleCategoryChange}
              />
              日本文化
            </label>
          </div>

          <h3 className="mt-3">レベル</h3>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                value="初級"
                onChange={handleLevelChange}
              />
              初級
            </label>
            <label>
              <input
                type="checkbox"
                value="中級"
                onChange={handleLevelChange}
              />
              中級
            </label>
            <label>
              <input
                type="checkbox"
                value="上級"
                onChange={handleLevelChange}
              />
              上級
            </label>
          </div>
        </div>

        {/* Course List Section */}
        <div className="course-container">
          {currentCourses && currentCourses.length > 0 ? (
            currentCourses.map((course) => <CourseCard key={course._id} course={course} />)
          ) : (
            <p>No Courses Yet!</p>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          前へ
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={index + 1 === currentPage ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          次
        </button>
      </div>
    </div>
  );
};

export default Courses;
