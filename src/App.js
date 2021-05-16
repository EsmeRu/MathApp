import React from "react";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
// import JuegoContar from "./components/Juego_Contar/MenuContar.js";
import JuegoContar from "./components/Juegos/Contar/Contar.js";

import JuegoSumar from "./components/Juegos/Sumar/Sumar.js";
import JuegObjetos from "./components/Juego_Objetos/Objetos.js";
import Juegos from "./components/Juegos/Juegos.js";
import { useRoutes } from "hookrouter";
import "./App.css";

export const routes = {
  "/": () => <Home />,
  "/login": () => <Login />,
  "/juego-contar": () => <JuegoContar />,
  "/juego-sumar": () => <JuegoSumar />,
  "/juego-objetos": () => <JuegObjetos />,
  "/juegos": () => <Juegos />,
};

const App = () => {
  const routeResult = useRoutes(routes);

  return routeResult;
};

export default App;
