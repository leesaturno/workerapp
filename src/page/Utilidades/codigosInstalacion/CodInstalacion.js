import React, { useEffect, useState } from "react";
import CardAmplio from "../../../component/Card/CardAmplio";
import MuiDT from "../../../component/Datatable/MuiDT";
import Footer from "../../../component/Footer/Footer";
import Segurity from "../../../component/Segurity/Segurity";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";

export default function CodInstalacion() {

  function cancel(e) {
    return message.error({
      content: "Cancelado",

      style: {
        marginTop: "13vh",
        float: "right",
      },
    });
  }

  return (
    <>
      <div class="main mt-5 ml-10">
      <CardAmplio
          title="Nuevo código de descuento"
          content={
            <form >
              <div className="ed-grid lg-grid-4">
                <div className="form-group">
                  <label className="text-ups">Código descuento</label>
                  <input
                    type="text"
                    name="user"
                    required
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="text-ups">Valor</label>
                  {/* <Select
                    name="privilegios"
                    showSearch
                    placeholder="Selecciona un privilegio"
                    title="privilegios"
                    onChange={(value) => {
                      setUsers({ ...Users, privilegios: value });
                    }}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {privilegios.map((privilegio) => (
                      <Select.Option key={privilegio.id_privilegio}>
                        {privilegio.privilegio}
                      </Select.Option>
                    ))}
                  </Select> */}
                </div>
             
                <div className="form-group">
                  <label className="text-ups">Usuario</label>
                  {/* <Select
                    name="privilegios"
                    showSearch
                    placeholder="Selecciona un privilegio"
                    title="privilegios"
                    onChange={(value) => {
                      setUsers({ ...Users, privilegios: value });
                    }}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {privilegios.map((privilegio) => (
                      <Select.Option key={privilegio.id_privilegio}>
                        {privilegio.privilegio}
                      </Select.Option>
                    ))}
                  </Select> */}
                </div>

                <div className="form-group">
                  <label className="text-ups">Vigencia</label>
                  {/* <Select
                    name="privilegios"
                    showSearch
                    placeholder="Selecciona un privilegio"
                    title="privilegios"
                    onChange={(value) => {
                      setUsers({ ...Users, privilegios: value });
                    }}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {privilegios.map((privilegio) => (
                      <Select.Option key={privilegio.id_privilegio}>
                        {privilegio.privilegio}
                      </Select.Option>
                    ))}
                  </Select> */}
                </div>
              </div>

              <br />

              <button className="bttn btn-CB text-ups">Crear códigos</button>
            </form>
          }
        />

        <br/><br/>
        <CardAmplio
          title="Códigos de descuento de instalación"
          content={
            <MuiDT
              columns={[
                {
                  name: "codD",
                  label: "Código descuento",
                  options: {
                    filter: true,
                    sort: true,
                    onDownload: (buildHead, buildBody, columns, data) => {
                      return "\uFEFF" + buildHead(columns) + buildBody(data);
                    },
                  },
                },
                {
                  name: "valor",
                  label: "Valor",
                  options: {
                    filter: true,
                    sort: false,
                    onDownload: (buildHead, buildBody, columns, data) => {
                      return "\uFEFF" + buildHead(columns) + buildBody(data);
                    },
                  },
                },
                {
                  name: "usuario",
                  label: "Usuario",
                  options: {
                    filter: true,
                    sort: false,
                    onDownload: (buildHead, buildBody, columns, data) => {
                      return "\uFEFF" + buildHead(columns) + buildBody(data);
                    },
                  },
                },
                {
                  name: "vigencia",
                  label: "Vigencia",
                  options: {
                    filter: true,
                    sort: false,
                    onDownload: (buildHead, buildBody, columns, data) => {
                      return "\uFEFF" + buildHead(columns) + buildBody(data);
                    },
                  },
                },

                {
                  name: "accion",
                  label: "Acciones",
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
                          <Button type="warning" className="btn-DT">
                            Editar
                          </Button>

                          <Popconfirm
                            title="¿Seguro que desea eliminar este código?"
                            icon={<DeleteOutlined style={{ color: "red" }} />}
                            // onConfirm={() => {
                            //   axios
                            //     .get(Global.url + "deleteusers/" + value)
                            //     .then((res) => {
                            //       message.success({
                            //         content: "Usuario eliminado exitosamente",

                            //         style: {
                            //           marginTop: "13vh",
                            //           float: "right",
                            //         },
                            //       });
                            //       disparador(getusuarios());
                            //     });
                            // }}
                            onCancel={cancel}
                            okText="Si"
                            cancelText="No"
                          >
                            <Button type="danger" className="btn-DT">
                              Eliminar
                            </Button>
                          </Popconfirm>
                        </>
                      );
                    },
                  },
                },
              ]}
              data={
                // Users.users
                [
                  {
                    codD: "12 / 11 / 2020",
                    valor: 25500,
                    vigencia: "17967154 - 5",
                  },
                ]
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
    </>
  );
}
