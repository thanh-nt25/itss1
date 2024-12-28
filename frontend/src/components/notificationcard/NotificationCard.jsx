import React from "react";
import { FaBell, FaTrashAlt } from "react-icons/fa";

const NotificationCard = ({ isMenuOpen, toggleMenu, role }) => {
  return (
    <div className="relative">
      {/* Icon Bell */}
      <div
        onClick={toggleMenu}
        className="p-2 bg-white rounded-full hover:bg-gray-300 cursor-pointer flex items-center justify-center"
        role="button"
        tabIndex={0}
        aria-label="FaBell"
      >
        <FaBell
          className={`text-[30px] cursor-pointer ${
            isMenuOpen ? "text-blue-500" : "text-gray-600"
          } hover:text-blue-500`}
        />
      </div>

      {/* Notification Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-[50px] right-[0px] w-[400px] bg-white shadow-lg rounded-lg p-4 border border-gray-300 z-50">
          <h3 className="font-semibold text-lg mb-4 text-gray-700">通知</h3>
          <ul className="space-y-6">
            {/* Notification Item 1 */}
            <li className="flex items-start">
              <div className="mr-4 flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center">
                  📅
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-800">
                新しいコースを掲載しました。
                </p>
                <p className="text-sm text-gray-500">2024年12月24日 21:00</p>
              </div>
            </li>
            {/* Notification Item 2 */}
            <li className="flex items-start">
              <div className="mr-4 flex-shrink-0">
                <div className="w-10 h-10 bg-green-100 text-green-500 rounded-full flex items-center justify-center">
                  💬
                </div>
              </div>
              <div>
                {role === "user" && 
                    <p className="font-medium text-gray-800">
                        ポイントの支払いが完了しました。
                    </p>
                }
                {role === "admin" && 
                    <p className="font-medium text-gray-800">
                        3名の新入生が登録しました。
                    </p>
                }
                <p className="text-sm text-gray-500">2024年12月24日 20:45</p>
              </div>
            </li>
            {/* Notification Item 3 */}
            <li className="flex items-start">
              <div className="mr-4 flex-shrink-0">
                <div className="w-10 h-10 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center">
                  ⚠️
                </div>
              </div>
              <div>
                {role === "user" && 
                    <p className="font-medium text-gray-800">
                        未完了のコースがあります。
                    </p>
                }
                {role === "admin" && 
                    <p className="font-medium text-gray-800">
                        システムエラーが発生しました。
                    </p>
                }
                <p className="text-sm text-gray-500">2024年12月24日 19:30</p>
              </div>
            </li>
            {/* Notification Item 4 */}
            <li className="flex items-start">
              <div className="mr-4 flex-shrink-0">
                <div className="w-10 h-10 bg-purple-100 text-purple-500 rounded-full flex items-center justify-center">
                  ✔️
                </div>
              </div>
              <div>
                {role === "user" && 
                    <p className="font-medium text-gray-800">
                        あなたはコースを完了しました。
                    </p>
                }
                {role === "admin" && 
                    <p className="font-medium text-gray-800">
                        日本語コース修了者は10名です。
                    </p>
                }
                <p className="text-sm text-gray-500">2024年12月24日 18:00</p>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationCard;
