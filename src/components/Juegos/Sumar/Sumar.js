import React, { useState, useEffect } from "react";
import Card from "./Card";
import Container from "../../Container";
import Tablero from "./TableroOperacion";
import "./operaciones.css";
import "firebase/database";
import swal from "@sweetalert/with-react";
import { useFirestoreDocData, useFirestore, useDatabase } from "reactfire";
import { navigate } from "hookrouter";

const IMGS = {
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

  const { status, data } = useFirestoreDocData(preguntasRef);
  const [aux, setAux] = useState(0);
  const [buttons, setButtons] = useState([]);
  const dataBaseKey = localStorage.getItem("key");
  const [puntos, setPuntos] = useState(0);

  var userEmail = localStorage.getItem("Email").split("@").toString();
  userEmail = userEmail.split(".").toString();
  userEmail = userEmail.split("-").toString();
  userEmail = userEmail.split("_").toString();

  const puntosRef = useDatabase().ref(dataBaseKey).child('puntosSumar');

  const handleNav = () => navigate("/");


  const obtenerPuntos = () => {
    puntosRef.on('value', puntaje => {
      if (puntaje != null) {
        setPuntos(puntaje.val())
      }
    })
  };





  /*const perderVida = () => {
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
          swal({
            title: "Has regresado a la pantalla de inicio",
            timer: "2000"
          })
          handleNav();
        }
      })
    } else {
      swal({
        content: <div>Ups! Intenta de nuevo</div>,
        icon: "warning",
        value: false,
      });
    }
  }*/

  useEffect(() => {
    if (status === "success") {
      obtenerPuntos()
      let btn = buttons;
      btn = [];
      let res = 0,
        auxRes = 0;
      btn.push(data?.suma[aux]?.respuesta);

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

  const estilo = [
    "flex w-60 h-60 bg-red-400 transition duration-500 ease-in-out hover:bg-red-500 transform hover:-translate-y-1 hover:scale-110",
    "flex justify-center items-center w-40 h-40 bg-red-400",
  ];

  return (
    <Container>
      <div className="w-screen h-screen">
        {status !== "success" ? (
          <div className="flex flex-col items-center">
            Espera un momento
            <div className="loader"></div>
          </div>
        ) : data?.suma?.length > aux ? (
          <div>
            <div className="puntuacion text-center flex my-4 justify-center">
              <h3 className="mr-10 pt-4" id="hPuntos"> Puntos: {puntos} </h3>
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
            <div className="w-full text-center mb-10">
              <h2>Vamos a sumar...</h2>
              <div className="flex justify-center items-center">
                <img src={IMGS[data.suma[aux].img]} alt="" />
                <h2 className="">=</h2>
                <div className="card p-10 bg-red-400 shadow-2xl">
                  <Tablero
                    id="board"
                    className="board w-40"
                    state={[aux, setAux]}
                  ></Tablero>
                </div>
              </div>

              <div className="flex justify-center">
                <Tablero id="board-1" className=" board">
                  {buttons.map((v, index) => (
                    <Card
                      id={v}
                      className={estilo[1]}
                      draggable="true"
                      key={index}
                    >
                      {v}
                    </Card>
                  ))}
                </Tablero>
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
    </Container>
  );
}

export default Sumar;
