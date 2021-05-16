import React, { useState } from "react";
import manzana from "../../assets/img/manzana.png";
import canasta from "../../assets/img/canasta.png";
import leon from "../../assets/img/leon.png";
import chango from "../../assets/img/chango.png";
import jirafa from "../../assets/img/jirafa.png";
import elefante from "../../assets/img/elefante.png";
import croco from "../../assets/img/croco.png";
import cafe from "../../assets/img/cafe.png";
import pieza from "../../assets/img/fondo.png";
import piezas from "../../assets/img/fondo1.png";
import swal from "sweetalert";
import "./objetos.css";
import Container from "../Container";
import Memoria from "./Memoria/Memoria";

function Objetos() {
  const imagenes = [
    manzana,
    chango,
    jirafa,
    elefante,
    croco,
    canasta,
    cafe,
    piezas,
    pieza,
  ];
  const imgPregunta = [canasta, leon, chango, pieza, croco, piezas];
  const [aux, setAux] = useState(0);
  const preguntas = [
    "Toca la fruta que debe ir en la canasta",
    "Toca el animal del mismo color que el león",
    "Toca el animal del mismo color que el changuito",
    "Toca la pieza que corresponde",
  ];
  const [count, setCount] = useState(0);

  const contarFuncion = () => {
    swal({
      text: "Respuesta Correcta",
      icon: "success",
      value: true,
    });
    setAux(aux + 1);
  };

  return (
    <Container>
      {count == 1 ? (
        <div className="recolectar w-full text-center mb-10">
          <h2>{preguntas[aux]}</h2>
          <div className="flex justify-evenly">
            <div
              className="objetos p-3 shadow-2xl shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
              onClick={contarFuncion}
            >
              <img src={imagenes[aux]} className="w-40" />
            </div>
            <div
              className="objetos objetos p-3 shadow-2xl shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
              onClick={contarFuncion}
            >
              <img src={imagenes[aux + 1]} className="w-40" />
            </div>
          </div>
          <div className="pregunta flex justify-center">
            <img src={imgPregunta[aux]} className="w-60" />
          </div>
          <div className="flex justify-evenly">
            <div
              className="objetos objetos p-3 shadow-2xl shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
              onClick={contarFuncion}
            >
              <img src={imagenes[aux + 3]} className="w-40" />
            </div>
            <div
              className="objetos objetos p-3 shadow-2xl shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
              onClick={contarFuncion}
            >
              <img src={imagenes[aux + 4]} className="w-40" />
            </div>
          </div>
        </div>
      ) : count == 2 ? (
        <Memoria></Memoria>
      ) : (
        <div>
          <button onClick={() => setCount(1)}>Presiona</button>
          <button onClick={() => setCount(2)}>Memoria</button>
        </div>
      )}
      ;
    </Container>
  );
}

export default Objetos;
