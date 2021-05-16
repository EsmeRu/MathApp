import React, { useState } from "react";
import Container from "../../Container";
import "./juegoContar.css";
import swal from "sweetalert";
import uno from "../../../assets/img/a.png";
import pieza from "../../../assets/img/fondo.png";
import dos from "../../../assets/img/dos.png";
import tres from "../../../assets/img/contar.png";
import canasta from "../../../assets/img/canasta.png";
import Sketch from "react-p5";

const Contar = () => {
  const preguntas = [
    "¿Cuantos animales hay?",
    "¿Cuantas letras hay?",
    "¿Cuantos objetos hay?",
    "Dibuja sobre la línea",
    "Cuenta las piezas",
  ];
  const imagenes = [canasta, uno, dos, tres, pieza];
  const [aux, setAux] = useState(0);

  const contarFuncion = () => {
    swal({
      text: "Respuesta Correcta",
      icon: "success",
      value: true,
    });
    setAux(aux + 1);
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth / 2, p5.windowWidth / 4).parent(
      canvasParentRef
    );
  };

  const draw = (p5) => {
    if (p5.mouseIsPressed) {
      p5.fill(0);
      p5.ellipse(p5.mouseX, p5.mouseY, 20, 20);
    }
  };

  return (
    <Container>
      <div className="contar">
        <div className="pregunta w-full text-center">
          <h2 id="tituloContar">{preguntas[aux]}</h2>
        </div>
        <div className="img w-full flex justify-center my-7 h-60">
          {aux == 3 ? (
            <div className="flex flex-col">
              <Sketch className="dibujo" setup={setup} draw={draw} />
              <button
                className="card p-8 bg-green-600 shadow-2xl shadow-2xl transition duration-500 ease-in-out hover:bg-green-500 transform hover:-translate-y-1 hover:scale-110"
                onClick={contarFuncion}
              >
                Revisar
              </button>
            </div>
          ) : (
            <img src={imagenes[aux]} className="img-pregunta" />
          )}
        </div>

        {aux == 3 ? (
          <></>
        ) : (
          <div className="respuesta w-full text-center flex justify-center flex-wrap">
            <button
              id="res1"
              className="card p-8 bg-red-400 shadow-2xl shadow-2xl transition duration-500 ease-in-out hover:bg-red-500 transform hover:-translate-y-1 hover:scale-110"
              onClick={contarFuncion}
            >
              <h1>{aux}</h1>
            </button>
            <button
              id="res2"
              className="card p-7 bg-blue-300 shadow-2xl shadow-2xl transition duration-500 ease-in-out hover:bg-blue-500 transform hover:-translate-y-1 hover:scale-110"
              onClick={contarFuncion}
            >
              <h1>{aux + 5}</h1>
            </button>
            <button
              id="res3"
              className="card p-7 bg-green-300 shadow-2xl transition duration-500 ease-in-out hover:bg-green-500 transform hover:-translate-y-1 hover:scale-110"
              onClick={contarFuncion}
            >
              <h1>{aux + 4}</h1>
            </button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Contar;

// const Contar = () => {
//   const aux = 50;
//   let img;
//   const setup = (p5, canvasParentRef) => {
//     p5.createCanvas(p5.windowWidth - aux, p5.windowHeight - aux).parent(
//       canvasParentRef
//     );
//   };

//   const draw = (p5) => {};

//   const handleWindowResize = (p5) =>
//     p5.resizeCanvas(p5.windowWidth - aux, p5.windowHeight - aux);

//   /**Container manda llamar el Header */
//   return (
//     <Container>
//       <Sketch setup={setup} draw={draw} windowResized={handleWindowResize} />
//     </Container>
//   );
// };

// export default Contar;
