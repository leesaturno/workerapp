import React from "react";
import "./Portafolio.scss";
import { Button } from "antd";
import {


  Redirect

} from "react-router-dom";
import { useSelector } from "react-redux";

export default function Agendado(props) {

  const Clientes = useSelector((store) => store.Clientes);

  const [redirect, setredirect] = React.useState('');



  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

  const rediredionar = () => {
    if (redirect) {
      return <Redirect to={redirect} />
    }
  }

  return (
    
    Clientes.clientes.map(client => (
      <>
      {rediredionar()}
        {client.rut === props.rut ?
          client.id_agendamiento === null ? <><Button type="primary" className="btn-daT" onClick={() => {
                            setredirect(props.redire + client.rut);
                          }}>
            Agendar
      </Button></> : <><span className="center centered">Agendado <br /> {new Date(client.fecha).toLocaleString('en-EN', options)} {client.tramohorario}</span></> : ""}

      </>
    ))
  )
}
