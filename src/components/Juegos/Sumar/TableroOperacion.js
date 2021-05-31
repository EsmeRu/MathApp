import React, { useState, useEffect } from "react";
import swal from "@sweetalert/with-react";
import { useFirestoreDocData, useFirestore } from "reactfire";

const Tablero = ({ children, id, className, state = [] }) => {
  const preguntasRef = useFirestore().collection("juegos").doc("operaciones");

  const { status, data } = useFirestoreDocData(preguntasRef);
  const [aux, setAux] = state;

  const drop = (e) => {
    e.preventDefault();

    const card_id = e.dataTransfer.getData("card_id");
    const card = document.getElementById(card_id);
    const tablero = document.getElementById("board-1");

    if (id === "board") {
      if (data.suma[aux].respuesta === parseInt(card.textContent)) {
        swal({
          content: <div>Respuesta Correcta</div>,
          icon: "success",
          value: true,
        });

        setAux(aux + 1);
      } else {
        swal({
          content: <div>Ups! Intenta de nuevo</div>,
          icon: "warning",
          value: false,
        });
      }
    }

    // e.target.appendChild(card);
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className={className} id={id} onDrop={drop} onDragOver={dragOver}>
      {children}
    </div>
  );
};

export default Tablero;
