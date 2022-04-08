import React, { useEffect, useState } from "react";
import Container from "../../Container";
import "./juegoContar.css";
import swal from "@sweetalert/with-react";
import Sketch from "react-p5";
import "firebase/firestore";
import "firebase/database";
import { navigate } from "hookrouter";

import { useFirestoreDocData, useFirestore, useDatabase } from "reactfire";

var vidasRestantes = 3;
var newIntent = 1;
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
  diecisiete: "/assets/img/contar/17.png",
  dieciocho: "/assets/img/animales/animales-18.png",
  diecinueve: "/assets/img/contar/contar-patos19.png",
  veinte: "/assets/img/20.png",
  fin: "/assets/img/fin-juego-sfondo.png",
  vidas: "/assets/img/lifes-icons.png",
};

const estiloBtnNext = [
  "flex justify-center items-center",
  "bg-red-400 rounded-full shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:bg-red-500 p-4 m-3",
];

const Contar = () => {
  const preguntasRef = useFirestore().collection("juegos").doc("contar");

  const { status, data } = useFirestoreDocData(preguntasRef);
  const [buttons, setButtons] = useState([]);
  const [aux, setAux] = useState(0);
  const dataBaseKey = localStorage.getItem("key");
  const [puntos, setPuntos] = useState(0);
  const [puntosLocales, setPuntosLocales] = useState(0);
  const handleNav = () => navigate("/Home");
  const handleGameNivelTwo = () => navigate("juego-sumar");
  var cantidadJuegos = 0;
  var promedioJuego = 0;

  var userEmail = localStorage.getItem("Email")?.split("@").toString();
  userEmail = userEmail?.split(".").toString();
  userEmail = userEmail?.split("-").toString();
  userEmail = userEmail?.split("_").toString();

  const puntosRef = useDatabase().ref(dataBaseKey).child("puntosContar");
  const cantRef = useDatabase().ref(dataBaseKey).child("cantJuegosContar");
  const promRef =useDatabase().ref(dataBaseKey).child("promContar");

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

  const obtenerPromedio = () => {
    promRef.on("value", (promedio) => {
      if(promedio != null){
        promedioJuego = promedio.val();
      }
    })
  }

  const calcularPromedio = () => {
    promedioJuego = puntos / cantidadJuegos;
    promRef.set(promedioJuego);
  }

  const sumarPuntos = () => {
    var nuevosPuntos = puntos + 50;
    setPuntos(nuevosPuntos);
    setPuntosLocales(puntosLocales + 50);
    puntosRef.set(nuevosPuntos);    
    console.log(newIntent);
    if(newIntent != null) {      
      cantRef.set(cantidadJuegos+1);
      newIntent = null;
      console.log(newIntent);
    }
    calcularPromedio();
  };

  const perderVida = () => {
    console.log(vidasRestantes);
    const vidaPerida = document.getElementById("vida" + vidasRestantes);
    console.log(vidaPerida);
    vidaPerida.parentElement.removeChild(vidaPerida);
    vidasRestantes--;
    if(newIntent != null) {      
      cantRef.set(cantidadJuegos+1);
      newIntent = null;
      console.log(newIntent);
    }
    if (vidasRestantes === 0) {
      calcularPromedio();
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

  const contarFuncion = (value) => {
    if (value === data?.preguntas[aux]?.respuesta || aux === 3 || aux === 20) {
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
      obtenerCantidad();
      obtenerPromedio();
      if (puntosLocales === null) {
        setPuntosLocales(0);
      }
    }
  }, [obtenerPuntos, puntosLocales]);

  useEffect(() => {
    if (status === "success") {
      obtenerPuntos();
      obtenerCantidad();
      obtenerPromedio();
      if (puntosLocales === null) {
        setPuntosLocales(0);
      }
      const btn = buttons;
      let res = 0,
        auxRes = 0;
      btn.push(data?.preguntas[aux]?.respuesta);

      Array.from(Array(2), (_, index) => {
        do {
          res = Math.floor(Math.random() * (20 - 1)) + 1;
          if (res !== auxRes && res !== btn[0]) {
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

  const reload = () => {
    window.location.reload(true);
  };

  return (
    <Container>
      <div className="w-screen h-screen flex flex-col">
        {status !== "success" ? (
          <div className="flex flex-col items-center">
            Espera un momento
            <div className="loader"></div>
          </div>
        ) : data.preguntas.length > aux ? (
          <div className="flex flex-col gap-5">
            <div className="puntuacion text-center flex my-3 justify-center px-7 sm:bg-gradient-to-t sm:from-gray-50 sticky top-0">
              <h4 className="mr-10 pt-1 font-black">
                {" "}
                Puntos: <span className="text-yellow-500">{puntosLocales}</span>
              </h4>
              <div
                className="flex flex-wrap my-1 justify-center"
                name="divVidas"
              >
                <h4 className="mr-3 font-black"> Vidas: </h4>
                <div className="flex justify-center gap-2">
                  <span className="mov:h-12 mov:w-12 mov:mr-5" id="vida1">
                    <img
                      src={IMGS["vidas"]}
                      alt="img-corazón-vida"
                      className="icon sm:w-8 sm:h-8"
                    />
                  </span>
                  <span className="mov:h-12 mov:w-12 mov:mr-5" id="vida2">
                    <img
                      src={IMGS["vidas"]}
                      alt="img-corazón-vida"
                      className="icon sm:w-8 sm:h-8"
                    />
                  </span>
                  <span className="mov:h-12 mov:w-12" id="vida3">
                    <img
                      src={IMGS["vidas"]}
                      alt="img-corazón-vida"
                      className="icon sm:w-8 sm:h-8"
                    />
                  </span>
                </div>
              </div>
            </div>
            <div className="pregunta w-full text-center">
              <h2 id="tituloContar" className="text-4xl">
                {data.preguntas[aux].pregunta}
              </h2>
            </div>
            <div className="img w-full flex justify-center my-7 h-60">
              {aux === 3 ? (
                <div className="flex flex-col items-center">
                  <Sketch className="dibujo" setup={setup} draw={draw} />
                  <button
                    className="card w-4/12 p-8 bg-green-600 shadow-2xl shadow-2xl transition duration-500 ease-in-out hover:bg-green-500 transform hover:-translate-y-1 hover:scale-110"
                    onClick={contarFuncion}
                  >
                    Revisar
                  </button>
                </div>
              ) : (
                <div className="flex justify-center">
                  <div className="w-vh-2 items-center mov:mx-10">
                    <img
                      src={IMGS[data?.preguntas[aux]?.img]}
                      alt="img-pregunta"
                      className="w-vh-2"
                    />
                  </div>
                </div>
              )}
            </div>
            {aux === 3 ? (
              <></>
            ) : (
              <div className="respuesta text-center flex justify-center">
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
            <div className="flex justify-center">
              <div className="m-10 max-w-screen-md items-center">
                <h3 className="mr-10 pt-4 font-black text-center mb-10">
                  {" "}
                  Puntaje:{" "}
                  <span className="text-yellow-500">{puntosLocales}</span>
                </h3>
                <div className="">
                  <img src={IMGS["fin"]} alt="img-fin-juego" />
                </div>
                <div className={`${estiloBtnNext[0]}`}>
                  <div
                    className={`${estiloBtnNext[1]} bg-blue-500 hover:bg-blue-700`}
                    onClick={handleGameNivelTwo}
                  >
                    Siguiente juego
                  </div>
                  <div className={`${estiloBtnNext[1]}`} onClick={handleNav}>
                    Volver al inicio
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Contar;
