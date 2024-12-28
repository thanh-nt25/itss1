import React, { useState } from "react";
import "./users.css";
import { FaFilter, FaSearch } from "react-icons/fa";

const AdminUsers = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    
    
    setIsMenuOpen(!isMenuOpen);
    console.log("isMenuOpen", isMenuOpen);
  };
  // Mock data for users (this would normally come from an API)
  const users = [
    { id: 1, avatar: "https://randomuser.me/api/portraits/men/1.jpg", name: "John Doe", email: "john@example.com", role: "Admin", status: "active" },
    { id: 2, avatar: "https://randomuser.me/api/portraits/women/2.jpg", name: "Jane Smith", email: "jane@example.com", role: "User", status: "inactive" },
    { id: 3, avatar: "https://randomuser.me/api/portraits/men/3.jpg", name: "Samuel Lee", email: "samuel@example.com", role: "User", status: "active" },
    { id: 4, avatar: "https://randomuser.me/api/portraits/women/4.jpg", name: "Anna Brown", email: "anna@example.com", role: "Admin", status: "inactive" },
    { id: 5, avatar: "https://randomuser.me/api/portraits/men/5.jpg", name: "Mike Johnson", email: "mike@example.com", role: "User", status: "active" },
    { id: 6, avatar: "https://randomuser.me/api/portraits/women/6.jpg", name: "Lily White", email: "lily@example.com", role: "User", status: "active" },
    // Add more mock users as needed
  ];

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Get current users for the page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Total pages calculation
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="admin-users">
      <h1 className="text-left">ユーザー管理</h1>

      <div className="filter-section">
        <div className="filter-left">
          <p>表示</p>
          <select>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
          <p>件</p>
        </div>

        {/* Right side: Search and Filter */}
        <div className="filter-right">
          {/* <FaFilter className="text-gray-700 text-2xl cursor-pointer hover:text-blue-500" /> */}
          <div className="flex w-[200px] max-w-sm">
            <div
              onClick={toggleMenu}
              className="p-2 bg-white-200 rounded-full hover:bg-gray-300 cursor-pointer flex items-center justify-center"
              role="button"
              tabIndex={0}
              aria-label="Filter"
            >
              <FaFilter className="text-gray-700 text-2xl" />
            </div>
            
            {/* <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" /> */}
            <input
              type="text"
              placeholder="ユーザー名"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
        </div>
        {/* Menu Filter */}
      {isMenuOpen && (
        <div className="absolute top-60 right-14 w-60 bg-white shadow-lg rounded-lg p-4 border border-gray-300 z-50">
          <h3 className="text-lg font-bold mb-4">フィルター</h3>
          {/* Dòng 1 */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              カテゴリー
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>メール</option>
              <option>名前</option>
              <option>年齢</option>
            </select>
          </div>
          {/* Dòng 2 */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              コラム2
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>メール</option>
              <option>名前</option>
              <option>年齢</option>
            </select>
          </div>
          {/* Dòng 3 */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              コラム3
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>メール</option>
              <option>名前</option>
              <option>年齢</option>
            </select>
          </div>
          {/* Nút áp dụng */}
          <button onClick={toggleMenu} className="w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600">
            フィルターを適用
          </button>
        </div>
      )}

        <button className="add-user-btn ml-2" onClick={() => alert("Add user clicked!")}>+ 新規追</button>
      </div>

      {/* User Table */}
      <table className="user-table">
        <thead>
          <tr>
            <th className="w-[100px]">アバター</th>
            <th>ユーザー名 </th>
            <th>メール</th>
            <th>役割</th>
            <th>状態</th>
            <th>詳細</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td className="avatar">
                <img src={user.avatar} alt={user.name} />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td >
                {user.status === "アクティブ" ? "アクティブ" : "インアクティブ"}
              </td>
              <td className="view">
                <button>表示</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          前へ
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              className={currentPage === page ? "active" : ""}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          )
        )}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          次
        </button>
      </div>
    </div>
  );
};

export default AdminUsers;
