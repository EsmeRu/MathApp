// TODO: añadir un nuevo botón que te llevará al nuevo módulo.

import React from "react";
import Container from "../Container";
import StatusCard from "./componentes/StatusCard";
// import { useFirebaseApp } from "reactfire";

const Tutores = () => {
  //   const firebase = useFirebaseApp();

  return (
    <>
      <Container>
        <div className="px-3 md:px-8">
          <div className="container mx-auto max-w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4">
              <StatusCard
                color="pink"
                icon=""
                title="Traffic"
                amount="350,897"
                percentage="3.48"
                percentageIcon="arrow_upward"
                percentageColor="green"
                date="Since last month"
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Tutores;
