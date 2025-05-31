import { Provider } from "@/components/ui/provider"
import { useRoutes } from 'react-router-dom';
import routes from './routes.jsx';
//import './App.css'

export const App = () => {
  const element = useRoutes(routes)

  return (
    <Provider>
      {element}
    </Provider>
  );
}
