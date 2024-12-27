import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_END_POINT,
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = JSON.parse(sessionStorage.getItem("accessToken")) || "";

//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     return config;
//   },
//   (err) => Promise.reject(err)
// );

// Tự động thêm token vào mọi yêu cầu API
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},
  (err) => Promise.reject(err)
);

export default axiosInstance;
