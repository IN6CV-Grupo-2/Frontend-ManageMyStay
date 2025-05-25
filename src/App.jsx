import { useRoutes } from 'react-router-dom';
import { ChakraProvider, useColorMode, extendTheme } from "@chakra-ui/react";
import routes from './routes.jsx';
import { Navbar } from './components/navbars/Navbar.jsx';
import { Footer } from './components/footers/Footer.jsx';

// 🎨 Tema personalizado: Meddle Pink Floyd
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "linear-gradient(135deg, #2E576A 0%, #B8807C 60%, #7BC2C4 100%)",
        minHeight: "100vh",
        minWidth: "100vw",
        overflowX: "hidden",
      },
    },
  },
  colors: {
    meddle: {
      teal: "#2E576A",
      brown: "#B8807C",
      aqua: "#7BC2C4",
      sand: "#F9F7F2",
      darksand: "#2E2A29",
      blue: "#213547",
      pink: "#E6B7B4",
    },
  },
});

// 🧱 Layout con Navbar + Footer + Contenido
function Layout({ children }) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Navbar colorMode={colorMode} toggleColorMode={toggleColorMode} />
      <div style={{ minHeight: "calc(100vh - 140px)", width: "100vw", overflowX: "hidden" }}>
        {children}
      </div>
      <Footer />
    </>
  );
}

// 🚀 Componente App principal
export const App = () => {
  const element = useRoutes(routes);

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        {element}
      </Layout>
    </ChakraProvider>
  );
};
