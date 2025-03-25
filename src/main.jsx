import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoute from "./routes/AppRoutes"

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppRoute />
  </BrowserRouter>
);
