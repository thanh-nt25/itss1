import React, { useState, useEffect } from "react";
import "./courses.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";

const Courses = () => {
  const { courses } = CourseData();
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 10; // Set to 10 cards per page

  useEffect(() => {
    setFilteredCourses(courses || []);
  }, [courses]);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedCategories((prev) => [...prev, value]);
    } else {
      setSelectedCategories((prev) => prev.filter((category) => category !== value));
    }
  };

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredCourses(courses); 
    } else {
      setFilteredCourses(
        courses.filter((course) => selectedCategories.includes(course.category))
      );
    }
  }, [selectedCategories, courses]);

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
                value="Japanese"
                onChange={handleCategoryChange}
              />
              日本語
            </label>
            <label>
              <input
                type="checkbox"
                value="Culture"
                onChange={handleCategoryChange}
              />
              文化
            </label>
            <label>
              <input
                type="checkbox"
                value="Vietnamese"
                onChange={handleCategoryChange}
              />
              ベトナム語
            </label>

            <h3>レベル</h3>
            <label>
              <input
                type="checkbox"
                value="N3"
                onChange={handleCategoryChange}
              />
              N3
            </label>
            <label>
              <input
                type="checkbox"
                value="N2"
                onChange={handleCategoryChange}
              />
              N2
            </label>
            <label>
              <input
                type="checkbox"
                value="N1"
                onChange={handleCategoryChange}
              />
              N1
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
