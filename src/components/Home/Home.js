import React, { useEffect, useState } from "react";
import { navigate } from "hookrouter";
import Container from "../Container";
import { useFirebaseApp } from "reactfire";

const IMGS = {
  contar: "/assets/img/contar.png",
  sumar: "/assets/img/sumar.png",
  objetos: "/assets/img/objetos.png",
};

const Home = () => {
  const [user, setUser] = useState(localStorage.getItem("Email"));
  const goToLogin = () => navigate("/");
  const firebase = useFirebaseApp();

  const handleGameOne = () => navigate("juego-contar"),
    handleGameTwo = () => navigate("juego-sumar"),
    handleGameThree = () => navigate("juego-objetos"),
    estilosHome = [
      "text-2xl text-center", //titulo de card
      "card p-7 shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110", //Color y tamaño de card
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
          <div className="flex justify-center flex-wrap">
            <div
              className={`bg-red-400 ${estilosHome[1]} hover:bg-red-500`}
              onClick={handleGameOne}
            >
              <h2 className={estilosHome[0]}>Contar</h2>
              <img src={IMGS["contar"]} alt="img-juego-contar" />
            </div>
            <div
              className={`bg-blue-300 ${estilosHome[1]} hover:bg-blue-500`}
              onClick={handleGameTwo}
            >
              <h2 className={estilosHome[0]}>Sumar</h2>
              <img src={IMGS["sumar"]} alt="img-juego-sumar" />
            </div>
            <div
              className={`bg-green-300 ${estilosHome[1]} hover:bg-green-500`}
              onClick={handleGameThree}
            >
              <h2 className={estilosHome[0]}>Identificar Objetos</h2>
              <img src={IMGS["objetos"]} alt="img-juego-objetos" />
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Home;
