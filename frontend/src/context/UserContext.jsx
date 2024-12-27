import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "@/api/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  // axios.interceptors.request.use((config) => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }
  //   return config;
  // });

  async function loginUser(email, password, navigate, fetchMyCourse) {
    setBtnLoading(true);
    try {
      const { data } = await axiosInstance.post(`/api/user/login`, {
        email,
        password,
      });

      toast.success(data.message);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      if(data?.user?.role === "admin"){
        navigate("/admin/dashboard");  
      }else{
        navigate("/");
        fetchMyCourse();
      }
      
    } catch (error) {
      setBtnLoading(false);
      setIsAuth(false);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  async function registerUser(name, email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axiosInstance.post(`/api/user/register`, {
        name,
        email,
        password,
      });

      toast.success(data.message);
      setBtnLoading(false);
      navigate("/login");
    } catch (error) {
      setBtnLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  async function verifyOtp(otp, navigate) {
    setBtnLoading(true);
    const activationToken = localStorage.getItem("activationToken");
    try {
      const { data } = await axiosInstance.post(`/api/user/verify`, {
        otp,
        activationToken,
      });

      toast.success(data.message);
      navigate("/login");
      localStorage.removeItem("activationToken");
      setBtnLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setBtnLoading(false);
    }
  }

  async function fetchUser() {
    try {
      const { data } = await axiosInstance.get(`/api/user/me`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      // console.log("data from local", data);
      
      setUser(data.user);
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setIsAuth(false);
      setUser(null);
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // console.log("user effect token: ", token);
      
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setIsAuth,
        isAuth,
        loginUser,
        btnLoading,
        loading,
        registerUser,
        verifyOtp,
        fetchUser,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
