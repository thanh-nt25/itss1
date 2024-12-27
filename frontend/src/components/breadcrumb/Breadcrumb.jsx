import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();

  // Tách các phần tử từ URL
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Mapping từ URL path sang tên hiển thị
  const routeMap = {
    admin: "ホーム", // Thay thế "admin" bằng "ホーム"
    course: "コース管理",
    users: "ユーザー",
    dashboard: "ダッシュボード",
    "course-details": "コース名",
    "add-exercises": "問題追加",
    "add-documents": "資料追加",
    "676cc96539a994da77bac09b": "コース名",
    "tests": "テスト名"
  };

  if (pathnames.length < 3) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 ml-2 mt-2">
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <React.Fragment key={to}>
            {index > 0 && <span className="text-gray-400">/</span>}
            {isLast ? (
              <span>{routeMap[value] || decodeURIComponent(value)}</span>
            ) : (
              <Link to={to} className="text-blue-500 hover:underline">
                {routeMap[value] || decodeURIComponent(value)}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
