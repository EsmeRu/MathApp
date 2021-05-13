import React from "react";
import contar from "../../assets/img/contar.png";
import sumar from "../../assets/img/sumar.png";
import objetos from "../../assets/img/objetos.png";
import Header from "../Header";
import "./home.css";
import { navigate } from "hookrouter";

const Home = () => {
  const handleGameOne = () => navigate("juego-contar");
  const handleGameTwo = () => navigate("juego-sumar");
  const handleGameThree = () => navigate("juego-objetos");
  return (
    <div className="bgHome">
      <Header />
      <main className="flex justify-center flex-wrap">
        <div
          className="card p-7 bg-red-400 shadow-2xl shadow-2xl transition duration-500 ease-in-out hover:bg-red-500 transform hover:-translate-y-1 hover:scale-110"
          onClick={handleGameOne}
        >
          <h2 className="text-2xl">Contar</h2>
          <img src={contar} />
        </div>
        <div
          className="card p-7 bg-blue-300 shadow-2xl shadow-2xl transition duration-500 ease-in-out hover:bg-blue-500 transform hover:-translate-y-1 hover:scale-110"
          onClick={handleGameTwo}
        >
          <h2 className="text-2xl">Sumar</h2>
          <img src={sumar} />
        </div>
        <div
          className="card p-7 bg-green-300 shadow-2xl transition duration-500 ease-in-out hover:bg-green-500 transform hover:-translate-y-1 hover:scale-110"
          onClick={handleGameThree}
        >
          <h2 className="text-2xl text-center">Identificar Objetos</h2>
          <img src={objetos} />
        </div>
      </main>
    </div>
  );
};

export default Home;
