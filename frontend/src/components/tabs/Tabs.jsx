import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Tabs = ({ isAuth, role }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = role === "admin";
  const firstTabPath = isAdmin ? "/admin/dashboard" : "/";
  const secondTabPath = isAdmin ? "/admin/course" : "/courses";
  const thirdTabPath = isAdmin ? "/admin/users" : null;
  const firstTabLabel = isAdmin ? "ダッシュボード" : "ホーム";
  const secondTabLabel = isAdmin ? "コース" : "コース";
  const thirdTabLabel = isAdmin ? "ユーザー" : null;

  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    setHasNavigated(false);
  }, [isAuth, role]);

  useEffect(() => {
    if (
      isAuth &&
      !hasNavigated &&
      ![firstTabPath, secondTabPath, thirdTabPath].includes(location.pathname)
    ) {
      navigate(firstTabPath);
      setHasNavigated(true); 
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
          {/* Tab 3: ユーザー (admin) */}
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
