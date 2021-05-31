import MemoBlock from "./MemoBlock.js";
import "../objetos.css";

import React from "react";

const IMGS = {
  fin: "/assets/img/fin-juego-sfondo.png",
};

const TableroMemoria = ({
  animating,
  handleMemoClick,
  memoBlocks,
  finJuego,
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
        <div className="flex justify-center">
          <div className="m-10 max-w-screen-md items-center">
            <img src={IMGS["fin"]}></img>
          </div>
        </div>
      )}
    </main>
  );
};

export default TableroMemoria;
