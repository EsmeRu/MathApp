import React from "react";
import logo from "../assets/img/logo.png";
import inicio from "../assets/img/i-casa.png";
import juego from "../assets/img/i-estrella.png";

import ajustes from "../assets/img/i-nube.png";
import { useFirebaseApp } from 'reactfire';
import AuthLogUser from "./AuthLogUser";

const Header = () => {


  return (
    <header className="flex flex-col justify-center items-center bg-gradient-to-b from-yellow-500">
      <div className="mt-4">
        <img src={logo} className="w-24" />
        <h1 className="text-3xl">Mate +</h1>
      </div>
      <nav className="w-screen mb-5">
        <div className="flex my-4 justify-center">
          <a
            href="/"
            className="flex h-7 cursor-pointer hover:text-blue-500 text-xl"
          >
            <img src={inicio} className="icon p-1" />
            Inicio
          </a>
          <a
            href="/juegos"
            className="flex h-7 cursor-pointer hover:text-blue-500 text-xl"
          >
            <img src={juego} className="icon p-1" />
            Juegos
          </a>
          <a
            onClick={() => console.log("object")}
            className="flex h-7 cursor-pointer hover:text-blue-500 text-xl"
          >
            <img src={ajustes} className="icon p-1" />
            Ajustes
          </a>

          <AuthLogUser />

        </div>
      </nav>
    </header>
  );
};

export default Header;
