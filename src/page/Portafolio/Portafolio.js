import React, { useEffect, useState } from "react";
import "./Portafolio.scss";
import CardAmplio from "../../component/Card/CardAmplio";
import MuiDT from "../../component/Datatable/MuiDT";
import Footer from "../../component/Footer/Footer";
import Segurity from "../../component/Segurity/Segurity";
import { InfoCircleOutlined, CheckSquareOutlined } from "@ant-design/icons";
import { getCLIENTES } from "../../Redux/Dusk/Clientesreducer";
import { Button, Popover, message } from "antd";

import { useDispatch, useSelector } from "react-redux";

export default function Portafolio() {
  const disparador = useDispatch();
  useEffect(() => {
    disparador(getCLIENTES());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disparador]);
  const Clientes = useSelector((store) => store.Clientes);

  const [Pov, setPov] = useState({
    visible: false,
  });

  const hide = () => {
    setPov({ ...Pov, visible: false });
  };

  const handleVisibleChange = (visible) => {
    setPov({ ...Pov, visible });
  };

  const text = (
    <span className="center">
      <InfoCircleOutlined style={{ color: "#1890ff" }} /> Información del
      cliente
    </span>
  );
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const content = (
    <div>
      <p>
        Fecha: 22/10/2020
        <br />
        OI: 25500
        <br />
        RUN: 17967154-5
        <br />
        Nombres: Juan Perez Molina Rosales
        <br />
        Dirección: Los Silos 1260
        <br />
        Elemento: H1P3N9
        <br />
        Plan: 200 MB
        <br />
        Mensualidad: $14.990
        <br />
        Verificado: <CheckSquareOutlined /> 23/10/2020
        <br />
        Estado: Agendado 24/10/2020 PM
        <br />
        Costo de instalación: $10.000
      </p>
    </div>
  );

  return (
    <div>
      <div class="main mt-5 ml-10">
        <CardAmplio
          title="Portafolio"
          content={
            <MuiDT
              columns={[
                {
                  name: "stamp",
                  label: "Fecha",
                  options: {
                    filter: true,
                    sort: true,
                    onDownload: (buildHead, buildBody, columns, data) => {
                      return "\uFEFF" + buildHead(columns) + buildBody(data);
                    }, customBodyRender: (value, row) => {
                      var fecha = new Date(value)
                      var stamp = fecha.toLocaleString('en-GB', options)
                      return (
                        <>
                          {stamp}
                        </>
                      );
                    },
                  },
                },
                {
                  name: "oi",
                  label: "OI (Orden de ingreso)",
                  options: {
                    filter: true,
                    sort: false,
                    onDownload: (buildHead, buildBody, columns, data) => {
                      return "\uFEFF" + buildHead(columns) + buildBody(data);
                    },
                  },
                },
                {
                  name: "rut",
                  label: "Run",
                  options: {
                    filter: true,
                    sort: false,
                    onDownload: (buildHead, buildBody, columns, data) => {
                      return "\uFEFF" + buildHead(columns) + buildBody(data);
                    },
                  },
                },
                {
                  name: "nombres",
                  label: "Nombres",
                  options: {
                    filter: true,
                    sort: false,
                    onDownload: (buildHead, buildBody, columns, data) => {
                      return "\uFEFF" + buildHead(columns) + buildBody(data);
                    },
                  },
                },
                {
                  name: "verificado",
                  label: "verificado",
                  options: {
                    filter: true,
                    sort: false,
                    empty: true,
                    onDownload: (buildHead, buildBody, columns, data) => {
                      return "\uFEFF" + buildHead(columns) + buildBody(data);
                    },
                    customBodyRender: (value, row) => {
                      return (
                        <>

                          {value !== "1" ? <><Button type="primary" className="btn-daT">
                            Verificar
                         </Button></> : <><span className="center centered"><CheckSquareOutlined /></span></>}

                        </>

                      );
                    },
                  },
                },
                {
                  name: "fecha",
                  label: "Estado",
                  options: {
                    filter: true,
                    sort: false,
                    empty: true,
                    onDownload: (buildHead, buildBody, columns, data) => {
                      return "\uFEFF" + buildHead(columns) + buildBody(data);
                    },
                    customBodyRender: (value, row) => {
                      return (
                        <>

                          {value === null ? <><Button type="primary" className="btn-daT">
                            Agendar
                          </Button></> : <><span className="center centered">Agendado <br /> {value} </span></>}

                        </>
                      )
                    },
                  },
                },
                {
                  name: "rut",
                  label: "Info",
                  options: {
                    filter: true,
                    sort: false,
                    empty: true,
                    onDownload: (buildHead, buildBody, columns, data) => {
                      return "\uFEFF" + buildHead(columns) + buildBody(data);
                    },
                    customBodyRender: (value, row) => {
                      return (
                        <>
                          <Popover
                            placement="bottomRight"
                            title={text}
                            content={content}
                            trigger="click"
                            visible={Pov.visible}
                            onVisibleChange={handleVisibleChange}
                          >
                            <Button type="info" className="btn-info-DT">
                              <InfoCircleOutlined />
                            </Button>
                          </Popover>
                        </>
                      );
                    },
                  },
                },
              ]}
              data={
                Clientes.clientes

              }
              options={{
                filter: true,
                filterType: "dropdown",
                responsive: "vertical",
                tableBodyHeight: "400px",
                textLabels: {
                  pagination: {
                    next: "Siguiente",
                    previous: "Anterior",
                    rowsPerPage: "Filas por pagina:",
                    displayRows: "de",
                  },
                  filter: {
                    all: "TODOS",
                    title: "FILTROS",
                    reset: "REINICIAR",
                  },
                  body: {
                    noMatch: "Lo sentimos, sin registros encontrados",
                    toolTip: "Filtrar",
                    columnHeaderTooltip: (column) =>
                      `Filtrar por ${column.label}`,
                  },
                  toolbar: {
                    search: "Buscar",
                    downloadCsv: "Descargar CSV",
                    print: "Imprimir",
                    viewColumns: "Ver columnas",
                    filterTable: "Filtrar Tablas",
                  },
                  viewColumns: {
                    title: "Mostrar Columnas",
                    titleAria: "Mostrar/Ocultar Columnas",
                  },
                  selectedRows: {
                    text: "Filas Seleccionadas",
                    delete: "Elimiar",
                    deleteAria: "Eliminar Filas Seleccionadas",
                  },
                  // tableBodyMaxHeight: ''
                },
              }}
            />
          }
        />
      </div>

      <Footer></Footer>
      {/* <Segurity /> */}
    </div>
  );
}