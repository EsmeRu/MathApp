// TODO: añadir un nuevo botón que te llevará al nuevo módulo.

import React, { useEffect, useState } from "react";
import { navigate } from "hookrouter";
import Container from "../Container";
import { useFirebaseApp } from "reactfire";
import ClosingAlert from "@material-tailwind/react/ClosingAlert";

const IMGS = {
  contar: "/assets/img/play.png",
  sumar: "/assets/img/sumar.png",
  objetos: "/assets/img/objetos.png",
};

const Home = () => {
  const [user, setUser] = useState(localStorage.getItem("Email"));
  const goToLogin = () => navigate("/");
  const firebase = useFirebaseApp();

  const handlePlayGame = () => navigate("juego-contar"),
    estilosHome = [
      "text-2xl text-center", //titulo de card
      "mt-20 w-80 rounded-full shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110", //Color y tamaño de card
    ];

  useEffect(() => {
    setUser(localStorage.getItem("Email"));
  }, []);

  return (
    <>
      {user === null ? (
        <>{goToLogin()}</>
      ) : (
        <Container>
          <div className="inicio">
            <div className="w-2/4">
              <ClosingAlert color="lightGreen">
                <p className="iniciarJuego">
                  Para iniciar el juego presiona el botón.
                </p>
              </ClosingAlert>
            </div>
          </div>

          <div className="flex justify-center">
            <div
              className={`bg-zinc-100 ${estilosHome[1]} hover:bg-zinc-200`}
              onClick={handlePlayGame}
            >
              <img src={IMGS["contar"]} alt="Empezar juegos" />
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Home;
