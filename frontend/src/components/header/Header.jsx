import React, { useState } from "react";
import "./header.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBell, FaChevronDown } from "react-icons/fa"; 
import toast from "react-hot-toast"
import { useSearch } from "@/context/SearchContext";
import NotificationCard from "@/components/notificationcard/NotificationCard"

const Header = ({ isAuth, user, handleLogout }) => {
  const { searchTerm, setSearchTerm } = useSearch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log("bell open", isMenuOpen);
  };

  // Reset isMenuOpen when user role changes or logs out
  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [user]);

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
        {isAuth ? (
          <div className="relative">
            <div className="flex items-center gap-4">
              <NotificationCard isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} role={user?.role}/>

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

            {isDropdownOpen && 
            (
              <div className="dropdown-menu">
                <Link to="/account" className="dropdown-item w-full flex items-center justify-center" onClick={toggleDropdown}>
                  アカウント
                </Link>
                <button
                  className="text-left dropdown-item w-full"
                  onClick={async  () => {
                    toggleDropdown();
                    await  handleLogout();
                    // navigate("/login", { replace: true });
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
