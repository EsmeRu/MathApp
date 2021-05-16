/** Contenedor de Header se llama para agregar el header */
import React from "react";
import Header from "./Header";

const Container = ({ children }) => {
  return (
    <div id="container">
      <Header />
      {children}
    </div>
  );
};

export default Container;
