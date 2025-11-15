import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Note the .tsx and .ts imports
import App from './App.tsx';
import './index.css';
import HomePage from './Pages/HomePage/Home/HomePage.tsx';
import SignIn from './Pages/HomePage/SignIn/SignIn.tsx';
import SignUp from './Pages/HomePage/SignUp/SignUp.tsx';

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
    ],
  },
]);

// Use the '!' non-null assertion to fix the TypeScript error
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);