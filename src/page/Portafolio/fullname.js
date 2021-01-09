import React from "react";
import "./Portafolio.scss";


import { useSelector } from "react-redux";

export default function Fullname(props) {

  const Clientes = useSelector((store) => store.Clientes);









  return (
    Clientes.clientes.map(cliente => (
      <>
        {cliente.rut === props.rut ?
          <><span className="center centered"> {cliente.nombres} {cliente.apPaterno} {cliente.apMaterno}</span></> : ""}

      </>
    ))
  ) 
}
