import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import "./css/style.css";

// import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/projects/Tasks";
import Feedback from "./pages/Feedback";
import PageNotFound from "./pages/utility/PageNotFound";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import useAuthContext from "./hooks/useAuthContext";
import Home from "./pages/Home";
import TaskView from "./pages/projects/TaskView";

function RequireAuth({ children }) {
  const { user } = useAuthContext();

  useEffect(() => {
    // console.log(user);
  }, [user]);

  // return user != null ? children : <Navigate to="/" replace />;
  return children;
}

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/projects/tasks"
          element={
            <RequireAuth>
              <Tasks />
            </RequireAuth>
          }
        />
        <Route
          path="/projects/task/:id"
          element={
            <RequireAuth>
              <TaskView />
            </RequireAuth>
          }
        />
        <Route path="/feedback" element={<Feedback />} />

        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;
