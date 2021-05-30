import React from "react";
import swal from "sweetalert";

const Tablero = ({ children, id, className }) => {
  const drop = (e) => {
    e.preventDefault();

    const card_id = e.dataTransfer.getData("card_id");

    if (card_id === "card-2") {
      console.log("correcto");
      swal({
        text: "Respuesta Correcta",
        icon: "success",
        value: true,
      });
    }
    const card = document.getElementById(card_id);

    card.style.display = "flex";

    e.target.appendChild(card);
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
