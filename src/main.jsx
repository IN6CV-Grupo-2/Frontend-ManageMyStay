import { BrowserRouter } from 'react-router-dom'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import * as ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './hooks/useAuth.jsx'
//import './index.css'
import App from './App.jsx'

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <AuthProvider >
          <App />
        </AuthProvider >
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)