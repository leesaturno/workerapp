import React from "react";
import "./Portafolio.scss";



import { CheckSquareOutlined, WarningOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

export default function Info(props) {


  const Clientes = useSelector((store) => store.Clientes);





  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };


 
  return (
    Clientes.clientes.map(cliente => (
      <div>
        {cliente.rut === props.value ? <div><p>
          Fecha: {new Date(cliente.stamp).toLocaleString('en-GB', options)}
          <br />
      OI: {cliente.oi}
          <br />
      RUN: {cliente.rut}
          <br />
      Nombres: {cliente.nombres} {cliente.apPaterno}{cliente.apMaterno}
          <br />
      Dirección: {cliente.nombre}
          <br />
      Elemento: {cliente.dispositivo}
          <br />
      Plan:  {cliente.velocidades}
          <br />
      Mensualidad: $ {cliente.precio}
          <br />
      Verificado: {cliente.verificado === "1" ? <> <CheckSquareOutlined /> {new Date(cliente.fecha_verify).toLocaleString('en-GB', options)}</> : <> No verfificado <WarningOutlined style={{ color: "#fbcf1e" }} /> </>}
          <br />
      Estado: {cliente.id_agendamiento !== null ? <> Agendado {new Date(cliente.fecha).toLocaleString('en-GB', options)} {cliente.tramohorario}</> : <> No agendado <WarningOutlined style={{ color: "#fbcf1e" }} /></>}
          <br />
      Costo de instalación: $10.000
    </p>
        </div> : ""
        }</div>))
  );
}
