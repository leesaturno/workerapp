import React, {Component} from 'react';
import './Controldeusuario.scss';

import Card from '../../component/Card/Card'
import MuiDT from "../../component/Datatable/MuiDT"
import Footer from '../../component/Footer/Footer'
import Segurity from '../../component/Segurity/Segurity';

import { ToastContainer, toast } from 'react-toastify';
import { Button } from 'antd';
import Global from '../../Global'
import axios from 'axios';


export default class ontroldeusuario extends Component {

  constructor(props) {
    super(props);

    this.state = {
        Users: []
    };

      this.url = Global.url;
  }

  componentWillMount(){
    axios.get(this.url + "users")
    .then(res => {
      const users = res.data;
      this.setState({ users:users });
    })
   }


  render(){
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
                                    <Button type="warning" className="btn-DT">Editar</Button>
                                    <Button type="danger" className="btn-DT">Eliminar</Button>
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
                        responsive: 'standard',
                        tableBodyHeight: '400px'
                      }}
                  />
                }
              />
          </div>

          <Footer></Footer>
          <Segurity/>
        </div>
    );
  }
}
