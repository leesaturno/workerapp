import React, {Component} from 'react';
import './Controldeusuario.scss';

import Card from '../../component/Card/Card'
import MuiDT from "../../component/Datatable/MuiDT"
import Footer from '../../component/Footer/Footer'
import Segurity from '../../component/Segurity/Segurity';

import { ToastContainer, toast } from 'react-toastify';
import { Button,Popconfirm, message } from 'antd';
import Global from '../../Global'
import axios from 'axios';
import {
  
  Link,
  Redirect
  
} from "react-router-dom";

export default class Controldeusuario extends Component {

  constructor(props) {
    super(props);

    this.state = {
        Users: [],
        redirect:''
    };

      this.url = Global.url;
      this.confirm = this.confirm.bind(this);
      this.cancel = this.cancel.bind(this);
  }
componentDidMount(){
  axios.get(this.url + "users")
    .then(res => {
      const users = res.data;
      this.setState({ users:users });
    })
}
  componentWillMount(){
    axios.get(this.url + "users")
    .then(res => {
      const users = res.data;
      this.setState({ users:users });
    })
   }

   shouldComponentUpdate( nextState) {    
    
    // Si retornamos true, se volverá a renderizar el componente

    // Si retornamos true, se volverá a renderizar el componente
    if (this.state.users !== nextState.users) {
      return true;
    }    else return false;

    // Si retornamos false, evitaremos el método render
    
  }

 confirm(e) {
    console.log(e);
    

    
  }
  
   cancel(e) {
    console.log(e);
    message.error('Click on No');
  }

  render(){
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
        <div>
          <div class="main mt-5 ml-10">
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
                            }
                          },
                          {
                            name: "email",
                            label: "Email",
                            options: {
                              filter: true,
                              sort: false,
                            }
                          },
                          {
                            name: "telefono",
                            label: "Telefono",
                            options: {
                              filter: true,
                              sort: false,
                            }
                          },
                          {
                            name: "username",
                            label: "Username",
                            options: {
                              filter: true,
                              sort: false,
                            }
                          },
                          {
                            name: "username",
                            label: "Acciones",
                            options: {
                              filter: true,
                              sort: false,
                              empty: true,
                              customBodyRender: (value, row ) => {
                                return (
                                  <>
                                    <Button type="warning" className="btn-DT" onClick={()=> { 
                                    this.setState({ redirect: "/EditUser"});}}>Editar</Button>

                                    <Popconfirm
                                      title="¿Seguro que desea eliminar?"
                                      onConfirm={()=>{axios.get(this.url +'deleteusers/'+value)
                                      .then(res => {
                                        message.success('Click on Yes');
                                          console.log(res);
                                          
                                          axios.get(this.url + "users")
                                            .then(res => {
                                              const users = res.data;
                                              this.setState({ users:users });
                                            })
                                    })
                                  }}
                                      onCancel={this.cancel}
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
                        this.state.users
                      }

                      options = {{
                        filter: true,
                        filterType: 'dropdown',
                        responsive: 'vertical',
                        tableBodyHeight: '400px',
                        // tableBodyMaxHeight: ''
                      }}
                  />
                }
              />
          </div>

          <Footer></Footer>
{/*           <Segurity/> */}
        </div>
    );
  }
}
