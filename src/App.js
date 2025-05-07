import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthObserver from "./features/auth/AuthObserver.js";
import AppRoutes from "./routes/AppRoutes.js";

function App() {
  return (
    <Router>
      <AuthObserver />
      <AppRoutes />
    </Router>
  );
}

export default App;
