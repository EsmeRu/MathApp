import MemoBlock from "./MemoBlock.js";
import "../objetos.css";
import React from "react";
import { navigate } from "hookrouter";

const IMGS = {
  fin: "/assets/img/fin-juego-sfondo.png",
};
const estiloBtnNext = [
  "flex justify-center items-center",
  "bg-red-400 rounded-full shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:bg-red-500 p-4 m-3",
];
const handleNav = () => navigate("/Home");
const TableroMemoria = ({
  animating,
  handleMemoClick,
  memoBlocks,
  finJuego
}) => {
  return (
    <main>
      {finJuego !== 12 ? (
        <div className="boardMemoria">
          {console.log(finJuego)}
          {memoBlocks.map((memoBlock, i) => {
            return (
              <MemoBlock
                key={`${i}_${memoBlock.emoji}`}
                animating={animating}
                handleMemoClick={handleMemoClick}
                memoBlock={memoBlock}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center flex-col items-center">
          <div className="m-10 w-2/4 items-center">
            <img src={IMGS["fin"]} alt="img-fin-juego" />
          </div>
          <div className={`${estiloBtnNext[0]}`}>
            <div className={`${estiloBtnNext[1]}`} onClick={handleNav}>
              Volver al inicio
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default TableroMemoria;
