import React from "react";
import "./App.css";
import { 
  createBrowserRouter,
  BrowserRouter, 
  Routes, 
  Route,
  createRoutesFromElements,
  RouterProvider 
} from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Verify from "./pages/auth/Verify";
import Footer from "./components/footer/Footer";
import Breadcrumb from "./components/breadcrumb/Breadcrumb";
import About from "./pages/about/About";
import Account from "./pages/account/Account";
import { UserData } from "./context/UserContext";
import Loading from "./components/loading/Loading";
import Courses from "./pages/courses/Courses";
import CourseDescription from "./pages/coursedescription/CourseDescription";
import PaymentSuccess from "./pages/paymentsuccess/PaymentSuccess";
import Dashbord from "./pages/dashbord/Dashbord";
import CourseStudy from "./pages/coursestudy/CourseStudy";
import CourseTests from "./pages/coursetests/CourseTests";
import Tested from "./pages/coursetests/Tested";
import CoursePractices from "./pages/coursepractices/CoursePractices";
import Practiced from "./pages/coursepractices/Practiced";
import Lecture from "./pages/lecture/Lecture";
import AdminDashbord from "./admin/Dashboard/AdminDashbord";
import AdminCourses from "./admin/Courses/AdminCourses";
import AdminCoursesDetails from "./admin/Courses/CourseDetails";
import AddDocuments from "./admin/Courses/AddDocuments";
import AddExercises from "./admin/Courses/AddExercises";
import AdminUsers from "./admin/Users/AdminUsers";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Tabs from "./components/tabs/Tabs";
import { sample_course_id } from "@/main"
import RootLayout from "@/layouts/RootLayout"



const App = () => {
  const { isAuth, user, loading, setIsAuth, setUser } = UserData();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout/>}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route
          path="/account"
          element={isAuth ? <Account user={user} /> : <Login />}
        />
        <Route path="/login" element={isAuth ? <Home /> : <Login />} />
        <Route
          path="/register"
          element={isAuth ? <Home /> : <Register />}
        />
        <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
        <Route
          path="/forgot"
          element={isAuth ? <Home /> : <ForgotPassword />}
        />
        <Route
          path="/reset-password/:token"
          element={isAuth ? <Home /> : <ResetPassword />}
        />
        {/* <Route
          path="/course/:id"
          element={isAuth ? <CourseDescription user={user} /> : <Login />}
        /> */}
        <Route
          path="/payment-success/:id"
          element={isAuth ? <PaymentSuccess user={user} /> : <Login />}
        />
        <Route
          path="/:id/dashboard"
          element={isAuth ? <Dashbord user={user} /> : <Login />}
        />
        <Route
          path="/course/:id"
          element={isAuth ? <CourseStudy user={user} /> : <Login />}
        />
  
        <Route
          path="/course/:id/tests"
          element={isAuth ? <CourseTests user={user} /> : <Login />}
        />
  
        <Route
          path={`/course/${sample_course_id}/tested`}
          element={isAuth ? <Tested user={user} /> : <Login />}
        />

        <Route
          path="/course/:id/practices"
          element={isAuth ? <CoursePractices user={user} /> : <Login />}
        />

        <Route
          path={`/course/${sample_course_id}/practiced`}
          element={isAuth ? <Practiced user={user} /> : <Login />}
        />
        
  
        <Route
          path="/lectures/:id"
          element={isAuth ? <Lecture user={user} /> : <Login />}
        />
  
        <Route
          path="/admin/dashboard"
          element={isAuth ? <AdminDashbord user={user} /> : <Login />}
        />
  
        <Route
          path="/admin/course"
          element={isAuth ? <AdminCourses user={user} /> : <Login />}
        />
        <Route
          path="/admin/course/course-details"
          element={isAuth ? <AdminCoursesDetails user={user} /> : <Login />}
        />
        <Route
          path="/admin/course/course-details/add-documents"
          element={isAuth ? <AddDocuments user={user} /> : <Login />}
        />
        <Route
          path="/admin/course/course-details/add-exercises"
          element={isAuth ? <AddExercises user={user} /> : <Login />}
        />
        <Route
          path="/admin/users"
          element={isAuth ? <AdminUsers user={user} /> : <Login />}
        />
      </Route>
  
    )
  )
  
  return (  
    <RouterProvider router={router} />
  );
};

export default App;
