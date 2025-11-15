import React from 'react';
import { Outlet } from 'react-router-dom';
import Dashboard from './Pages/MainPage/Dashboard/Dashboard';

const App: React.FC = () => {

  return (
    <main className="app-container">
      {/* <Dashboard/> */}
      <Outlet />
    </main>
  );
}

export default App;