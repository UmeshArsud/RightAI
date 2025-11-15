import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.tsx';
import './index.css';
import HomePage from './Pages/HomePage/Home/HomePage.tsx';
import SignIn from './Pages/HomePage/SignIn/SignIn.tsx';
import SignUp from './Pages/HomePage/SignUp/SignUp.tsx';

// --- 1. Import your Dashboard component ---
// (Adjust the path to match your file structure)
import Dashboard from './Pages/MainPage/Dashboard/Dashboard.tsx'; 

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      // --- 2. Add the route for your Dashboard ---
      // This tells the router what to render for "/dashboard"
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


//prev
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import App from './App.tsx';
// import './index.css';
// import HomePage from './Pages/HomePage/Home/HomePage.tsx';
// import SignIn from './Pages/HomePage/SignIn/SignIn.tsx';
// import SignUp from './Pages/HomePage/SignUp/SignUp.tsx';

// // --- 1. Import your Dashboard component ---
// // (Adjust the path to match your file structure)
// import Dashboard from './Pages/Dashboard/Dashboard.tsx'; 

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     children: [
//       {
//         index: true,
//         element: <HomePage />,
//       },
//       {
//         path: '/signin',
//         element: <SignIn />,
//       },
//       {
//         path: '/signup',
//         element: <SignUp />,
//       },
//       // --- 2. Add the route for your Dashboard ---
//       // This tells the router what to render for "/dashboard"
//       {
//         path: '/dashboard',
//         element: <Dashboard />,
//       },
//     ],
//   },
// ]);

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );