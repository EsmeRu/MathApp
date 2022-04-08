// TODO: añadir un nuevo botón que te llevará al nuevo módulo.

import React from "react";
import Container from "../Container";
import PageVisitsCard from "./componentes/PageVisitsCard";
import StatusCard from "./componentes/StatusCard";
import TrafficCard from "./componentes/TrafficCard";
// import { useFirebaseApp } from "reactfire";

const Tutores = () => {
  //   const firebase = useFirebaseApp();

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
                amount="40%"
                percentage="5"
                percentageIcon="extension"
                percentageColor="red"
                date="Número de veces jugado"
              />
              <StatusCard
                color="orange"
                icon="add_task"
                title="Sumas"
                amount="56%"
                percentage="3"
                percentageIcon="extension"
                percentageColor="red"
                date="Número de veces jugado"
              />
              <StatusCard
                color="purple"
                icon="remove_circle_outline"
                title="Restas"
                amount="92%"
                percentage="1"
                percentageIcon="extension"
                percentageColor="red"
                date="Número de veces jugado"
              />
              <StatusCard
                color="blue"
                icon="emoji_objects"
                title="Identificar Objetos"
                amount="49,65%"
                percentage="12"
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
