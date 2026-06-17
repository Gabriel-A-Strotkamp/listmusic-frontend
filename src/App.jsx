import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core/dist/cjs/popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Componentes base
import MenuPublico from './componentes/MenuPublico';
import MenuPrivado from './componentes/MenuPrivado';
import Login from './componentes/telas/login/Login';

// Telas do projeto
import Home from './componentes/telas/Home';
import Sobre from "./componentes/telas/Sobre";

// CRUD do projeto
import Cantor from "./componentes/telas/cantor/Cantor";
import Genero from "./componentes/telas/genero/Genero";
import Gravadora from "./componentes/telas/gravadora/Gravadora";
import Musica from "./componentes/telas/musica/Musica";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MenuPublico />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "sobre",
        element: <Sobre />
      },
      {
        path: "login",
        element: <Login />
      }
    ]
  },
  {
    path: "/Privado",
    element: <MenuPrivado />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "cantores",
        element: <Cantor />
      },
      {
        path: "generos",
        element: <Genero />
      },
      {
        path: "gravadoras",
        element: <Gravadora />
      },
      {
        path: "musicas",
        element: <Musica />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;