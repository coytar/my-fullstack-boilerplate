import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
      break;
    case "LOGOUT":
      return { user: null };
    default:
      return state;
      break;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        // dispatch({ type: "LOGIN", payload: user });
      }
    }
    catch (ex) {
      console.log(ex);
    }
  }, []);

  // console.log("authcontext state", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
