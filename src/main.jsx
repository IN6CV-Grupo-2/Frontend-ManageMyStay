import { BrowserRouter } from 'react-router-dom'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import {App} from './App.jsx'
import { AuthProvider } from './hooks/useAuth';
import { DecodedAuthProvider } from './context/AuthContext.jsx';


const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
        <BrowserRouter>
            <AuthProvider >
                <DecodedAuthProvider>
                    <App/>
                </DecodedAuthProvider>
            </AuthProvider >
        </BrowserRouter>
    </ChakraProvider>
    </React.StrictMode>
)