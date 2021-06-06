import React from "react";
import AuthLogUser from "./AuthLogUser";
import Menu from "./Menu";

const ICONOS = {
  logo: "/assets/img/logo.png",
  inicio: "/assets/img/i-casa.png",
  juego: "/assets/img/i-estrella.png",
};

const Header = () => {
  const estilos = {
    a: "flex h-10 cursor-pointer hover:text-blue-500 text-2xl gap-1 justify-center",
    span: "flex items-center text-gray-600 font-black hover:text-yellow-400",
    navegacion: "flex justify-center",
  };
  return (
    <header className="flex flex-col justify-center items-center bg-gradient-to-b from-blue-800">
      <div className="mt-4">
        <img src={ICONOS["logo"]} className="w-64" />
        <div className="mov:hidden">
          <Menu></Menu>
        </div>
      </div>
      <nav className="w-screen my-4 mb-5 mx-10 sm:hidden">
        <div id="navegacion" className={estilos["navegacion"]}>
          <a href="/Home" className={estilos["a"]}>
            <img src={ICONOS["inicio"]} />
            <span className={estilos["span"]}>Inicio</span>
          </a>
          <a href="/juegos" className={estilos["a"]}>
            <img src={ICONOS["juego"]} />
            <span className={estilos["span"]}>Juegos</span>
          </a>
          <AuthLogUser estilos={estilos} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
