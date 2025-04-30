import { createBrowserRouter } from "react-router-dom";
import Test from "../pages/test";

const RouteList = createBrowserRouter([
    {
        path: "/",
        element: <Test />,
    },
    {
        path: "*",
        element: <h1>404</h1>,
    },
]);

export default RouteList;
