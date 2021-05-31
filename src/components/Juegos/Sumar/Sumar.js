import React, { useState } from "react";
import Card from "./Card";
import Container from "../../Container";
import Tablero from "./TableroOperacion";
import "./operaciones.css";

const IMGS = {
  suma4_2: "/assets/img/operaciones/sumas/suma-cuatro-dos.png",
  suma3_3: "/assets/img/operaciones/sumas/suma-seis.png",
  suma1_2: "/assets/img/operaciones/sumas/suma-tres.png",
  fin: "/assets/img/fin-juego-sfondo.png",
};

function Sumar() {
  const estilo = [
    "w-40 h-40 bg-red-400 transition duration-500 ease-in-out hover:bg-red-500 transform hover:-translate-y-1 hover:scale-110",
    "flex justify-center items-center w-40 h-40 bg-red-400",
  ];

  return (
    <Container>
      <div className="w-full text-center mb-10">
        <h2>Sumar</h2>
        <div className="flex justify-center items-center">
          <div className="card p-20 bg-red-400 shadow-2xl">1111</div>
          <h2 className="">+</h2>
          <div className="card p-20 bg-red-400 shadow-2xl">3</div>
          <h2 className="">=</h2>
          <div className="card p-10 bg-red-400 shadow-2xl">
            <Tablero id="board" className="board w-40"></Tablero>
          </div>
        </div>

        <div className="flex justify-center">
          <Tablero id="board-1" className=" board gap-8	">
            <div className={estilo[0]}>
              <Card id="card-1" className={estilo[1]} draggable="true">
                <p id="res1">5</p>
              </Card>
            </div>
            <div className={estilo[0]}>
              <Card id="card-2" className={estilo[1]} draggable="true">
                <p id="res2">5</p>
              </Card>
            </div>
            <div className={estilo[0]}>
              <Card id="card-3" className={estilo[1]} draggable="true">
                <p id="res3">5</p>
              </Card>
            </div>
          </Tablero>
        </div>
      </div>
    </Container>
  );
}

export default Sumar;
