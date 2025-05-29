import { useState } from 'react'
import { useRoutes } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './routes.jsx';
//import './App.css'

const App = () => {

  return (
      <>
        <div className="card">
          <AppRoutes />
        </div>
      </>
  );
};

export default App;
