import { useState } from 'react'
import { useRoutes } from 'react-router-dom';
import routes from './routes.jsx';
import './App.css'

export const App = () => {

  let element = useRoutes(routes);

    return(
      <>
      {element}
      </>
    )
}

