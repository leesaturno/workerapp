import React from "react";
import "./Portafolio.scss";
import { Button } from "antd";



import { useSelector } from "react-redux";

export default function Agendado(props) {

  const Clientes = useSelector((store) => store.Clientes);





  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };



  return (
    Clientes.clientes.map(client => (
      <>
        {client.rut === props.rut ?
          client.id_agendamiento === null ? <><Button type="primary" className="btn-daT">
            Agendar
      </Button></> : <><span className="center centered">Agendado <br /> {new Date(client.fecha).toLocaleString('en-GB', options)} {client.tramohorario}</span></> : ""}

      </>
    ))
  )
}
