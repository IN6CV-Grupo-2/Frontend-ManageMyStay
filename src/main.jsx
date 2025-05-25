import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import {App} from './App.jsx'
import { AuthProvider } from './hooks/useAuth.jsx'; 


createRoot(document.getElementById('root')).render(
    <ChakraProvider>
        <BrowserRouter>
            <AuthProvider >
                <App/>
            </AuthProvider >
        </BrowserRouter>
    </ChakraProvider>
)