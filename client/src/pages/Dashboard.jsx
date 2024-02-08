import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import DashboardAvatars from "../partials/dashboard/DashboardAvatars";
import FilterButton from "../components/DropdownFilter";
import Datepicker from "../components/Datepicker";
import { call } from "ramda";

function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState("");
  let user = "";

  // if (localStorage.getItem("user"))
  //   user = JSON.parse(localStorage.getItem("user"));

  const callQuery = () => {
    var authOptions = {
      method: "get",
      url: `${process.env.REACT_APP_BACKEND}/api/dashboard`,
      // url: `/api/dashboard`,
      // headers: {
      //   // "Access-Control-Allow-Origin": "https://template1.endratek.com",
      //   // "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
      //   // "Access-Control-Allow-Headers": "Access-Control-Allow-Headers,Access-Control-Allow-Origin,Access-Control-Allow-Methods,Content-Type",
      //   "Content-Type": "application/json",
      // },
      // json: true,
      // withCredentials: true,
      // data: {
      //   user
      // }
    };

    axios(authOptions)
      // axios.get('/api/stuff')
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          setData(response.data.message);
        }
      })
      .catch((err) => {
        // console.log(err);
        if (err.response.status == 401) {
          navigate("/signin");
        }
      });
  };

  useEffect(() => {
    callQuery();
  }, []);

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Avatars */}
              <DashboardAvatars />

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <FilterButton align="right" />
                {/* Datepicker built with flatpickr */}
                <Datepicker align="right" />
                {/* Add view button */}
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                  <svg
                    className="w-4 h-4 fill-current opacity-50 shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add View</span>
                </button>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              {/* Hello! {user.firstName} */}
              Hello!
              <br />
              {data}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
