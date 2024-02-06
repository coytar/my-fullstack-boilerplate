import { useState } from "react";
import useAuthContext from "./useAuthContext";
import axios from "axios";

const useLogout = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    var authOptions = {
      method: "post",
      url: `${process.env.REACT_APP_BACKEND}/api/auth/logout`,
      // url: `/api/auth/logout`,
      data: {},
      headers: {
        // "Access-Control-Allow-Origin": "https://template1.endratek.com",
        // "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
        // "Access-Control-Allow-Headers": "Access-Control-Allow-Headers,Access-Control-Allow-Origin,Access-Control-Allow-Methods,Content-Type",
        "Content-Type": "application/json",
      },
      json: true,
    };

    axios(authOptions)
      .then((response) => {
        setSuccess(response.data.message);
        //remove user from localstorage
        localStorage.removeItem("user");
        // dispatch({ type: "LOGOUT", payload: null });
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.message);
        setIsLoading(false);
      });
  };
  return { logout };
};

export default useLogout;
