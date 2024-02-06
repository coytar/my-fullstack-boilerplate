import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeProvider from "./utils/ThemeContext";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { AuthContextProvider } from "./context/AuthContext";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

if (process.env.NODE_ENV == "development") {
  // import("http-proxy-middleware").then((mod) => {
  //   const apiProxy = mod.createProxyMiddleware("/api", {
  //     target: "http://localhost:3001",
  //   });
  // });
}

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_BACKEND}/graphql`, // Your GraphQL server endpoint
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthContextProvider>
        <Router>
          <ApolloProvider client={client}>
            <ReactNotifications />
            <App />
          </ApolloProvider>
        </Router>
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
