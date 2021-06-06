import React, { useState, useEffect } from "react";
import swal from "@sweetalert/with-react";
import "firebase/database";
import { useFirestoreDocData, useFirestore, useDatabase } from "reactfire";
import { navigate } from "hookrouter";

var vidasRestantes = 3;

const Tablero = ({ children, id, className, state = [] }) => {
  const preguntasRef = useFirestore().collection("juegos").doc("operaciones");

  const { status, data } = useFirestoreDocData(preguntasRef);
  const [aux, setAux] = state;
  const dataBaseKey = localStorage.getItem("key");
  const [puntos, setPuntos] = useState(0);

  var userEmail = localStorage.getItem("Email").split("@").toString();
  userEmail = userEmail.split(".").toString();
  userEmail = userEmail.split("-").toString();
  userEmail = userEmail.split("_").toString();

  const puntosRef = useDatabase().ref(dataBaseKey).child("puntosSumar");

  const handleNav = () => navigate("/");

  const obtenerPuntos = () => {
    puntosRef.on("value", (puntaje) => {
      if (puntaje != null) {
        setPuntos(puntaje.val());
      }
    });
  };

  const sumarPuntos = () => {
    var nuevosPuntos = puntos + 50;
    setPuntos(nuevosPuntos);
    puntosRef.set(nuevosPuntos);
  };

  const perderVida = () => {
    const vidaPerida = document.getElementById("vida" + vidasRestantes);
    vidaPerida.parentElement.removeChild(vidaPerida);
    vidasRestantes--;
    if (vidasRestantes === 0) {
      swal({
        title: "¡Oh no...!",
        text: "Has perdido todas tus vidas\n¿Te gustaria intentarlo de nuevo?",
        icon: "error",
        buttons: ["No", "Si"],
      }).then((respuesta) => {
        if (respuesta) {
          swal({
            title: "Aquí vamos de nuevo",
            timer: "3000",
          });
          window.location.reload();
        } else {
          swal({
            title: "Has regresado a la pantalla de inicio",
            timer: "2000",
          });
          handleNav();
        }
      });
    } else {
      swal({
        content: <div>¡Ups! Intenta de nuevo</div>,
        icon: "warning",
        value: false,
      });
    }
  };

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
        sumarPuntos();
      } else {
        perderVida();
      }
    }

    // e.target.appendChild(card);
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    obtenerPuntos();
  });

  return (
    <div className={className} id={id} onDrop={drop} onDragOver={dragOver}>
      {children}
    </div>
  );
};

export default Tablero;
