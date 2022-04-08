import "../objetos.css";
import React, { useEffect, useState } from "react";
import TableroMemoria from "./TableroMemoria.js";
import "firebase/database";
import { useDatabase } from "reactfire";

const time = new Date();
const emojiList = [
  "⚡",
  "🍕",
  "🍰",
  "🎈",
  "🏈",
  "🐹",
  "🐮",
  "🐷",
  "🐬",
  "🐟",
  "🍉",
  "🍎",
  "🍒",
  "🍓",
];
var newIntent = 1;

const Memoria = () => {
  const [shuffledMemoBlocks, setShuffleMemoBlocks] = useState([]);
  const [selectedMemoBlock, setSelectedMemoBlock] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [finJuego, setFinJuego] = useState(0);

  const dataBaseKey = localStorage.getItem("key");
  const [puntos, setPuntos] = useState(0);
  const [puntosLocales, setPuntosLocales] = useState(0);
  var cantidadJuegos = 0;

  var userEmail = localStorage.getItem("Email").split("@").toString();
  userEmail = userEmail.split(".").toString();
  userEmail = userEmail.split("-").toString();
  userEmail = userEmail.split("_").toString();

  const puntosRef = useDatabase().ref(dataBaseKey).child("puntosMemoria");
  const cantRef = useDatabase().ref(dataBaseKey).child("cantJuegosMemoria");
  

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
    setPuntosLocales(puntosLocales + 50);
    puntosRef.set(nuevosPuntos);
    if(newIntent != null) {      
      cantRef.set(cantidadJuegos+1);
      newIntent = null;
      console.log(newIntent);
    }
  };

  useEffect(() => {
    if (puntosLocales === null) {
      setPuntosLocales(0);
    }
    obtenerPuntos();
    obtenerCantidad();
  }, [obtenerPuntos, puntosLocales]);

  useEffect(() => {
    const shuffledEmojiList = shuffleArray([...emojiList, ...emojiList]);
    setShuffleMemoBlocks(
      shuffledEmojiList.map((emoji, i) => ({ index: i, emoji, flipped: false }))
    );
  }, []);
  const listaEmojis = () => {
    for (let i = 0; i < 8; i++) {
      emojiList.splice(Math.floor(Math.random() * emojiList.length), 1);
    }
  };
  listaEmojis();
  const shuffleArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const handleMemoClick = (memoBlock) => {
    const flippedMemoBlock = { ...memoBlock, flipped: true };
    let shuffledMemoBlocksCopy = [...shuffledMemoBlocks];
    shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock);
    setShuffleMemoBlocks(shuffledMemoBlocksCopy);
    if (selectedMemoBlock === null) {
      setSelectedMemoBlock(memoBlock);
      console.log("este es el primero que se levanta");
      if(newIntent != null) {      
        cantRef.set(cantidadJuegos+1);
        newIntent = null;
        console.log(newIntent);
      }
    } else if (selectedMemoBlock.emoji === memoBlock.emoji) {
      setSelectedMemoBlock(null);
      sumarPuntos();
      console.log("este es cuando coincide con el segundo");
      setFinJuego(finJuego + 2);
    } else {
      setAnimating(true);
      console.log("este es cuando no coincide con el segundo");

      setTimeout(() => {
        shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
        shuffledMemoBlocksCopy.splice(
          selectedMemoBlock.index,
          1,
          selectedMemoBlock
        );
        setShuffleMemoBlocks(shuffledMemoBlocksCopy);
        setSelectedMemoBlock(null);
        setAnimating(false);
      }, 1500);
    }
  };

  /* const handlerStopTimer = () => {
    setFinTimer(Timer.call());
    finTimer.pause();
  } */

  return (
    <div>
      <div className="puntuacion text-center">
        <h3 className="mr-10 pt-4 font-black">
          {" "}
          Puntos: <span className="text-yellow-500">{puntosLocales}</span>
        </h3>
      </div>
      <TableroMemoria
        memoBlocks={shuffledMemoBlocks}
        animating={animating}
        handleMemoClick={handleMemoClick}
        finJuego={finJuego}
      />
    </div>
  );
};

export default Memoria;
