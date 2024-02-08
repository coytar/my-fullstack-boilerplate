import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store as RNC } from "react-notifications-component";
import AuthImage from "../images/auth-image.jpg";
import AuthDecoration from "../images/auth-decoration.png";
import axios from "axios";
import * as R from "ramda";
import useLogin from "../hooks/useLogin";

function Signin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isLoading, error, success } = useLogin();

  const signInButtonColor = (status) => {
    // console.log(status);
    switch (status) {
      case true:
        return "btn bg-gray-500 text-white whitespace-nowrap";
      case false:
        return "btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap";
      default:
        return "btn bg-gray-500 text-white whitespace-nowrap";
    }
  };

  const updateUsername = (e) => setUsername(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  const signin = async () => {
    await login(username, password);
    // const userCredentials = { username, password };
    // var authOptions = {
    //   method: "post",
    //   url: "http://localhost:3001/api/auth/signin",
    //   data: userCredentials,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   json: true,
    // };

    // axios(authOptions)
    //   // axios
    //   //   .post("http://localhost:3001/api/auth/register", { username, password })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // RNC.addNotification({
    //   title: "Success!",
    //   message: "Signing in",
    //   type: "success",
    //   container: "bottom-left",
    //   animationIn: ["animated", "fadeInRight"],
    //   animationOut: ["animated", "fadeOutRight"],
    //   dismiss: {
    //     duration: 1000,
    //   },
    //   onRemoval: () => navigate("/dashboard"),
    // });

    // navigate("/dashboard");
    return;
    // setLoading(true);
    // dispatch(attemptLogin(userCredentials))
    //   .catch(R.identity)
    //   .finally(() => setLoading(false));
  };

  if (success) {
    setTimeout(() => navigate("/dashboard"), 500);
    return;
  }

  return (
    <main className="bg-white dark:bg-slate-900">
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            {/* Header */}
            <div className="flex-1">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link className="block" to="/">
                  <svg width="32" height="32" viewBox="0 0 32 32">
                    <defs>
                      <linearGradient
                        x1="28.538%"
                        y1="20.229%"
                        x2="100%"
                        y2="108.156%"
                        id="logo-a"
                      >
                        <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                        <stop stopColor="#A5B4FC" offset="100%" />
                      </linearGradient>
                      <linearGradient
                        x1="88.638%"
                        y1="29.267%"
                        x2="22.42%"
                        y2="100%"
                        id="logo-b"
                      >
                        <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                        <stop stopColor="#38BDF8" offset="100%" />
                      </linearGradient>
                    </defs>
                    <rect fill="#6366F1" width="32" height="32" rx="16" />
                    <path
                      d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                      fill="#4F46E5"
                    />
                    <path
                      d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                      fill="url(#logo-a)"
                    />
                    <path
                      d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                      fill="url(#logo-b)"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold">
                Welcome back! ✨
              </h1>
              ({process.env.NODE_ENV} version)
              <br />
              <br />
              {/* Form */}
              <form>
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      className="form-input w-full"
                      type="email"
                      value={username}
                      onChange={updateUsername}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      className="form-input w-full"
                      type="password"
                      autoComplete="on"
                      value={password}
                      onChange={updatePassword}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <Link
                      className="text-sm underline hover:no-underline"
                      to="/reset-password"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <label className={`${signInButtonColor(loading)}}`}>
                    <input type="button" onClick={signin} disabled={loading} />
                    <span className="text-sm">Sign In</span>
                  </label>
                </div>
                <div className="mt-5">
                  {!isLoading && success && (
                    <label className="block text-sm font-medium mb-1 text-green-500">
                      {success}
                    </label>
                  )}
                  {!isLoading && error && (
                    <label className="block text-sm font-medium mb-1 text-red-500">
                      Error: {error}
                    </label>
                  )}
                </div>
              </form>
              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="text-sm">
                  Don’t you have an account?{" "}
                  <Link
                    className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                </div>
                {/* Warning */}
                <div className="mt-5">
                  <div className="bg-amber-100 dark:bg-amber-400/30 text-amber-600 dark:text-amber-400 px-3 py-2 rounded">
                    <svg
                      className="inline w-3 h-3 shrink-0 fill-current mr-2"
                      viewBox="0 0 12 12"
                    >
                      <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                    </svg>
                    <span className="text-sm">
                      Enjoy the benefits of paid features during the 
                      beta testing phase.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div
          className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2"
          aria-hidden="true"
        >
          <img
            className="object-cover object-center w-full h-full"
            src={AuthImage}
            width="760"
            height="1024"
            alt="Authentication"
          />
          <img
            className="absolute top-1/4 left-0 -translate-x-1/2 ml-8 hidden lg:block"
            src={AuthDecoration}
            width="218"
            height="224"
            alt="Authentication decoration"
          />
        </div>
      </div>
    </main>
  );
}

export default Signin;
