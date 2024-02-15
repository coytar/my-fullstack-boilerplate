import { useState } from "react";
import useAuthContext from "./useAuthContext";
import axios from "axios";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);

    const userCredentials = { username, password };
    var authOptions = {
      method: "post",
      url: `${process.env.REACT_APP_BACKEND}/api/auth/login`,
      data: userCredentials,
      headers: {
        "Content-Type": "application/json",
      },
      json: true,
    };

    axios(authOptions)
      .then((response) => {
        setSuccess(response.data.message);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", JSON.stringify(response.data.token));
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
  return { login, isLoading, error, success };
};

export default useLogin;
