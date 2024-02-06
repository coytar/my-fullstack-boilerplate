import { useState } from "react";
import useAuthContext from "./useAuthContext";
import axios from "axios";

const useSignup = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (firstName, lastName, username, password) => {
    setIsLoading(true);
    setError(null);

    const userCredentials = { firstName, lastName, username, password };

    var authOptions = {
      method: "post",
      url: `${process.env.REACT_APP_BACKEND}/api/auth/register`,
      // url: `/api/auth/register`,
      data: userCredentials,
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
        localStorage.setItem("user", JSON.stringify(response.data.user));
        // dispatch({
        //   type: "LOGIN",
        //   payload: response.data.user,
        // });
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.message);
        setIsLoading(false);
      });
  };
  return { signup, isLoading, error, success };
};

export default useSignup;