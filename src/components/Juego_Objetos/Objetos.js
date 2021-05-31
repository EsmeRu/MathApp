import React, { useState, useEffect } from "react";
import "./objetos.css";
import Container from "../Container";
import Memoria from "./Memoria/Memoria";
import swal from "@sweetalert/with-react";
import "firebase/firestore";
import "firebase/database";

import { useFirestoreDocData, useFirestore, useDatabase } from "reactfire";

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
};

function Objetos() {
  const preguntasRef = useFirestore().collection("juegos").doc("objetos");

  const { status, data } = useFirestoreDocData(preguntasRef);
  const [aux, setAux] = useState(0);
  const [count, setCount] = useState(0);

  const dataBaseKey = localStorage.getItem("key");
  const [puntos, setPuntos] = useState(0);

  var userEmail = localStorage.getItem("Email").split("@").toString();
  userEmail = userEmail.split(".").toString();
  userEmail = userEmail.split("-").toString();
  userEmail = userEmail.split("_").toString();

  const puntosRef = useDatabase().ref(dataBaseKey).child('puntosObjetos');

  const obtenerPuntos = () => {
    puntosRef.on('value', puntaje => {
      if (puntaje != null) {
        setPuntos(puntaje.val())
      }
    })
  };

  const sumarPuntos = () => {
    var nuevosPuntos = puntos + 50;
    setPuntos(nuevosPuntos);
    puntosRef.set(nuevosPuntos);
  };

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
      swal({
        content: <div>Ups! Intenta de nuevo</div>,
        icon: "warning",
        value: false,
      });
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
            <div>
              <div className="puntuacion text-center">
                <h2 onChange={obtenerPuntos}> {puntos} puntos</h2>
              </div>
              <div className="recolectar w-full text-center mb-10">
                <h2>{data.presionar[aux].pregunta}</h2>
                <div className="pregunta flex justify-center">
                  <img src={IMGS[data.presionar[aux].img]} className="w-60" />
                </div>
                <div className="flex justify-evenly">
                  {data.presionar[aux].respuestas.map((r, index) => (
                    <div
                      className="objetos p-3 shadow-2xl shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
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
