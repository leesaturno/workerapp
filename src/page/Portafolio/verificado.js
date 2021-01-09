import React from "react";
import "./Portafolio.scss";
import { Button } from "antd";
import {


  Redirect

} from "react-router-dom";
import { useSelector } from "react-redux";
import { CheckSquareOutlined } from "@ant-design/icons";
export default function Verificado(props) {

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
          client.verificado !== "1" ? <><Button type="primary" className="btn-daT" onLoad onClick={() => {
                            setredirect(props.redire + client.rut);
                          }}>
            Verificar
      </Button></> : <><span className="center centered"><CheckSquareOutlined /></span></>: ""}

      </>
    ))
  )
}
