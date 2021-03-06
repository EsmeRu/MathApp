import React from "react";
import Header from "../Header";
import { navigate } from "hookrouter";
import "./juegos.css";

const IMGS = {
  contar: "/assets/img/contar.png",
  sumar: "/assets/img/sumar.png",
  objetos: "/assets/img/objetos.png",
};

function Juegos() {
  const handleGameOne = () => navigate("juego-contar");
  const handleGameTwo = () => navigate("juego-sumar");
  const handleGameThree = () => navigate("juego-objetos");
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center">
        <div className="card p-7 bg-red-400 shadow-2xl min-w-full mb-important p-10">
          <h2 className="text-5xl font-bold">Contar</h2>
          <img src={IMGS["contar"]} alt="img-contar" />
          <div className="text-lg text-center">
            Contar, reconocer y escribir número del 0 al 20.
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-32"
            onClick={handleGameOne}
          >
            Jugar
          </button>
        </div>
        <div className="card p-7 bg-blue-300 shadow-2xl min-w-full m-important p-10">
          <h2 className="text-5xl font-bold">Sumar</h2>
          <img src={IMGS["sumar"]} alt="img-sumar" />
          <div className="text-lg text-center">
            Sumar y restar números del 0 al 10
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-32"
            onClick={handleGameTwo}
          >
            Jugar
          </button>
        </div>
        <div className="card p-7 bg-green-400 shadow-2xl min-w-full m-important p-10">
          <h2 className="text-5xl font-bold text-center">
            Identificar Objetos
          </h2>
          <img src={IMGS["objetos"]} alt="img-objetos" />
          <div className="text-lg text-center">
            Organizar objetos en grupos que compartan similitudes
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-32"
            onClick={handleGameThree}
          >
            Jugar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Juegos;
