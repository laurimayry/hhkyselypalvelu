import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Kysely from './components/Kysely.jsx';
import Kyselyt from './components/Kyselyt.jsx';


const router = createBrowserRouter([

      {
        path: "kyselyt",
        element: <Kyselyt />,
      },
      {
        path: ":kyselyId",
        element: <Kysely />,
      },

    ]   
  
);
 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
