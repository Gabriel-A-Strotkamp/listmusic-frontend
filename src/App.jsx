import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Componentes base
import Menu from './componentes/Menu'
import Home from './componentes/telas/Home'
import Sobre from "./componentes/telas/Sobre";

// CRUD do projeto
import Cantor from "./componentes/telas/cantor/Cantor";
import Genero from "./componentes/telas/genero/Genero";
import Gravadora from "./componentes/telas/gravadora/Gravadora";
import Musica from "./componentes/telas/musica/Musica";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/cantores",
        element: <Cantor />,
      },
      {
        path: "/generos",
        element: <Genero />,
      },
      {
        path: "/gravadoras",
        element: <Gravadora />,
      },
      {
        path: "/musicas",
        element: <Musica />,
      },
      {
        path: "/sobre",
        element: <Sobre />,
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;