import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Tabs = ({ isAuth, role }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = role === "admin";
  const firstTabPath = isAdmin ? "/admin/dashboard" : "/";
  const secondTabPath = isAdmin ? "/admin/course" : "/courses";
  const thirdTabPath = isAdmin ? "/admin/users" : null; // Tab thứ ba chỉ dành cho admin
  const firstTabLabel = isAdmin ? "ダッシュボード" : "ホーム";
  const secondTabLabel = isAdmin ? "コース" : "コース";
  const thirdTabLabel = isAdmin ? "ユーザー" : null;

  // Trạng thái để kiểm soát điều hướng mặc định
  const [hasNavigated, setHasNavigated] = useState(false);

  // Reset trạng thái khi đăng nhập lại hoặc role thay đổi
  useEffect(() => {
    setHasNavigated(false);
  }, [isAuth, role]);

  // Điều hướng mặc định khi component được mount lần đầu
  useEffect(() => {
    if (
      isAuth &&
      !hasNavigated &&
      ![firstTabPath, secondTabPath, thirdTabPath].includes(location.pathname)
    ) {
      navigate(firstTabPath);
      setHasNavigated(true); // Đánh dấu đã điều hướng
    }
  }, [isAuth, hasNavigated, firstTabPath, secondTabPath, thirdTabPath, location.pathname, navigate]);

  return (
    <>
      {isAuth && (
        <div className="flex border-b">
          {/* Tab 1: ダッシュボード */}
          <button
            onClick={() => navigate(firstTabPath)}
            className={`px-4 py-2 text-sm ${
              location.pathname === firstTabPath
                ? "text-white bg-blue-500"
                : "text-blue-500 bg-white hover:bg-blue-100"
            }`}
          >
            {firstTabLabel}
          </button>
          {/* Tab 2: コース */}
          <button
            onClick={() => navigate(secondTabPath)}
            className={`px-4 py-2 text-sm ${
              location.pathname === secondTabPath
                ? "text-white bg-blue-500"
                : "text-blue-500 bg-white hover:bg-blue-100"
            }`}
          >
            {secondTabLabel}
          </button>
          {/* Tab 3: ユーザー (chỉ dành cho admin) */}
          {isAdmin && thirdTabPath && (
            <button
              onClick={() => navigate(thirdTabPath)}
              className={`px-4 py-2 text-sm ${
                location.pathname === thirdTabPath
                  ? "text-white bg-blue-500"
                  : "text-blue-500 bg-white hover:bg-blue-100"
              }`}
            >
              {thirdTabLabel}
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Tabs;
