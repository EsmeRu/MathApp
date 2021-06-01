import React from "react";
import AuthLogUser from "./AuthLogUser";

const ICONOS = {
  logo: "/assets/img/logo.png",
  inicio: "/assets/img/i-casa.png",
  juego: "/assets/img/i-estrella.png",
  menu: "/assets/img/i-menu.png",
};

const Menu = ({ fixed }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const estilos = {
    a: "flex h-14 cursor-pointer text-2xl gap-3 p-1",
    span: "flex items-center text-gray-100 font-black hover:text-yellow-400",
    navegacion: "flex flex-col list-none my-1 gap-5 w-60 m-10 pb-10",
    img: "",
  };
  return (
    <>
      <div className="flex flex-wrap py-2 justify-center">
        <div className="flex justify-center">
          <nav className="relative flex flex-wrap items-center rounded">
            <div className="container mx-auto flex flex-wrap">
              <div className="w-full relative flex mx-3 my-3">
                <button
                  className="text-white cursor-pointer text-xl leading-none px-3 flex flex-col items-center gap-1 py-1 border border-solid border-transparent bg-transparent block outline-none focus:outline-none"
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <span className="font-black">MENÚ</span>
                  <img src={ICONOS["menu"]} alt="icono menu hamburguesa" />
                </button>
              </div>
              <div
                className={
                  "flex-grow items-center justify-center" +
                  (menuOpen ? "flex w-screen" : " hidden")
                }
              >
                <ul id="navegacion" className={estilos["navegacion"]}>
                  <li className="">
                    <a href="/" className={estilos["a"]}>
                      <img src={ICONOS["inicio"]} className={estilos["img"]} />
                      <span className={estilos["span"]}>Inicio</span>
                    </a>
                  </li>
                  <li className="">
                    <a href="/juegos" className={estilos["a"]}>
                      <img src={ICONOS["juego"]} className={estilos["img"]} />
                      <span className={estilos["span"]}>Juegos</span>
                    </a>
                  </li>
                  <li className="">
                    <AuthLogUser estilos={estilos} />
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};
export default Menu;
