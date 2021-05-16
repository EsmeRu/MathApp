import MemoBlock from "./MemoBlock.js";
import "../objetos.css";

import React from "react";

const TableroMemoria = ({ animating, handleMemoClick, memoBlocks }) => {
  return (
    <main className="boardMemoria">
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
    </main>
  );
};

export default TableroMemoria;
