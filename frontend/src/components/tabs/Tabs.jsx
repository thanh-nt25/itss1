import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Tabs = ({ isAuth, role }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = role === "admin";
  const firstTabPath = isAdmin ? "/admin/course" : "/";
  const secondTabPath = isAdmin ? "/admin/users" : "/courses";
  const firstTabLabel = isAdmin ? "コース" : "ホーム";
  const secondTabLabel = isAdmin ? "ユーザー" : "コース";

  return (
    <>
    {
        isAuth && <>
        <div className="flex border-b">
        {
            isAdmin &&
            <button
                onClick={() => navigate("/admin/dashboard")}
                className={`px-4 py-2 text-sm ${
                    location.pathname === "/admin/dashboard"
                    ? "text-white bg-blue-500"
                    : "text-blue-500 bg-white hover:bg-blue-100"
                }`}
                >
            ダッシュボード
        </button>
        }
        {/* Tab 1 */}
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
        {/* ダッシュボード */}
        {/* Tab 2 */}
        <button
            onClick={() => navigate(secondTabPath)}
            className={`px-4 py-2 text-sm  ${
            location.pathname === secondTabPath
                ? "text-white bg-blue-500"
                : "text-blue-500 bg-white hover:bg-blue-100"
            }`}
        >
            {secondTabLabel}
        </button>
    </div>
        </>
    }
    </>
    
  );
};

export default Tabs;
