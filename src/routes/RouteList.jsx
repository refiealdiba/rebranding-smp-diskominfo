import { createBrowserRouter } from "react-router-dom";
import Test from "../pages/test";
import Home from "../pages/home";
import MainLayout from "../components/layouts/MainLayout";

const RouteList = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/test",
                element: <Test />,
            },
        ],
    },
    {
        path: "*",
        element: <h1>404</h1>,
    },
]);

export default RouteList;
