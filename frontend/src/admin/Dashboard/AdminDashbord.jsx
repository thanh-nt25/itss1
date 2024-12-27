import React from "react";
import { useNavigate } from "react-router-dom";
import { Line, Bar, Pie } from "react-chartjs-2"; // Biểu đồ Line, Bar, Pie từ react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register các component Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
import { FaUser, FaBook, FaChartBar, FaFlag } from "react-icons/fa";

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();

  // Nếu không phải admin, chuyển hướng
  if (user && user.role !== "admin") {
    navigate("/");
    return null;
  }

  // Dữ liệu giả lập
  const userData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "ユーザー増加",
        data: [100, 200, 300, 400, 500, 600],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const courseData = {
    labels: ["日本語1", "日本語2", "日本語3", "日本語4", "日本語5"],
    datasets: [
      {
        label: "コース登録と完了",
        data: [120, 90, 140, 70, 100],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderWidth: 1,
      },
    ],
  };

  const testData = {
    labels: ["12", "30", "24", "10"],
    datasets: [
      {
        label: "テストの成績",
        data: [25, 50, 15, 10],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const summaryData = {
    labels: ["Test Score", "Completion Rate"],
    datasets: [
      {
        label: "平均データ",
        data: [68, 50],
        backgroundColor: ["rgba(255, 206, 86, 0.6)", "rgba(75, 192, 192, 0.6)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 bg-white min-h-screen">
    <h1 className="text-xl font-bold mb-4 text-black-700 text-[25px]">Admin ダッシュボード</h1>

    {/* Grid layout 2x2 */}
    <div className="grid grid-cols-2 gap-6">

      {/* Chart 1: Summary Data */}
      <div className="bg-blue-50 p-6 rounded-lg shadow-md flex flex-col justify-between items-center border border-blue-300">
        {/* Dữ liệu */}
        <ul className="space-y-4 w-full pt-10 px-12">
          <li className="flex items-center justify-between w-full">
            <FaUser className="text-blue-500 mr-2 text-xl" />
            <span className="text-blue-700 flex-1 text-lg">ユーザー:</span>
            <span className="font-bold text-blue-900 text-lg">1200</span>
          </li>
          <li className="flex items-center justify-between w-full">
            <FaBook className="text-green-500 mr-2 text-xl" />
            <span className="text-blue-700 flex-1 text-lg">コース:</span>
            <span className="font-bold text-blue-900 text-lg">75</span>
          </li>
          <li className="flex items-center justify-between w-full">
            <FaChartBar className="text-orange-500 mr-2 text-xl" />
            <span className="text-blue-700 flex-1 text-lg">平均テストスコア:</span>
            <span className="font-bold text-blue-900 text-lg">68%</span>
          </li>
          <li className="flex items-center justify-between w-full">
            <FaFlag className="text-red-500 mr-2 text-xl" />
            <span className="text-blue-700 flex-1 text-lg">平均コース完了率:</span>
            <span className="font-bold text-blue-900 text-lg">50%</span>
          </li>
        </ul>
        <h2 className="text-center mt-4 font-bold text-black-800 text-[20px]">平均データ</h2>
      </div>

      {/* Chart 2: Line Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
        <Line
          data={userData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  color: "black", // Màu chữ chú thích
                },
              },
            },
          }}
        />
        <h2 className="text-center mt-4 font-bold text-black-800 text-[20px]">ユーザー増加</h2>
      </div>

      {/* Chart 3: Bar Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
        <Bar
          data={courseData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  color: "black",
                },
              },
            },
          }}
        />
        <h2 className="text-center mt-4 font-bold text-black-700 text-[20px]">コース登録と完了</h2>
      </div>

      {/* Chart 4: Pie Chart */}
      <div className="bg-white  p-4 rounded-lg shadow-md border border-gray-300 flex flex-col items-center">
        <div style={{ width: "320px", height: "320px" }}>
          <Pie
            data={testData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  labels: {
                    color: "purple",
                  },
                },
              },
            }}
          />
        </div>
        <h2 className="text-center pt-8 mt-4 font-bold text-black-800 text-[20px]">テストの成績</h2>
      </div>
    </div>
  </div>
  );
};

export default AdminDashboard;
