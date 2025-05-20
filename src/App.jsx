import { useState } from 'react'
import { useRoutes } from 'react-router-dom';
import routes from './routes.jsx';
import './App.css'
import HomePage from './pages/HomePage';
import HotelsPage from './pages/HotelsPage';

export const App = () => {

  let element = useRoutes(routes);

    return(
      <>
      {element}
      {/* <HomePage /> */}
      <HotelsPage />
      </>
    )
}

