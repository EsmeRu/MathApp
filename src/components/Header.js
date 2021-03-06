import React from "react";
import AuthLogUser from "./AuthLogUser";
import Menu from "./Menu";
import { navigate } from "hookrouter";

const ICONOS = {
  logo: "/assets/img/logo.png",
  inicio: "/assets/img/i-casa.png",
  juego: "/assets/img/i-estrella.png",
  retroalimentacion: "/assets/img/retroalimentacion.png",
};

const Header = () => {
  const handleRetro = () => navigate("retroalimentacion");

  const estilos = {
    a: "flex h-10 cursor-pointer hover:text-blue-500 text-2xl gap-1 justify-center px-5",
    span: "flex items-center text-gray-600 font-black hover:text-yellow-400",
    navegacion: "flex justify-center",
  };
  return (
    <header className="flex flex-col justify-center items-center bg-gradient-to-b from-blue-800">
      <div className="mt-4">
        <a href="/Home">
          <img src={ICONOS["logo"]} alt="Logo-MathApp" className="w-64" />
        </a>
        <div className="mov:hidden">
          <Menu></Menu>
        </div>
      </div>
      <nav className="w-screen my-4 mb-5 mx-10 relative sm:hidden ">
        <div id="navegacion" className={estilos["navegacion"]}>
          <a href="/Home" className={estilos["a"]}>
            <img src={ICONOS["inicio"]} alt="Icono-inicio" />
            <span className={estilos["span"]}>Inicio</span>
          </a>
          <a href="/juegos" className={estilos["a"]}>
            <img src={ICONOS["juego"]} alt="Icono-juegos" />
            <span className={estilos["span"]}>Juegos</span>
          </a>
          <AuthLogUser estilos={estilos} />
        </div>
        <div className="retroalimentacion">
          <button className="retroalimentacion" onClick={handleRetro}>
            <img src={ICONOS["retroalimentacion"]} alt="Retroalimentacion" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
