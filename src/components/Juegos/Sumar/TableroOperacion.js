import React from "react";
import swal from "sweetalert";

const Tablero = ({ children, id, className }) => {
  const drop = (e) => {
    e.preventDefault();

    const card_id = e.dataTransfer.getData("card_id");

    if (id === "board") {
      console.log("correcto");
      swal({
        text: "Respuesta Correcta",
        icon: "success",
        value: true,
      });
    }
    const card = document.getElementById(card_id);

    e.target.appendChild(card);
    console.log(e.target.appendChild(card));
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
