import React from 'react'
import { UserData } from "@/context/UserContext";
import { Outlet } from "react-router-dom"
import Header from "@/components/header/Header";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import Tabs from "@/components/tabs/Tabs";
import Footer from "@/components/footer/Footer";
import toast from "react-hot-toast";

const RootLayout = () => {
    const { isAuth, user, loading, setIsAuth, setUser } = UserData();

     const handleLogout = async () => {
        localStorage.clear();
        setUser([]);
        setIsAuth(false);
        toast.success("Logged Out");
        // navigate("/login");
        navigate("/", { replace: true });
    };

    return (
        <div className="root-layout">
            <Header isAuth={isAuth} user={user} handleLogout={handleLogout} /> 
            <Tabs isAuth={isAuth} role={user?.role}/>
            <Breadcrumb className="ml-2 mt-2"/>
            {/* <RouterProvider router={router} /> */}
            <Outlet/>

            <Footer />
        
        </div>
    )
}

export default RootLayout
