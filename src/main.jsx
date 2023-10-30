import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Kyselyt from "./components/Kyselyt.jsx";
import LisaaKysely from "./components/lisaaKysely.jsx";

const router = createBrowserRouter([
  // Import components that are used in routes
  {
    path: "/",
    element: <App />,
    children: [
      // children are nested routes with a route
      {
        path: "kyselyt",
        element: <Kyselyt />,
      },
      {
        path: "lisaaKysely",
        element: <LisaaKysely />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
