import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
// import React, { useState } from "react";
// import "./auth.css";
// import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import { CourseData } from "../../context/CourseContext";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   // Giả lập đăng nhập
  //   if (email === "test@example.com" && password === "password") {
  //     setError("");
  //     navigate("/"); // Quay về trang chủ sau khi đăng nhập thành công
  //   } else {
  //     setError("メールまたはパスワードが正しくありません。");
  //   }
  // };
  // const navigate = useNavigate();
    const { btnLoading, loginUser } = UserData();
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  
    const { fetchMyCourse } = CourseData();
  
    const submitHandler = async (e) => {
      e.preventDefault();
      await loginUser(email, password, navigate, fetchMyCourse);
    };
  return (
    <div className="mt-10 auth-page flex flex-col justify-center items-center min-h-screen bg-gray-100 mb-20">
      <div className="flex flex-col">

          <h2 className="h2 text-2xl font-bold mb-6 text-center">HouRenShuu</h2>
          <h2 className="h2 text-2xl font-bold mb-6 text-center">ログイン</h2>
          </div>
        
      <div
        className="flex flex-col gap-4 auth-form w-[450px] p-8 rounded-lg shadow-lg rounded shadow-lg"
        style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)" }}
      >
        
        {/* Thông báo lỗi */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Form đăng nhập */}
        <form onSubmit={submitHandler} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              メール (accout below):
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              パスワード:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Giữ đăng nhập */}
          <div className="flex items-center">
            <div className="w-[30px]">

            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 text-blue-500 border-gray-300 rounded"
              />
            </div>
            <label htmlFor="remember" className="ml-2 pb-1 text-sm text-gray-600">
              ログイン状態を維持
            </label>
          </div>

          {/* Nút Đăng nhập */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            ログイン
          </button>
        </form>

        {/* Quên mật khẩu */}
        <div className="flex justify-between items-center mt-4 text-sm">
          <Link to="/forgot" className="text-blue-500 hover:underline">
            パスワードをお忘れですか？
          </Link>
        </div>
        {/* dang ky */}
        <div className="flex justify-between items-center text-sm">
          <Link to="/register" className="text-blue-500 hover:underline">
          アカウントをお持ちではありませんか?
          </Link>
        </div>
        {/* <p>
           Don't have an account? <Link to="/register">Register</Link>
         </p> */}

        {/* Đăng nhập bằng tài khoản bên ngoài */}
        <div className="mt-3">
          {/* <p className="text-center text-gray-500">または</p> */}
          <div class="divider text-center text-gray-500">
            <span>または</span>
          </div>
          <p className="text-sm text-left">アカウントを使用してサインアップ</p>
          <div className="flex justify-center space-x-4 mt-4">
            <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-100">
              <span className="text-blue-700 font-bold">f</span>
              <span>Facebook</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-100">
              <span className="text-red-500 font-bold">G</span>
              <span>Google</span>
            </button>
            
          </div>
          {/* display user */}
          <TableContainer className="mt-5" component={Paper}>
            <Table sx={{
                minWidth: 300,
                "& .MuiTableCell-root": {
                  border: "1px solid #ddd", // Đường viền giữa các ô
                },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>user</TableCell>
                  <TableCell>user@gmail.com</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>admin</TableCell>
                  <TableCell>admin@gmail.com</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>pass</TableCell>
                  <TableCell>123456</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import React, { useState } from "react";
// import "./auth.css";
// import { Link, useNavigate } from "react-router-dom";
// import { UserData } from "../../context/UserContext";
// import { CourseData } from "../../context/CourseContext";

// const Login = () => {
//   const navigate = useNavigate();
//   const { btnLoading, loginUser } = UserData();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const { fetchMyCourse } = CourseData();

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     await loginUser(email, password, navigate, fetchMyCourse);
//   };
//   return (
//     <div className="auth-page ">
//       <div className="auth-form rounded" style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)" }}>
//         <h2>HouRenShuu</h2>
//         <h2>Login</h2>
//         <form onSubmit={submitHandler}>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button disabled={btnLoading} type="submit" className="common-btn">
//             {btnLoading ? "Please Wait..." : "Login"}
//           </button>
//         </form>
//         <p>
//           Don't have an account? <Link to="/register">Register</Link>
//         </p>
//         <p>
//           <Link to="/forgot">Forgot password?</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
