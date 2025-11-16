import React from 'react';
import { Outlet } from 'react-router-dom';

const App: React.FC = () => {

  return (
    <main className="app-container">
      <Outlet />
    </main>
  );
}

export default App;