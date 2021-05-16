/** Vista principal del juego para Contar */
import React from "react";
import Sketch from "react-p5";
import Container from "../../Container";
import "./juegoContar.css";

const MenuContar = () => {
  // const setup = (p5, canvasParentRef) => {};
  // const draw = (p5) => {};
  // const handleWindowResize = (p5) =>
  //   p5.resizeCanvas(p5.windowWidth - aux, p5.windowHeight - aux);

  /**Container manda llamar el Header */
  return (
    <Container>
      {/* <Sketch setup={setup} draw={draw} windowResized={handleWindowResize} /> */}

      {Array.from(Array(20)).map((_, index) => (
        <button
          className="btn-num"
          key={index}
          onClick={() => console.log("/juego-contar/" + (index + 1))}
        >
          {index + 1}
        </button>
      ))}
    </Container>
  );
};

export default MenuContar;
