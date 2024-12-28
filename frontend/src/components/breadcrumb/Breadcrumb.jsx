import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { sample_course_id } from "@/main"
import axiosInstance from "@/api/axiosInstance";

const Breadcrumb = () => {
  console.log("sample_course_id", sample_course_id);
  
  const location = useLocation();
  const [courseName, setCourseName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const pathnames = location.pathname.split("/").filter((x) => x);

  const courseId = pathnames.find((segment, index) => pathnames[index - 1] === "course");
  
  const routeMap = {
    admin: "ホーム", 
    course: "コース管理",
    users: "ユーザー",
    dashboard: "ダッシュボード",
    "course-details": "コース名",
    "add-exercises": "問題追加",
    "add-documents": "資料追加",
    "tests": "テスト名",
    "tested": "テスト名",
    "practices":"シナリオ練習",
    "practiced":"シナリオ練習",
  };

  if (pathnames.length < 3) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 ml-2 mt-2">
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        const displayValue =
          value === courseId
            ? "コース名"
            : routeMap[value] || decodeURIComponent(value);

        return (
          <React.Fragment key={to}>
            {index > 0 && <span className="text-gray-400">/</span>}
            {isLast ? (
              <span>{displayValue}</span>
            ) : (
              <Link to={to} className="text-blue-500 hover:underline">
                {displayValue}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
