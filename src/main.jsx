import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import {App} from './App.jsx'

createRoot(document.getElementById('root')).render(
    <ChakraProvider>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
    </ChakraProvider>
)
