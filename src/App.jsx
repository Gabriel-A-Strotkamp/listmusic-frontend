{
    path: "/Privado",
    element: <MenuPrivado />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "cantores",
        element: <Cantor />,
      },
      {
        path: "generos",
        element: <Genero />,
      },
      {
        path: "gravadoras",
        element: <Gravadora />,
      },
      {
        path: "musicas",
        element: <Musica />,
      }
    ]
}