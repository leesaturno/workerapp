import React, {useEffect, useState} from 'react';
import './Controldeusuario.scss';

import Card from '../../component/Card/Card'
import MuiDT from "../../component/Datatable/MuiDT"
import Footer from '../../component/Footer/Footer'
import Segurity from '../../component/Segurity/Segurity';
import { UserDeleteOutlined } from '@ant-design/icons';

import { Button,Popconfirm, message } from 'antd';
import Global from '../../Global'
import axios from 'axios';
import {
  
  
  Redirect
  
} from "react-router-dom";
import {getusuarios} from '../../Redux/Dusk/usuarioreducer';
import {useDispatch,useSelector} from 'react-redux';
export default function Controldeusuario()  {
  const Users = useSelector(store => store.Usuarios);
const [localusers,setlocalusers]=useState([]);
 const [redirect, setredirect]=useState('')
 const disparador=useDispatch();
  useEffect(() =>{
    disparador(getusuarios())
    setlocalusers(Users.users)
    return () =>  { if (Users.users !== localusers) {
      disparador(getusuarios())
    }};
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [disparador]);
 


  

  
 function cancel(e) {
    return (

      message.error('Cancelado')
    );
  }

  const rediredionar = ()=>{
    if (redirect) {
      return <Redirect to={redirect} />
    }}
    return (
        <div>
          <div class="main mt-5 ml-10">
          {rediredionar()}
              <Card 
                title="Control de usuarios" 
                btn="Nuevo usuario " 
                href="/NewUser" 
                content={
                 
                  <MuiDT
                  
                      columns= {[
                          {
                            name: "nombre",
                            label: "Nombre",
                            options: {
                              filter: true,
                              sort: true,
                              onDownload: (buildHead, buildBody, columns, data) => {
    return "\uFEFF" + buildHead(columns) + buildBody(data); 
} 
                            }
                          },
                          {
                            name: "email",
                            label: "Email",
                            options: {
                              filter: true,
                              sort: false,onDownload: (buildHead, buildBody, columns, data) => {
    return "\uFEFF" + buildHead(columns) + buildBody(data); 
} 
                            }
                          },
                          {
                            name: "telefono",
                            label: "Telefono",
                            options: {
                              filter: true,
                              sort: false,
                              onDownload: (buildHead, buildBody, columns, data) => {
    return "\uFEFF" + buildHead(columns) + buildBody(data); 
} 
                            }
                          },
                          {
                            name: "username",
                            label: "Username",
                            options: {
                              filter: true,
                              sort: false,
                              onDownload: (buildHead, buildBody, columns, data) => {
    return "\uFEFF" + buildHead(columns) + buildBody(data); 
} 
                            }
                          },
                          {
                            name: "username",
                            label: "Acciones",
                            options: {
                              filter: true,
                              sort: false,
                              empty: true,
                              onDownload: (buildHead, buildBody, columns, data) => {
    return "\uFEFF" + buildHead(columns) + buildBody(data); 
} ,
                              customBodyRender: (value, row ) => {
                                return (
                                  <>
                                    <Button type="warning" className="btn-DT" onClick={()=> { 
                                  setredirect( "/EditUser/"+value);}}>Editar</Button>

                                    <Popconfirm
                                      title="¿Seguro que desea eliminar este usuario?"
                                      icon={<UserDeleteOutlined style={{ color: 'red' }} />}
                                      onConfirm={()=>{axios.get(Global.url +'deleteusers/'+value)
                                      .then(res => {
                                        message.success({ content:'Usuario eliminado exitosamente', 
 
                                          style: {
                                            marginTop: '13vh', float: 'right',
                                          }
                                        });
                                                disparador(getusuarios())   
                                        
                                          })
                                        }}
                                      onCancel={cancel}
                                      okText="Si"
                                      cancelText="No"
                                      >
                                      <Button type="danger" className="btn-DT">Eliminar</Button>
                                    </Popconfirm> 
                                  </>
                                );
                              }
                            }      
                          },
                      ]}

                      data = {
                        Users.users
                      }

                      options = {{
                        filter: true,
                        filterType: 'dropdown',
                        responsive: 'vertical',
                        tableBodyHeight: '400px', textLabels: {
                        pagination: {
      next: "Siguiente",
      previous: "Anterior",
      rowsPerPage: "Filas por pagina:",
      displayRows: "de",
    },  filter: {
      all: "TODOS",
      title: "FILTROS",
      reset: "REINICIAR",
    }, body: {
      noMatch: "Lo sentimos, sin registros encontrados",
      toolTip: "Filtrar",
      columnHeaderTooltip: column => `Filtrar por ${column.label}`
    },toolbar: {
      search: "Buscar",
      downloadCsv: "Descargar CSV",
      print: "Imprimir",
      viewColumns: "Ver columnas",
      filterTable: "Filtrar Tablas",
    },viewColumns: {
      title: "Mostrar Columnas",
      titleAria: "Mostrar/Ocultar Columnas",
    },
    selectedRows: {
      text: "Filas Seleccionadas",
      delete: "Elimiar",
      deleteAria: "Eliminar Filas Seleccionadas",
    },
                        // tableBodyMaxHeight: ''
                      }}}
                  /> 
                }
              />
          </div>

          <Footer></Footer>
          <Segurity/> 
        </div>
    );
  }
