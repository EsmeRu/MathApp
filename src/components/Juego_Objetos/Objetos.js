import React, { useState, useEffect } from "react";
import "./objetos.css";
import Container from "../Container";
import Memoria from "./Memoria/Memoria";
import swal from "@sweetalert/with-react";
import "firebase/firestore";
import "firebase/database";
import { navigate } from "hookrouter";

import { useFirestoreDocData, useFirestore, useDatabase } from "reactfire";

var vidasRestantes = 3;
const IMGS = {
  memoria: "/assets/img/memoria.png",
  presiona: "/assets/img/presiona.png",
  plantas: "/assets/img/juego-objetos/plantas/plantas.png",
  planta1: "/assets/img/juego-objetos/plantas/planta-1.png",
  planta2: "/assets/img/juego-objetos/plantas/planta-2.png",
  planta3: "/assets/img/juego-objetos/plantas/planta-3.png",
  planta4: "/assets/img/juego-objetos/plantas/planta-4.png",
  planta5: "/assets/img/juego-objetos/plantas/planta-5.png",
  planta6: "/assets/img/juego-objetos/plantas/planta-6.png",
  planta7: "/assets/img/juego-objetos/plantas/planta-7.png",
  planta8: "/assets/img/juego-objetos/plantas/planta-8.png",
  planta9: "/assets/img/juego-objetos/plantas/planta-9.png",
  planta10: "/assets/img/juego-objetos/plantas/planta-10.png",
  hoja1: "/assets/img/juego-objetos/plantas/hoja-1-9.png",
  hoja2: "/assets/img/juego-objetos/plantas/hoja-2-4.png",
  hoja3: "/assets/img/juego-objetos/plantas/hoja-3-7.png",
  hoja4: "/assets/img/juego-objetos/plantas/hoja-5.png",
  hoja5: "/assets/img/juego-objetos/plantas/hoja-6-8.png",
  maseta1: "/assets/img/juego-objetos/plantas/maseta-1-5-8-10.png",
  maseta2: "/assets/img/juego-objetos/plantas/maseta-2-3-9.png",
  maseta3: "/assets/img/juego-objetos/plantas/maseta-4-6-7.png",
  gallinas: "/assets/img/juego-objetos/fam-gallinas.png",
  pollito: "/assets/img/juego-objetos/pollito.png",
  borregos: "/assets/img/juego-objetos/fam-borregos.png",
  borreguito: "/assets/img/juego-objetos/borreguito.png",
  vacas: "/assets/img/juego-objetos/fam-vacas.png",
  becerro: "/assets/img/juego-objetos/vaquita.png",
  cerdos: "/assets/img/juego-objetos/fam-cerdos.png",
  cerdito: "/assets/img/juego-objetos/cerdito.png",
  animales: "/assets/img/animales/animales.png",
  oso: "/assets/img/animales/oso.png",
  jirafa: "/assets/img/animales/jirafa.png",
  elefante: "/assets/img/animales/elefante.png",
  leon: "/assets/img/animales/leon.png",
  zorro: "/assets/img/animales/zorro.png",
  chango: "/assets/img/animales/chango.png",
  michis: "/assets/img/contar/michis-ocho.png",
  michidormido: "/assets/img/contar/gato-dormido.png",
  michi: "/assets/img/contar/gato.png",
  michi1: "/assets/img/contar/gato-1.png",
  michi2: "/assets/img/contar/gato-2.png",
  fin: "/assets/img/fin-juego-sfondo.png",
  vidas: "/assets/img/lifes-icons.png",
};

function Objetos() {
  const preguntasRef = useFirestore().collection("juegos").doc("objetos");

  const { status, data } = useFirestoreDocData(preguntasRef);
  const [aux, setAux] = useState(0);
  const [count, setCount] = useState(0);
  const handleNav = () => navigate("/");

  const dataBaseKey = localStorage.getItem("key");
  const [puntos, setPuntos] = useState(0);
  const [puntosLocales, setPuntosLocales] = useState(0);


  var userEmail = localStorage.getItem("Email").split("@").toString();
  userEmail = userEmail.split(".").toString();
  userEmail = userEmail.split("-").toString();
  userEmail = userEmail.split("_").toString();

  const puntosRef = useDatabase().ref(dataBaseKey).child("puntosObjetos");

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
    setPuntosLocales(puntosLocales + 50);
    puntosRef.set(nuevosPuntos);
  };

  const perderVida = () => {
    const vidaPerida = document.getElementById("vida" + vidasRestantes);
    vidaPerida.parentElement.removeChild(vidaPerida);
    vidasRestantes--;
    if (vidasRestantes === 0) {
      swal({
        title: "Oh no... :(",
        text: "Has perdido todas tus vidas\n¿Te gustaria intentarlo de nuevo?",
        icon: "error",
        buttons: ["No", "Si"],
      }).then((respuesta) => {
        if (respuesta) {
          swal({
            title: "Aquí vamos de nuevo :)",
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
        content: <div>Ups! Intenta de nuevo</div>,
        icon: "warning",
        value: false,
      });
    }
  };

  useEffect(() => {
    if (puntosLocales === null) {
      setPuntosLocales(0);
    }
    obtenerPuntos();
  });

  const contarFuncion = (index) => {
    if (data.presionar[aux].respuestas[index].correcto) {
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
  };

  return (
    <Container>
      {count === 1 ? (
        <div className="w-screen h-screen">
          {status !== "success" ? (
            <div className="flex flex-col items-center">
              Espera un momento
              <div className="loader"></div>
            </div>
          ) : data?.presionar?.length > aux ? (
            <div className="flex flex-col gap-5">
              <div className="puntuacion text-center flex my-3 justify-center px-7 sm:bg-gradient-to-t sm:from-gray-50 sticky top-0">
                <h4 className="mr-10 pt-1 font-black">
                  {" "}
                  Puntos:{" "}
                  <span className="text-yellow-500">{puntosLocales}</span>
                </h4>
                <div
                  className="flex flex-wrap my-1 justify-center"
                  name="divVidas"
                >
                  <h4 className="mr-3 font-black"> Vidas: </h4>
                  <div className="flex justify-center gap-2">
                    <a className="mov:h-12 mov:w-12 mov:mr-5" id="vida1">
                      <img src={IMGS["vidas"]} className="icon sm:w-8 sm:h-8" />
                    </a>
                    <a className="mov:h-12 mov:w-12 mov:mr-5" id="vida2">
                      <img src={IMGS["vidas"]} className="icon sm:w-8 sm:h-8" />
                    </a>
                    <a className="mov:h-12 mov:w-12" id="vida3">
                      <img src={IMGS["vidas"]} className="icon sm:w-8 sm:h-8" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="recolectar w-full text-center mb-10">
                <h2>{data.presionar[aux].pregunta}</h2>
                <div className="pregunta flex justify-center mb-8">
                  <img src={IMGS[data.presionar[aux].img]} className="w-vh" />
                </div>
                <div className="flex justify-center gap-4">
                  {data.presionar[aux].respuestas.map((r, index) => (
                    <div
                      className="p-3 shadow-2xl shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                      onClick={() => contarFuncion(index)}
                      key={index}
                    >
                      <img src={IMGS[r.img]} className="w-40" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-center">
                <div className="m-10 max-w-screen-md items-center">
                  <img src={IMGS["fin"]}></img>
                  <h3 className="mr-10 pt-4 font-black text-center">
                    {" "}
                    Puntaje:{" "}
                    <span className="text-yellow-500">{puntosLocales}</span>
                  </h3>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : count === 2 ? (
        <Memoria></Memoria>
      ) : (
        <div className="flex gap-10 m-10 flex-wrap justify-center">
          <button
            className="p-3 shadow-2xl shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            onClick={() => setCount(1)}
          >
            <img src={IMGS["presiona"]} alt="juego memoria" />
            Presiona
          </button>
          <button
            className="p-3 shadow-2xl shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            onClick={() => setCount(2)}
          >
            <img src={IMGS["memoria"]} alt="juego memoria" />
            Memoria
          </button>
        </div>
      )}
      ;
    </Container>
  );
}

export default Objetos;
