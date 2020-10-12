import React, {useState} from 'react';
import './Controldeusuario.scss';

import CardStep from '../../component/Card/CardStep'
import Footer from '../../component/Footer/Footer'
import { Select } from 'antd';
// Redux 
import {useDispatch} from 'react-redux';
import {usuarioinsertaction} from '../../Redux/Dusk/usuarioreducer';
import { ToastContainer, toast } from 'react-toastify';
import Segurity from '../../component/Segurity/Segurity';
function NewUser() {
    const disparador=useDispatch();
    const [Clientes,setClientes]=useState({
        user:"",
        email:"",
        password:"",
        password2:"",
        fNacimiento:"",
        cargo:"",
        name:"",
        phone:"",
        cel:"",
        privilegios:"",
        direccion:""
      })
      
      const cargadedatos = (e)=>{
            setClientes({
              ...Clientes,
              [e.target.name] : e.target.value
          })
      }
    
      const enviarDatos = (e) => {
         e.preventDefault();
         if(Clientes.password==Clientes.password2){
            toast.success('Usuario registrado con exito', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            disparador(usuarioinsertaction(Clientes.user,Clientes.password,Clientes.privilegios,Clientes.name,Clientes.email,Clientes.fNacimiento,Clientes.direccion,Clientes.cargo,Clientes.phone,Clientes.cel,"1"));
         }else{
            toast.warn('¡las contraseñas no son iguales!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
         }
      }
    const { Option } = Select;
      
    const onSearch=(val) => {
        console.log('search:', val);
    }
    
  return (
      <div>
        <div className="main mt-5 ml-10">
            <CardStep title="Nuevo usuario"
              content={
                <form onSubmit={enviarDatos}>
                    <div className="ed-grid lg-grid-2">
                        <div className="form-group">
                            <label className="text-ups">Usuario</label>
                            <input type="text" name="user" required onChange={cargadedatos} className="form-control"/> 
                        </div>

                        <div className="form-group">
                            <label className="text-ups">Correo electr&#243;nico</label>
                            <input type="email" name="email" onChange={cargadedatos} required className="form-control" />
                        </div>
                    </div>

                    <br/>

                    <div className="ed-grid lg-grid-2">
                        <div className="form-group">
                            <label className="text-ups">Contraseña</label>
                            <input type="password" name="password" required onChange={cargadedatos} className="form-control"/> 
                        </div>

                        <div className="form-group">
                            <label className="text-ups">Confirmar contraseña</label>
                            <input type="password" name="password2" required onChange={cargadedatos} className="form-control" />
                        </div>
                    </div>

                    <br/>

                    <div className="ed-grid lg-grid-3">
                        <div className="form-group">
                            <label className="text-ups">Fecha de nacimiento</label>
                            <input type="date" name="fNacimiento" required onChange={cargadedatos} className="form-control"/> 
                        </div>

                        <div className="form-group">
                            <label className="text-ups">Cargo</label>
                            <input type="text" name="cargo" required onChange={cargadedatos} className="form-control" />
                        </div>

                        <div className="form-group">
                            <label className="text-ups">Nombre</label>
                            <input type="text" name="name" required onChange={cargadedatos} className="form-control" />
                        </div>
                    </div>

                    <div className="ed-grid lg-grid-3">
                        <div className="form-group">
                            <label className="text-ups">Tel&#233;fono</label>
                            <input type="tel" name="phone" required onChange={cargadedatos} className="form-control"/> 
                        </div>

                        <div className="form-group">
                            <label className="text-ups">Celular</label>
                            <input type="tel" name="cel" required onChange={cargadedatos} className="form-control" />
                        </div>
                    
                        <div className="form-group">
                            <label className="text-ups" required    >Privilegios</label>
                            <Select 
                                name="privilegios"
                                showSearch
                                placeholder="Selecciona un privilegio"
                                title="privilegios"
                                onChange={(value)=>{setClientes({...Clientes,
                                    privilegios : value})}}
                                onSearch={onSearch}
                                defaultValue='Admin'
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                  }
                            >
                                <Option value="1">Admin</Option>
                                <Option value="2">Usuario</Option>
                            </Select>
                        </div>
                    </div>

                    <br/>
                    <div className="ed-grid">
                        <div className="form-group">
                            <label className="text-ups">Direcci&#243;n</label>
                            <input type="text" name="direccion" required onChange={cargadedatos} className="form-control" />
                        </div>
                    </div>
                  
                  
                  <button className="bttn btn-CB text-ups">Procesar</button>
                </form>

              }
            ></CardStep>
        </div>
        <ToastContainer/>
        <Footer></Footer>
        <Segurity/>
      </div>
  );
}

export default NewUser;
