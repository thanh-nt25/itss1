import React, { useState } from "react";
import "./header.css";
import { Link, useNavigate, useLocation  } from "react-router-dom";
import { FaBell, FaChevronDown } from "react-icons/fa"; 
import toast from "react-hot-toast"
import { useSearch } from "@/context/SearchContext";

const Header = ({ isAuth, user, handleLogout }) => {
  const { searchTerm, setSearchTerm } = useSearch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    console.log("Search term in header:", searchTerm);

    if (location.pathname !== "/courses") {
      toast.error("コースページで検索してください");
      navigate("/courses");
    } 

  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header>
      
      
      {
        user?.role === "user" || !isAuth ?
        <Link to="/" className="logo">
          HouRenShuu
        </Link>
        :
        <Link to="/admin/dashboard" className="logo">
          HouRenShuu
        </Link>
      }
      

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="コースを検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(); 
            }
          }}
        />
        <button onClick={handleSearch}>検索</button>
      </div>

      {/* Navigation Links */}
      <div className="link">
        {/* <Link to={"/courses"}>コース</Link> */}
        
        {isAuth ? (
          <div className="relative">
            {/* Tên người dùng (Dropdown Trigger) */}
            <div className="flex items-center gap-4">

              <FaBell className="text-[30px] text-gray-600 cursor-pointer hover:text-blue-500" />
              <img
                src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                alt="Avatar"
                className="w-16 h-16 rounded-full"
              />
              <button
                className="user-button"
                onClick={toggleDropdown}
              >
                {user?.name || "ユーザー"}
              </button>
              <FaChevronDown
                className="text-gray-500 hover:text-blue-500"
                onClick={toggleDropdown}
              />
            </div>

            {isDropdownOpen && (
              <div className="dropdown-menu">

                <Link to="/account" className="dropdown-item w-full flex items-center justify-center" onClick={toggleDropdown}>
                  アカウント
                </Link>
                <button
                  className="dropdown-item w-full"
                  onClick={() => {
                    toggleDropdown();
                    handleLogout(); // Gọi hàm đăng xuất
                    navigate("/login");
                  }}
                >
                  ログアウト
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to={"/login"}>ログイン</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
