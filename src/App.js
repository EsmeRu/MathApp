import React from "react";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import JuegoContar from "./components/Juego_Contar/Contar.js";
import JuegoSumar from "./components/Juego_Sumar/Sumar.js";
import JuegObjetos from "./components/Juego_Objetos/Objetos.js";
import Juegos from "./components/Juegos/Juegos.js";
import { useRoutes } from "hookrouter";

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
{
  /* <Router history={history}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
        <Route path="/juego-contar" component={JuegoContar} />
        <Route path="/juego-sumar" component={JuegoSumar} />
        <Route path="/juego-objetos" component={JuegoObjetos} />
      </Switch>
    </Router> */
}
