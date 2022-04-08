import React, { useState, useEffect } from "react";
import Card from "./Card";
import Container from "../../Container";
import Tablero from "./TableroOperacion";
import "./operaciones.css";
import "firebase/database";
import { useFirestoreDocData, useFirestore, useDatabase } from "reactfire";
import { navigate } from "hookrouter";

const IMGS = {
  titulo: "/assets/img/operaciones/sumas-restas.png",
  sumas: "/assets/img/operaciones/titulo-sumas.png",
  restas: "/assets/img/operaciones/titulo-restas.png",
  suma2: "/assets/img/operaciones/sumas/suma-1-1.png",
  suma3: "/assets/img/operaciones/sumas/suma-1-2.png",
  suma4: "/assets/img/operaciones/sumas/suma-2-2.png",
  suma5: "/assets/img/operaciones/sumas/suma-4-1.png",
  suma6: "/assets/img/operaciones/sumas/suma-3-3.png",
  suma7: "/assets/img/operaciones/sumas/suma-4-3.png",
  suma8: "/assets/img/operaciones/sumas/suma-5-3.png",
  suma9: "/assets/img/operaciones/sumas/suma-5-4.png",
  suma10: "/assets/img/operaciones/sumas/suma-6-4.png",
  resta0: "/assets/img/operaciones/restas/resta0.png",
  resta1: "/assets/img/operaciones/restas/resta1.png",
  resta2: "/assets/img/operaciones/restas/resta2.png",
  resta3: "/assets/img/operaciones/restas/resta3.png",
  resta4: "/assets/img/operaciones/restas/resta4.png",
  resta5: "/assets/img/operaciones/restas/resta5.png",
  resta6: "/assets/img/operaciones/restas/resta6.png",
  resta7: "/assets/img/operaciones/restas/resta7.png",
  resta8: "/assets/img/operaciones/restas/resta8.png",
  resta9: "/assets/img/operaciones/restas/resta9.png",
  resta10: "/assets/img/operaciones/restas/resta10.png",
  fin: "/assets/img/fin-juego-sfondo.png",
  vidas: "/assets/img/lifes-icons.png",
};

function Sumar() {
  const preguntasRef = useFirestore().collection("juegos").doc("operaciones");
  const handleGameThree = () => navigate("juego-objetos");
  const handleNav = () => navigate("/Home");

  const { status, data } = useFirestoreDocData(preguntasRef);
  const [aux, setAux] = useState(0);
  const [buttons, setButtons] = useState([]);
  const dataBaseKey = localStorage.getItem("key");
  const [puntos, setPuntos] = useState(0);
  const [puntosLocales, setPuntosLocales] = useState(0);
  const [count, setCount] = useState(1);
  const [imgOp, setImgOp] = useState("");
  const [lenghtOp, setLenghtOp] = useState(1);
  var cantidadJuegos = 0;
  var promedioJuego = 0;

  var userEmail = localStorage.getItem("Email").split("@").toString();
  userEmail = userEmail.split(".").toString();
  userEmail = userEmail.split("-").toString();
  userEmail = userEmail.split("_").toString();

  const puntosRef = useDatabase().ref(dataBaseKey).child("puntosSumar");
  const cantRef = useDatabase().ref(dataBaseKey).child("cantJuegosSumar");
  const promRef =useDatabase().ref(dataBaseKey).child("promSumar");

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

  useEffect(() => {
    if (status === "success") {
      obtenerPuntos();
      obtenerCantidad();
      obtenerPromedio();
      if(puntosLocales === null) {
        setPuntosLocales(0);
      }
      let btn = buttons;
      btn = [];
      let res = 0,
        auxRes = 0;
      if (count === 1 && lenghtOp > aux) {
        setLenghtOp(data?.suma?.length);
        setImgOp(IMGS[data.suma[aux].img]);
        btn.push(data?.suma[aux]?.respuesta);
      }
      //Pasar al siguiente nivel restas
      else if (count === 1 && lenghtOp === aux) {
        setCount(2);
        setLenghtOp(1);
        setAux(0);
      } else if (count === 2 && lenghtOp > aux) {
        setLenghtOp(data?.resta?.length);
        setImgOp(IMGS[data.resta[aux].img]);
        btn.push(data?.resta[aux]?.respuesta);
      }

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
  }, [status, data, aux, count]);

  const estilo = [
    "flex w-60 h-60 bg-red-400 transition duration-500 ease-in-out hover:bg-red-500 transform hover:-translate-y-1 hover:scale-110",
    "flex justify-center items-center mov:w-40 mov:h-40 sm:p-7 sm:text-4xl bg-red-400 text-white text-6xl rounded-md transition duration-500 ease-in-out hover:bg-red-500 transform hover:-translate-y-1 hover:scale-110",
  ];
  const estiloBtnNext = [
    "flex justify-center items-center",
    "bg-red-400 rounded-full shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:bg-red-500 p-4 m-3",
  ];

  /** Componentes secundarios */
  const loader = () => {
    return (
      <div className="flex flex-col items-center">
        Espera un momento
        <div className="loader"></div>
      </div>
    );
  };
  const barraPuntaje = () => {
    return (
      <div className="puntuacion text-center flex my-3 justify-center px-7 sm:bg-gradient-to-t sm:from-gray-50 sticky top-0">
        <h4 className="mr-10 pt-1 font-black">
          {" "}
          Puntos:{" "}
          <span className="text-yellow-500">{puntosLocales}</span>
        </h4>
        <div className="flex flex-wrap my-1 justify-center" name="divVidas">
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
    );
  };

  const tableroPregunta = () => {
    return (
      <div className="flex justify-center items-center m-10 sm:m-5 sm:flex-col">
        <div className="">
          <img src={imgOp} alt="" />
        </div>
        <h1 className="font-black"> = </h1>
        <div className="flex card p-10 bg-red-400 shadow-2xl">
          <Tablero
            id="board"
            className="board w-20 h-20 sm:w-10 sm:h-10"
            count={count}
            state={[aux, setAux]}
          ></Tablero>
        </div>
      </div>
    );
  };

  const tableroRespuesta = () => {
    return (
      <div className="flex justify-center">
        <Tablero id="board-1" className=" board">
          {buttons.map((v, index) => (
            <Card id={v} className={estilo[1]} draggable="true" key={index}>
              {v}
            </Card>
          ))}
        </Tablero>
      </div>
    );
  };

  const finDelJuego = () => {
    return (
      <div className="flex justify-center flex-col items-center">
        <div className="m-10 items-center">
          <h3 className="mr-10 pt-4 font-black text-center mb-10">
            {" "}
            Puntaje:{" "}
            <span className="text-yellow-500">{puntos.toLocaleString()}</span>
          </h3>
          <img src={IMGS["fin"]} alt="img-fin-juego" />
        </div>
        <div className={`${estiloBtnNext[0]}`}>
          <div
            className={`${estiloBtnNext[1]} bg-blue-500 hover:bg-blue-700`}
            onClick={handleGameThree}
          >
            Siguiente juego
          </div>
          <div className={`${estiloBtnNext[1]}`} onClick={handleNav}>
            Volver al inicio
          </div>
        </div>
      </div>
    );
  };

  return (
    <Container>
      {count === 1 || count === 2 ? (
        <div className="w-screen h-screen">
          {status !== "success" ? (
            <div>{loader()}</div>
          ) : lenghtOp > aux ? (
            <div className="flex flex-col gap-5">
              {barraPuntaje()}
              <div className="w-full text-center mb-10 flex flex-col">
                {/** Tablero de pregunta */}
                {tableroPregunta()}

                {/** Tablero de respuesta */}
                {tableroRespuesta()}
              </div>
            </div>
          ) : (
            <div>{finDelJuego()}</div>
          )}
        </div>
      ) : (
        <div className="flex gap-10 m-10 flex-wrap justify-center">
          <button
            className="p-3 shadow-2xl shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            onClick={() => setCount(1)}
          >
            <img src={IMGS["sumas"]} alt="juego sumas" />
          </button>
          <button
            className="p-3 shadow-2xl shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            onClick={() => setCount(2)}
          >
            <img src={IMGS["restas"]} alt="juego restas" />
          </button>
        </div>
      )}
    </Container>
  );
}

export default Sumar;
