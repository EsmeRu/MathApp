import React from "react";
import { useFirebaseApp } from "reactfire";
import AuthLogUser from "./AuthLogUser";

const ICONOS = {
  logo: "/assets/img/logo.png",
  inicio: "/assets/img/i-casa.png",
  juego: "/assets/img/i-estrella.png",
};

const Header = () => {
  return (
    <header className="flex flex-col justify-center items-center bg-gradient-to-b from-blue-800">
      <div className="mt-4">
        <img src={ICONOS["logo"]} className="w-64" />
      </div>
      <nav className="w-screen mb-5">
        <div className="flex my-4 justify-center">
          <a
            href="/"
            className="flex h-7 cursor-pointer hover:text-blue-500 text-xl"
          >
            <img src={ICONOS["inicio"]} className="icon p-1" />
            Inicio
          </a>
          <a
            href="/juegos"
            className="flex h-7 cursor-pointer hover:text-blue-500 text-xl"
          >
            <img src={ICONOS["juego"]} className="icon p-1" />
            Juegos
          </a>

          <AuthLogUser />
        </div>
      </nav>
    </header>
  );
};

export default Header;
