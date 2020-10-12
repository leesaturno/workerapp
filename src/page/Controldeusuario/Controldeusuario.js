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


export default class Controldeusuario extends Component {

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
 confirm(e) {
    console.log(e);
    message.success('Click on Yes');
  }
  
   cancel(e) {
    console.log(e);
    message.error('Click on No');
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
                                    <Popconfirm
    title="Are you sure delete this task?"
    onConfirm={this.confirm.bind(this)}
    onCancel={this.cancel.bind(this)}
    okText="Yes"
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
          <Segurity/>
        </div>
    );
  }
}
