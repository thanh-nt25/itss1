import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { sample_course_id } from "@/main"

const Account = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-stretch gap-6 p-8 bg-gray-100">
      {/* Card 1: Progress Bars */}
      <div className="flex-2 w-[500px] bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">コース進捗</h2>
        {[...Array(4)].map((_, index) => (
          <div key={index} className="mb-8 cursor-pointer" onClick={() => navigate(`/lectures/${sample_course_id}`)}>
            <h3 className="text-gray-600">日本語{index + 1}</h3>
            <div className="w-full bg-gray-300 rounded h-7">
              <div
                className="h-full bg-green-400 rounded"
                style={{ width: `${30 + index * 10}%` }}
              ></div>
            </div>
          </div>
        ))}
        <div className="flex justify-center">
          <FaChevronDown size={24} />
        </div>
        
      </div>

      {/* Card 2: User Info */}
      <div className="flex-1 bg-white shadow-md rounded-lg p-6 grid grid-cols-2 gap-6">
        {/* Cột 1 */}
        <div>
          <div className="flex justify-center mb-12">
            <div className="w-40 h-40 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-3xl">
              🧑
            </div>
          </div>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm">Eメール</label>
              <input
                type="email"
                defaultValue={user?.email || ""}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm">電話番号</label>
              <input
                type="text"
                defaultValue={user?.phone || ""}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm">職業</label>
              <input
                type="text"
                defaultValue={user?.job || ""}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </form>
        </div>

        {/* Cột 2 */}
        <div>
          <div className="text-right mb-6">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              更新
            </button>
          </div>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm">名前</label>
              <input
                type="text"
                defaultValue={user?.name || ""}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-gray-600 text-sm">年</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2">
                  <option>2000</option>
                  <option>2001</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-600 text-sm">月</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2">
                  <option>1</option>
                  <option>2</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-600 text-sm">日</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2">
                  <option>1</option>
                  <option>2</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-gray-600 text-sm">性別</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2">
                <option>男性</option>
                <option>女性</option>
                <option>その他</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-600 text-sm">住所</label>
              <input
                type="text"
                defaultValue={user?.address || ""}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm">登録日</label>
              <input
                type="text"
                defaultValue={user?.address || ""}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;
