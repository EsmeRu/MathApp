import React from "react";
import contar from "../../assets/img/contar.png";
import sumar from "../../assets/img/sumar.png";
import objetos from "../../assets/img/objetos.png";
import Header from "../Header";
import "./home.css";
import { navigate } from "hookrouter";
import Container from "../Container";

const Home = () => {
  const handleGameOne = () => navigate("juego-contar"),
    handleGameTwo = () => navigate("juego-sumar"),
    handleGameThree = () => navigate("juego-objetos"),
    estilosHome = [
      "text-2xl text-center", //titulo de card
      "card p-7 shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110", //Color y tamaño de card
    ];

  return (
    <div className="bgHome">
      <Container>
        <div className="flex justify-center flex-wrap">
          <div
            className={`bg-red-400 ${estilosHome[1]} hover:bg-red-500`}
            onClick={handleGameOne}
          >
            <h2 className={estilosHome[0]}>Contar</h2>
            <img src={contar} />
          </div>
          <div
            className={`bg-blue-300 ${estilosHome[1]} hover:bg-blue-500`}
            onClick={handleGameTwo}
          >
            <h2 className={estilosHome[0]}>Sumar</h2>
            <img src={sumar} />
          </div>
          <div
            className={`bg-green-300 ${estilosHome[1]} hover:bg-green-500`}
            onClick={handleGameThree}
          >
            <h2 className={estilosHome[0]}>Identificar Objetos</h2>
            <img src={objetos} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
