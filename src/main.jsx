import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import RouteList from "./routes/RouteList";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={RouteList} />
    </StrictMode>
);
