// TODO: añadir un nuevo botón que te llevará al nuevo módulo.

import React, { useEffect, useState } from "react";
import Container from "../Container";
import PageVisitsCard from "./componentes/PageVisitsCard";
import StatusCard from "./componentes/StatusCard";
import TrafficCard from "./componentes/TrafficCard";
import { useDatabase } from "reactfire";

const Tutores = () => {
  const dataBaseKey = localStorage.getItem("key");
  const cantidadSumarRef = useDatabase().ref(dataBaseKey).child("cantJuegosSumar");
  const cantidadContarRef = useDatabase().ref(dataBaseKey).child("cantJuegosContar");
  const cantidadObjetosRef = useDatabase().ref(dataBaseKey).child("cantJuegosObjetos");
  const cantidadMemoriaRef = useDatabase().ref(dataBaseKey).child("cantJuegosMemoria");
  const promSumarRef = useDatabase().ref(dataBaseKey).child("promSumar");
  const promContarRef = useDatabase().ref(dataBaseKey).child("promContar");
  const promObjetosRef = useDatabase().ref(dataBaseKey).child("promObjetos");
  const promMemoriaRef = useDatabase().ref(dataBaseKey).child("promMemoria");

  const [cantidadSumar, setCantidadSumar] = useState(0);
  const [cantidadContar, setCantidadContar] = useState(0);
  const [cantidadObjetos, setCantidadObjetos] = useState(0);
  const [cantidadMemoria, setCantidadMemoria] = useState(0);
  const [promedioSumar, setPromedioSumar] = useState(0);
  const [promedioContar, setPromedioContar] = useState(0);
  const [promedioObjetos, setPromedioObjetos] = useState(0);
  const [promedioMemoria, setPromedioMemoria] = useState(0);

  const obtenerCantidades = () => {
    cantidadSumarRef.on("value",(cantidadSumar) => {
      if(cantidadSumar != null){
        setCantidadSumar(cantidadSumar.val());
      }
    });

    cantidadContarRef.on("value",(cantidadContar) => {
      if(cantidadContar != null){
        setCantidadContar(cantidadContar.val());
      }
    });

    cantidadObjetosRef.on("value",(cantidadObjetos) => {
      if(cantidadObjetos != null){
        setCantidadObjetos(cantidadObjetos.val());
      }
    });

    cantidadMemoriaRef.on("value",(cantidadMemoria) => {
      if(cantidadMemoria != null){
        setCantidadMemoria(cantidadMemoria.val());
      }
    });
  }

  const obtenerPromedios = () => {
    promContarRef.on("value",(promedioContar) => {
      if(promedioContar != null) {
        setPromedioContar(promedioContar.val())
      }
    });

    promSumarRef.on("value",(promedioSumar) => {
      if(promedioSumar != null) {
        setPromedioSumar(promedioSumar.val())
      }
    });

    promMemoriaRef.on("value",(promedioMemoria) => {
      if(promedioMemoria != null) {
        setPromedioMemoria(promedioMemoria.val())
      }
    });

    promObjetosRef.on("value",(promedioObjetos) => {
      if(promedioObjetos != null) {
        setPromedioObjetos(promedioObjetos.val())
      }
    });
  }

  useEffect(() => {
    obtenerCantidades();
    obtenerPromedios();
  });

  return (
    <>
      <Container>
        <div className="px-3 md:px-8">
          <div className="container mx-auto max-w-full w-5/6">
            <div className="grid grid-cols-4 lg:grid-cols-1 xl:grid-cols-2 my-14">
              <StatusCard
                color="pink"
                icon="pin"
                title="Contar"
                amount={promedioContar+" promedio"}
                percentage={cantidadContar}
                percentageIcon="extension"
                percentageColor="red"
                date="Número de veces jugado"
              />
              <StatusCard
                color="orange"
                icon="add_task"
                title="Sumas y restas"
                amount={promedioSumar+" promedio"}
                percentage={cantidadSumar}
                percentageIcon="extension"
                percentageColor="red"
                date="Número de veces jugado"
              />
              <StatusCard
                color="purple"
                icon="remove_circle_outline"
                title="Memoria"
                amount={promedioMemoria+" promedio"}
                percentage={cantidadMemoria}
                percentageIcon="extension"
                percentageColor="red"
                date="Número de veces jugado"
              />
              <StatusCard
                color="blue"
                icon="emoji_objects"
                title="Identificar Objetos"
                amount={promedioObjetos+" promedio"}
                percentage={cantidadObjetos}
                percentageIcon="extension"
                percentageColor="red"
                date="Número de veces jugado"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-1">
              <div className="col-start-1 col-end-5 lg:col-start-1 lg:col-end-7 px-4 mb-14">
                <PageVisitsCard />
              </div>
              <div className="col-start-5 col-end-5 lg:col-start-1 lg:col-end-7 px-4 mb-14">
                <TrafficCard />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Tutores;
