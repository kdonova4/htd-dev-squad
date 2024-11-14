import React from "react";
import ReactDOM from "react-dom";
import { RestroomProvider } from "./context/RestroomContext"; // Adjust the path as needed
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.render(
  <AuthProvider>
    <RestroomProvider>
      <App />
    </RestroomProvider>
  </AuthProvider>,
  document.getElementById("root")
);
