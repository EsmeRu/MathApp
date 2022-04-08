import React, { useState, useEffect } from "react";
import swal from "@sweetalert/with-react";
import "firebase/database";
import { useFirestoreDocData, useFirestore, useDatabase } from "reactfire";
import { navigate } from "hookrouter";

var vidasRestantes = 3;
var newIntent = 1;

const Tablero = ({ children, id, className, count, state = [] }) => {
  const preguntasRef = useFirestore().collection("juegos").doc("operaciones");

  const { status, data } = useFirestoreDocData(preguntasRef);
  const [aux, setAux] = state;
  const dataBaseKey = localStorage.getItem("key");
  const [puntos, setPuntos] = useState(0);
  var cantidadJuegos = 0;

  var userEmail = localStorage.getItem("Email").split("@").toString();
  userEmail = userEmail.split(".").toString();
  userEmail = userEmail.split("-").toString();
  userEmail = userEmail.split("_").toString();

  const puntosRef = useDatabase().ref(dataBaseKey).child("puntosSumar");
  const cantRef = useDatabase().ref(dataBaseKey).child("cantJuegosSumar");

  const handleNav = () => navigate("/Home");

  const obtenerPuntos = () => {
    puntosRef.on("value", (puntaje) => {
      if (puntaje != null) {
        setPuntos(puntaje.val());
      }
    });
  };

  const obtenerCantidad = () => {    
    cantRef.on("value", (cantidad) => {
      if (cantidad != null) {
        cantidadJuegos = cantidad.val();
      }
    });
  }

  const sumarPuntos = () => {
    var nuevosPuntos = puntos + 50;
    setPuntos(nuevosPuntos);
    puntosRef.set(nuevosPuntos);
    if(newIntent != null) {      
      cantRef.set(cantidadJuegos+1);
      newIntent = null;
      console.log(newIntent);
    }
  };

  const perderVida = () => {
    if(newIntent != null) {      
      cantRef.set(cantidadJuegos+1);
      newIntent = null;
      console.log(newIntent);
    }
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

    if (id === "board") {
      if (count === 1) {
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
      } else {
        if (data.resta[aux].respuesta === parseInt(card.textContent)) {
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
    }

    // e.target.appendChild(card);
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    obtenerPuntos();
    obtenerCantidad();
  });

  return (
    <div className={className} id={id} onDrop={drop} onDragOver={dragOver}>
      {children}
    </div>
  );
};

export default Tablero;
