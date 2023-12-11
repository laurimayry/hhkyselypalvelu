import React from "react";
import { useRoutes, Outlet } from "react-router-dom";
import Kyselyt from "./components/Kyselyt.jsx";
import Kysely from "./components/Kysely.jsx";

function App() {
  const routes = [
    { path: "/kyselyt", element: <Kyselyt /> },
    { path: "/kyselyId", element: <Kysely /> },
  ];

  const element = useRoutes(routes);

  return (
    <div>
      <h1>My App</h1>
      <Outlet />
    </div>
  );
}

export default App;
