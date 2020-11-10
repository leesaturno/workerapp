import React, { useEffect, useState } from "react";
import CardAmplio from "../../../component/Card/CardAmplio";
import MuiDT from "../../../component/Datatable/MuiDT";
import Footer from "../../../component/Footer/Footer";
import Segurity from "../../../component/Segurity/Segurity";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Popconfirm, message, Select } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { getusuarios } from '../../../Redux/Dusk/usuarioreducer';
import { setCUPONES, getCUPONES, getCUPON, CUPONEUpdateaction } from '../../../Redux/Dusk/Cuponesreducer';
import axios from 'axios';
import Icon from '../../../component/Icons/Icons'
export default function CodInstalacion() {
  const Users = useSelector(store => store.Usuarios);
  const SCupones = useSelector(store => store.Cupones);
  const disparador = useDispatch();
  const [recupones, setrecupones] = useState([]);
  useEffect(() => {
    disparador(getusuarios())
    disparador(getCUPONES())
    setrecupones(SCupones.CUPONES)

  }, [disparador]);

  useEffect(() => {
    if (SCupones.CUPONES !== recupones) {
      disparador(getCUPONES())
      setrecupones(SCupones.CUPONES)
    }
  }, [])
  const [editing, setediting] = useState(false);
  const [cupones, setcupones] = useState({
    user: "",
    valor: "",
    cantidad: "",
    vigencia: "",
    valides: null,
    codigo: ""
  });
  const [editcupon, seteditcupon] = useState({
    user: "",

    cantidad: "",


    newuser: "",

    newcantidad: 0,
    newvalides: null,
    valides: null,
    codigo: ""
  });

  function cancel(e) {
    return message.error({
      content: "Cancelado",

      style: {
        marginTop: "13vh",
        float: "right",
      },
    });
  }

  const onSearch = (val) => {
    console.log('search:', val);
  }
  const submitedit = (e) => {
    e.preventDefault();
    //insertar edicion todos nuevos
    if (editcupon.newuser !== "" && editcupon.newcantidad !== 0 && editcupon.newvalides !== null) {
      disparador(CUPONEUpdateaction(editcupon.newuser, editcupon.newcantidad, editcupon.newvalides, editcupon.codigo))
      disparador(getCUPONES())
      //insertar edicion mismo user pero cantidad y valides nuevos
    } else if (editcupon.newuser === "" && editcupon.newcantidad !== 0 && editcupon.newvalides !== null) {
      disparador(CUPONEUpdateaction(editcupon.user, editcupon.newcantidad, editcupon.newvalides, editcupon.codigo))
      disparador(getCUPONES())
      //insertar edicion mismo user y valides pero cantidad nueva
    } else if (editcupon.newuser === "" && editcupon.newcantidad !== 0 && editcupon.newvalides === null) {
      disparador(CUPONEUpdateaction(editcupon.user, editcupon.newcantidad, editcupon.valides, editcupon.codigo))
      disparador(getCUPONES())
      //insertar edicion misma valides y cantidad pero user nuevo
    } else if (editcupon.newuser !== "" && editcupon.newcantidad === 0 && editcupon.newvalides === null) {
      disparador(CUPONEUpdateaction(editcupon.newuser, editcupon.cantidad, editcupon.valides, editcupon.codigo))
      disparador(getCUPONES())
      //insertar edicion misma valides pero cantidad y user nuevos
    } else if (editcupon.newuser !== "" && editcupon.newcantidad !== 0 && editcupon.newvalides === null) {
      disparador(CUPONEUpdateaction(editcupon.newuser, editcupon.newcantidad, editcupon.valides, editcupon.codigo))
      disparador(getCUPONES())
      //insertar edicion misma cantidad pero valides y user nuevos
    } else if (editcupon.newuser !== "" && editcupon.newcantidad === 0 && editcupon.newvalides !== null) {
      disparador(CUPONEUpdateaction(editcupon.newuser, editcupon.cantidad, editcupon.newvalides, editcupon.codigo))
      disparador(getCUPONES())
      //insertar edicion misma cantidad y user pero valides nueva
    } else if (editcupon.newuser === "" && editcupon.newcantidad !== 0 && editcupon.newvalides !== null) {
      disparador(CUPONEUpdateaction(editcupon.user, editcupon.cantidad, editcupon.newvalides, editcupon.codigo))
      disparador(getCUPONES())
    } else {
      message.error({
        content: "Error al actualizar verifique los datos",

        style: {
          marginTop: "13vh",
          float: "right",
        },
      });
    }
    disparador(getCUPONES())

    setediting(false)
  }


  React.useEffect(() => {
    if (editing === false) {
      SCupones.CUPON.map(element => (
        seteditcupon({
          ...editcupon,
          user: element.INDEX_user,

          cantidad: element.cantidad,
          valides: element.tiempo_valido,
          codigo: element.codigo


        })
      ));

    }
  }, [editing, SCupones.CUPON])
  const editar = React.useCallback((value) => {

    setediting(false)
    disparador(getCUPON(value));
    message.loading({
      content: "Cargando datos para editar",
      duration: 2,
      style: {
        marginTop: "13vh",
        float: "right",
      },
    });
    setTimeout(() => {

      setediting(true)
      window.scrollTo(0, 0)
    }, 2000);

  }, [disparador])
  const submit = (e) => {
    e.preventDefault();
    if (cupones.user) {
      if (cupones.codigo) {
        if (cupones.valor) {
          if (cupones.cantidad) {
            if (cupones.valides) {
              disparador(setCUPONES(cupones.user, cupones.codigo, cupones.valor, cupones.cantidad, cupones.valides))
              disparador(getCUPONES())
              setTimeout(() => {
                setcupones({
                  user: "",
                  valor: "",
                  cantidad: "",
                  vigencia: "",
                  valides: null,
                  codigo: ""
                })
              }, 1000);
            }
          }
        }
      }
    }
  }
  const changevalor = (value) => {
    setcupones({ ...cupones, valor: value });
    if (value === "1") { setcupones({ ...cupones, codigo: "5A" + Math.floor(Math.random() * 1000), valor: "5000" }) } else if (value === "2") { setcupones({ ...cupones, codigo: "10B" + Math.floor(Math.random() * 999), valor: "10000" }) } else if (value === "3") { setcupones({ ...cupones, codigo: "30C" + Math.floor(Math.random() * 99), valor: "30000" }) };
  }
  const changevalides = (value) => {

    var fecha = new Date();


    var vigencia = new Date(fecha.setDate(fecha.getDate() + parseInt(value)));
    setcupones({ ...cupones, valides: vigencia.toISOString().split("T")[0] })
    seteditcupon({ ...editcupon, newvalides: vigencia.toISOString().split("T")[0] })
  }
  return (
    <>
      <div class="main mt-5 ml-10">
        {editing === false ?
          <CardAmplio
            title="Nuevo código de descuento"
            content={
              <form >
                <div className="ed-grid lg-grid-4">
                  <div className="form-group">
                    <label className="text-ups">Cantidad</label>
                    <input
                      type="number"
                      name="cantidad"
                      required
                      className="form-control"
                      onChange={(e) => {
                        setcupones({ ...cupones, cantidad: e.target.value });
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="text-ups">Valor</label>
                    <Select
                      name="Valor"
                      showSearch
                      placeholder="Selecciona un Valor"
                      title="Valor"
                      onChange={(value) => {
                        changevalor(value)
                      }}

                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >

                      <Select.Option value="1">
                        $ 5000
                      </Select.Option>
                      <Select.Option value="2">
                        $ 10000
                      </Select.Option>
                      <Select.Option value="3">
                        $ 30000
                      </Select.Option>

                    </Select>
                  </div>

                  <div className="form-group">
                    <label className="text-ups">Usuario</label>
                    <Select
                      name="Usuario"
                      showSearch
                      placeholder="Selecciona un Usuario"
                      title="Usuario"
                      onChange={(value) => {
                        setcupones({ ...cupones, user: value });
                      }}
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {Users.users.map((User) => (
                        <Select.Option key={User.id_user}>
                          {User.nombre}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>

                  <div className="form-group">
                    <label className="text-ups">Vigencia</label>
                    <Select
                      name="Vigencia"
                      showSearch
                      placeholder="Selecciona la Vigencia"
                      title="Vigencia"
                      onChange={(value) => {
                        changevalides(value)

                      }}

                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Select.Option value="3">
                        3 Dias
                      </Select.Option>
                      <Select.Option value="5">
                        5 Dias
                      </Select.Option>
                      <Select.Option value="7">
                        7 Dias
                      </Select.Option>
                    </Select>
                  </div>
                </div>

                <br />

                <div className="center">
                  <button className="bttn btn-Card text-ups" onClick={submit}>Crear códigos</button>
                </div>
              </form>
            }
          /> : <CardAmplio
            title="Editar código de descuento"
            content={
              <>

                <form >

                  <div className="ed-grid lg-grid-4">
                    <div className="form-group">
                      <label className="text-ups">Cantidad</label>
                      <input
                        type="number"
                        name="newcantidad"
                        required
                        className="form-control"
                        value={editcupon.newcantidad === 0 ? editcupon.cantidad : editcupon.newcantidad}
                        onChange={(e) => {
                          seteditcupon({ ...editcupon, newcantidad: e.target.value });
                        }}
                      />
                    </div>



                    <div className="form-group">
                      <label className="text-ups">Usuario</label>
                      <Select
                        name="newUsuario"
                        showSearch
                        placeholder="Selecciona un Usuario"
                        title="Usuario"
                        value={editcupon.newuser === "" ? editcupon.user : editcupon.newuser}
                        onChange={(value) => {
                          seteditcupon({ ...editcupon, newuser: value });
                        }}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {Users.users.map((User) => (
                          <Select.Option key={User.id_user}>
                            {User.nombre}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>

                    <div className="form-group">
                      <label className="text-ups">Vigencia</label>
                      <Select
                        name="newVigencia"
                        showSearch
                        placeholder="Selecciona la Vigencia"
                        title="Vigencia"

                        onChange={(value) => {
                          changevalides(value)

                        }}

                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Select.Option value="3">
                          3 Dias
                      </Select.Option>
                        <Select.Option value="5">
                          5 Dias
                      </Select.Option>
                        <Select.Option value="7">
                          7 Dias
                      </Select.Option>
                      </Select>
                    </div>
                  </div>

                  <br />

                  <div className="center">
                    <button className="bttn btn-Card text-ups" onClick={submitedit}>Editar código</button>
                  </div>
                </form></>
            }
          />
        }

        <br /><br />
        <CardAmplio
          title="Códigos de descuento de instalación"
          content={
            <MuiDT
              columns={[
                {
                  name: "codigo",
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
                  name: "INDEX_user",
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
                  name: "tiempo_valido",
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
                  name: "cantidad",
                  label: "Cantidad",
                  options: {
                    filter: true,
                    sort: false,
                    onDownload: (buildHead, buildBody, columns, data) => {
                      return "\uFEFF" + buildHead(columns) + buildBody(data);
                    },
                  },
                },
                {
                  name: "codigo",
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
                          <Button type="warning" className="btn-DT" onClick={() => { editar(value) }}>
                            Editar
                          </Button>

                          <Popconfirm
                            title="¿Seguro que desea eliminar este código?"
                            icon={<DeleteOutlined style={{ color: "red" }} />}
                            onConfirm={() => {
                              axios.get("https://api.workerapp.cl/api/deletecupones/" + value)
                                .then((res) => {
                                  message.success({
                                    content: "Cupon eliminado exitosamente",

                                    style: {
                                      marginTop: "13vh",
                                      float: "right",
                                    },
                                  });
                                  disparador(getCUPONES());
                                });
                            }}
                            cancelButtonProps={{
                              style: { backgroundColor: "#313131" },
                            }}
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
                SCupones.CUPONES
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
       <Segurity /> 
    </>
  );
}
