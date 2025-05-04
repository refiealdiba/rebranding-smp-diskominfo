import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import RouteList from "./routes/RouteList";
import "./index.css"; // atau styling lain yang kamu pakai

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={RouteList} />
  </React.StrictMode>
);
