import React, { useEffect, useState } from "react";
import "./Portafolio.scss";
import Info from "./Info";
import Agendado from "./agendado";
import Fullname from "./fullname";
import CardAmplio from "../../component/Card/CardAmplio";
import MuiDT from "../../component/Datatable/MuiDT";
import Footer from "../../component/Footer/Footer";
import Segurity from "../../component/Segurity/Segurity";
import { InfoCircleOutlined, CheckSquareOutlined } from "@ant-design/icons";
import { getCLIENTES } from "../../Redux/Dusk/Clientesreducer";
import { Button, Popover } from "antd";

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
                  name: "rut",
                  label: "Nombre",
                  options: {
                    filter: true,
                    sort: false,
                    onDownload: (buildHead, buildBody, columns, data) => {
                      return "\uFEFF" + buildHead(columns) + buildBody(data);
                    },
                    customBodyRender: (value, row) => {
                      return (
                        <Fullname rut={value} />
                      );
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
                  name: "rut",
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




                        <Agendado rut={value} />
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
                            content={<Info value={value} />}
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
<<<<<<< HEAD
                Clientes.clientes

=======
                // Users.users
                [
                  {
                    fecha: "12 / 11 / 2020",
                    oi: 25500,
                    run: "17967154 - 5",
                  },
                ]
>>>>>>> 61d73fc27d083ab0552420100b44584e9b5836d9
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
