import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import axiosInstance from "@/api/axiosInstance";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle sending OTP
  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post(`/api/user/send-otp`, { email });
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP送信に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  // Handle password reset
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("パスワードが一致しません。");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axiosInstance.post(`/api/user/reset-password`, {
        email,
        otp,
        newPassword,
      });
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "パスワードリセットに失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page flex flex-col mt-10 items-center min-h-screen bg-gray-100">
      <div className="flex flex-col">

        <h2 className="h2 text-2xl font-bold mb-6 text-center">HouRenShuu</h2>
        <h2 className="h2 text-2xl font-bold mb-6 text-center">パスワードをお忘れですか？</h2>
      </div>
      <div
        className="flex flex-col gap-4 auth-form w-[560px]  pt-3 rounded-lg shadow-lg bg-white"
        style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)" }}
      >
        

        
        {/* Email Field */}
        <div className="flex items-center ">
          <label htmlFor="email" className="text-right w-[350px] block text-gray-700 font-bold mr-2">
            メール:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[300px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            // placeholder="メールアドレスを入力してください"
          />
          <div className="w-[150px]"></div>

          
        </div>
        <div className="flex">

          <div className="w-[35px]"></div>
          <div className="ml-20 pl-20 flex justify-between items-center text-sm">
            <Link  className="text-blue-500 hover:underline">
                OTPをメールに送信する
            </Link>
          </div>
        </div>
          
        <div className="flex items-center">
          <label htmlFor="email" className="text-right w-[350px] block text-gray-700 font-bold mr-2">
          新しいパスワード:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[300px]  w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            // placeholder="メールアドレスを入力してください"
          />
          <div className="w-[150px]"></div>
        </div>
        <div className="flex items-center">
          <label htmlFor="email" className="text-right w-[350px] block text-gray-700 font-bold mr-2">
          新しいパスワードを確認:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" w-[300px] w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            // placeholder="メールアドレスを入力してください"
          />
          <div className="w-[150px]"></div>
        </div>

        <div className="flex items-center">
          <label htmlFor="email" className="text-right w-[350px] block text-gray-700 font-bold mr-2">
          OTP:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[300px] w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            // placeholder="メールアドレスを入力してください"
          />
          <div className="w-[150px]"></div>
        </div>



        {/* <div>
          <label htmlFor="newPassword" className="block text-gray-700 font-bold mb-2">
            新しいパスワード:
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="新しいパスワードを入力してください"
          />
        </div>


        <div>
          <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
            新しいパスワードを確認:
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
   
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="パスワードを再入力してください"
          />
        </div>

      
        <div>
          <label htmlFor="otp" className="block text-gray-700 font-bold mb-2">
            OTP:
          </label>
          <input
            type="text"
            id="otp"
            value={otp}
   
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="OTPコードを入力してください"
          />
        </div> */}

        {/* Submit Button */}
        <div className="flex justify-center">

          <button
            // onClick={handleSubmit}
            className="w-[300px] bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none"
            disabled={loading}
            >
            パスワードリセットをリクエストする
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;


// import React, { useState } from "react";
// import "./auth.css";
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { UserData } from "../../context/UserContext";
// import { CourseData } from "../../context/CourseContext";

// const ForgotPassword = () => {
//   // const [email, setEmail] = useState("");
//   // const [btnLoading, setBtnLoading] = useState(false);
//   // const navigate = useNavigate();

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setBtnLoading(true);
//   //   try {
//   //     const { data } = await axiosInstance.post(`/api/user/forgot`, { email });

//   //     toast.success(data.message);
//   //     navigate("/login");
//   //     setBtnLoading(false);
//   //   } catch (error) {
//   //     toast.error(error.response.data.message);
//   //     setBtnLoading(false);
//   //   }
//   // };
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const { btnLoading, loginUser } = UserData();
  
//   const { fetchMyCourse } = CourseData();
  
//   const submitHandler = async (e) => {
//     e.preventDefault();
//     await loginUser(email, password, navigate, fetchMyCourse);
//   };


//   return (
//     <div className="auth-page flex justify-center items-center min-h-screen bg-gray-100 ">
//       <div
//         className="flex flex-col gap-4 auth-form w-[450px] p-8 rounded-lg shadow-lg rounded shadow-lg"
//         style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)" }}
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">HouRenShuu</h2>
//         <h2 className="text-2xl font-bold mb-6 text-center">パスワードをお忘れですか？</h2>
        
        
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;
