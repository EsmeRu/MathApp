import React, { Component, useEffect, useState } from "react";
import Container from "../../Container";
import "./juegoContar.css";
import swal from "@sweetalert/with-react";
import Sketch from "react-p5";
import "firebase/firestore";
import "firebase/database";
import { navigate } from "hookrouter";

import { useFirestoreDocData, useFirestore, useDatabase } from "reactfire";

const IMGS = {
  cero: "/assets/img/numeros/num-cero.png",
  uno: "/assets/img/letras/letras-abc.png",
  dos: "/assets/img/frutas/frutas-dos.png",
  tres: "/assets/img/contar.png",
  cuatro: "/assets/img/objetos/canasta.png",
  cinco: "/assets/img/personas/niños-cinco.png",
  seis: "/assets/img/contar/contar-papeleria.png",
  siete: "/assets/img/contar/contar-papeleria.png",
  ocho: "/assets/img/contar/michis-ocho.png",
  nueve: "/assets/img/contar/contar-animales-granja.png",
  diez: "/assets/img/contar/contar-animales-granja.png",
  once: "/assets/img/contar/contar-animales-granja.png",
  doce: "/assets/img/contar/contar-varios.png",
  trece: "/assets/img/contar/contar-varios.png",
  catorce: "/assets/img/contar/gatos-16.png",
  quince: "/assets/img/contar/contar-manos-estrella.png",
  dieciseis: "/assets/img/contar/contar-manos-estrella.png",
  diecisiete: "/assets/img/",
  dieciocho: "/assets/img/animales/animales-18.png",
  diecinueve: "/assets/img/contar/contar-animales-granja.png",
  veinte: "/assets/img/punteado20.png",
  fin: "/assets/img/fin-juego-sfondo.png",
  vidas: "/assets/img/lifes-icons.png",
};

const Contar = () => {
  const preguntasRef = useFirestore().collection("juegos").doc("contar");

  const { status, data } = useFirestoreDocData(preguntasRef);
  const [buttons, setButtons] = useState([]);
  const [aux, setAux] = useState(0);
  const dataBaseKey = localStorage.getItem("key");
  const [puntos, setPuntos] = useState(0);
  const handleNav = () => navigate("/");

  var vidasRestantes = 3;
  var userEmail = localStorage.getItem("Email").split("@").toString();
  userEmail = userEmail.split(".").toString();
  userEmail = userEmail.split("-").toString();
  userEmail = userEmail.split("_").toString();

  const puntosRef = useDatabase().ref(dataBaseKey).child('puntosContar');

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

  const perderVida = () => {
    const vidaPerida = document.getElementById("vida" + vidasRestantes);
    vidaPerida.parentElement.removeChild(vidaPerida);
    vidasRestantes--;
    if (vidasRestantes === 0) {
      swal({
        title: "Oh no... :(",
        text: "Has perdido todas tus vidas\n¿Te gustaria intentarlo de nuevo?",
        icon: "error",
        buttons: ["No", "Si"]
      }).then(respuesta => {
        if (respuesta) {
          swal({
            title: "Aquí vamos de nuevo :)",
            timer: "3000"
          })
          window.location.reload();
        } else {

        }
      })
    } else {
      swal({
        content: <div>Ups! Intenta de nuevo</div>,
        icon: "warning",
        value: false,
      });
    }
  }

  const contarFuncion = (value) => {
    if (value === data?.preguntas[aux]?.respuesta || aux === 3 || aux == 20) {
      swal({
        content: <div>Respuesta Correcta</div>,
        icon: "success",
        value: true,
      });
      setButtons([]);
      setAux(aux + 1);
      sumarPuntos();
    } else {
      perderVida();
    }
  };

  useEffect(() => {
    if (status === "success") {
      obtenerPuntos();
      const btn = buttons;
      let res = 0,
        auxRes = 0;
      btn.push(data?.preguntas[aux]?.respuesta);

      Array.from(Array(2), (_, index) => {
        do {
          res = Math.floor(Math.random() * (20 - 1)) + 1;
          if (res !== auxRes) {
            btn.push(res);
            auxRes = res;
            res = 0;
          }
        } while (res !== 0);
      });
      setButtons([...btn]);
    }
  }, [status, data, aux]);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth / 2, p5.windowWidth / 4).parent(
      canvasParentRef
    );
  };

  const draw = (p5) => {
    if (p5.mouseIsPressed) {
      p5.fill(0);
      p5.ellipse(p5.mouseX, p5.mouseY, 20, 20);
    }
  };

  return (
    <Container>
      <div className="w-screen h-screen">
        {status !== "success" ? (
          <div className="flex flex-col items-center">
            Espera un momento
            <div className="loader"></div>
          </div>
        ) : data.preguntas.length > aux ? (
          <div>
            <div className="puntuacion text-center flex my-4 justify-center">
              <h3 className="mr-10 pt-4">  Puntos: {puntos} </h3>
              <div className="flex my-4 justify-center" name="divVidas">
                <h3 className="mr-3"> Vidas: </h3>
                <a className="flex h-12 w-12 mr-5" id="vida1">
                  <img src={IMGS["vidas"]} className="icon" />
                </a>
                <a className="flex h-12 w-12 mr-5" id="vida2">
                  <img src={IMGS["vidas"]} className="icon" />
                </a>
                <a className="flex h-12 w-12" id="vida3">
                  <img src={IMGS["vidas"]} className="icon" />
                </a>
              </div>
            </div>
            <div className="pregunta w-full text-center">
              <h2 id="tituloContar">{data.preguntas[aux].pregunta}</h2>
            </div>
            <div className="img w-full flex justify-center my-7 h-60">
              {aux === 3 ? (
                <div className="flex flex-col">
                  <Sketch className="dibujo" setup={setup} draw={draw} />
                  <button
                    className="card p-8 bg-green-600 shadow-2xl shadow-2xl transition duration-500 ease-in-out hover:bg-green-500 transform hover:-translate-y-1 hover:scale-110"
                    onClick={contarFuncion}
                  >
                    Revisar
                  </button>
                </div>
              ) : (
                <img
                  src={IMGS[data?.preguntas[aux]?.img]}
                  className="img-pregunta"
                />
              )}
            </div>
            {aux === 3 ? (
              <></>
            ) : (
              <div className="respuesta w-full text-center flex justify-center flex-wrap">
                {buttons.map((v, index) => (
                  <button
                    id="res1"
                    className="card p-8 bg-red-400 shadow-2xl transition duration-500 ease-in-out hover:bg-red-500 transform hover:-translate-y-1 hover:scale-110"
                    onClick={() => contarFuncion(v)}
                    key={index}
                  >
                    <h1>{v}</h1>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <img src={IMGS["fin"]}></img>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Contar;
