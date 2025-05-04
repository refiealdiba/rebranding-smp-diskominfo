import { createBrowserRouter } from "react-router-dom";
import Test from "../pages/test";
import Home from "../components/pages/home";
import Users from "../components/pages/Users";
import Articles from "../components/pages/Articles";
import Videos from "../components/pages/Videos";
import Achievements from "../components/pages/Achievements";
import Photos from "../components/pages/Photos";
import PhotoDetails from "../components/pages/PhotoDetails";
import AdminDashboard from "../components/pages/AdminDashboard";

const RouteList = createBrowserRouter([
  {
    path: "/",
    element: <AdminDashboard />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "test",
        element: <Test />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "articles",
        element: <Articles />,
      },
      {
        path: "videos",
        element: <Videos />,
      },
      {
        path: "achievements",
        element: <Achievements />,
      },
      {
        path: "photos",
        element: <Photos />,
      },
      {
        path: "photo-details",
        element: <PhotoDetails />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>404 - Page Not Found</h1>,
  },
]);

export default RouteList;
