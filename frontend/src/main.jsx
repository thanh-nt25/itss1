import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import { CourseContextProvider } from "./context/CourseContext.jsx";
import { RouterProvider } from "react-router-dom";
import { SearchProvider } from "@/context/SearchContext";

export const sample_course_id = import.meta.env.VITE_SAMPLE_COURSE_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <CourseContextProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </CourseContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
