import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "./home.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";

// Slider settings
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const Home = () => {
  const navigate = useNavigate();
  const { courses } = CourseData();
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

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

  return (
    <div className="bg-gray-100 py-16 text-center">
  <div className="home">
    {/* Slider Section */}
    <Slider {...sliderSettings}>
      <div className="slide-item flex justify-center items-center h-96 bg-gray-200">
        <div className="slide-content bg-white bg-opacity-80 rounded-lg shadow-lg p-8 max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">日本語と文化の総合コース</h2>
          <p className="text-base text-gray-600 mb-4 leading-relaxed">
            このコースでは、言語と文化の両面から日本を深く理解することができます。日本語の基礎から応用までを学びながら、
            実際の会話に役立つ表現や文法、そして日本の独特な文化を理解することができます。
          </p>
          <p className="text-base text-gray-600 mb-6 leading-relaxed">
            日本語と文化を学ぶことで、あなたの人生に新しい視点と機会をもたらすことができるでしょう。さあ、一緒に日本語と日本文化の魅力を発見し、学んでみましょう！
          </p>
          <button
            onClick={() => navigate('/courses')}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            詳細はこちら
          </button>
        </div>
      </div>

      {/* Slide 2 */}
      <div className="slide-item flex justify-center items-center h-96 bg-gray-200">
        <div className="slide-content bg-white bg-opacity-80 rounded-lg shadow-lg p-8 max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">日本の伝統と文化を学ぼう</h2>
          <p className="text-base text-gray-600 mb-4 leading-relaxed">
            日本は豊かな歴史と文化を持つ国です。このコースでは、日本の伝統行事や祭り、食文化、
            さらに現代日本のポップカルチャーまで幅広く学びます。
          </p>
          <p className="text-base text-gray-600 mb-6 leading-relaxed">
            日本の文化に触れることで、あなたの視野が広がり、異なる文化を尊重することができるようになります。
          </p>
          <button
            onClick={() => navigate('/courses')}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            詳細はこちら
          </button>
        </div>
      </div>        

      {/* Slide 3 */}
      <div className="slide-item flex justify-center items-center h-96 bg-gray-200">
        <div className="slide-content bg-white bg-opacity-80 rounded-lg shadow-lg p-8 max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">日本語を使って世界と繋がる</h2>
          <p className="text-base text-gray-600 mb-4 leading-relaxed">
            日本語は世界中で広く学ばれている言語の一つです。このコースでは、日本語を使った実践的な会話やビジネス日本語、
            旅行日本語など、様々なシチュエーションで使える日本語を学びます。
          </p>
          <p className="text-base text-gray-600 mb-6 leading-relaxed">
            日本語を学び、あなたの未来を広げましょう！
          </p>
          <button
            onClick={() => navigate('/courses')}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            詳細はこちら
          </button>
        </div>
      </div>
    </Slider>
  </div>

  {/* Course Section */}
  <h2 className="text-left text-3xl font-semibold text-purple-700 mt-16 mb-8 pl-4">注目のコース</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4">
    {filteredCourses && filteredCourses.length > 0 ? (
      filteredCourses.map((course) => (
        <CourseCard
          key={course._id}
          course={course}
          className="bg-white shadow-lg rounded-lg p-4 text-center"
        />
      ))
    ) : (
      <p className="text-gray-500 col-span-full text-center">No Courses Yet!</p>
    )}
  </div>
</div>
  );
};

export default Home;
