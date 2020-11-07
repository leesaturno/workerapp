import React, {useState,useEffect} from 'react';
import './Controldeusuario.scss';
import {
 
    useHistory,
  } from "react-router-dom";
import CardStep from '../../component/Card/CardStep'
import Footer from '../../component/Footer/Footer'
import { Select } from 'antd';
// Redux 
import {useDispatch} from 'react-redux';
import {usuarioinsertaction} from '../../Redux/Dusk/usuarioreducer';
import { ToastContainer, toast } from 'react-toastify';
import Segurity from '../../component/Segurity/Segurity';
import axios from 'axios';
function NewUser() {
    const disparador=useDispatch();
    let history = useHistory();
    const [privilegios, setprivilegios]=useState([]);
    const [Users,setUsers]=useState({
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
      useEffect(  ()=>{
         axios.get("https://api.workerapp.cl/apiv2/privilegios")
         .then(res => {setprivilegios(res.data)})
        
      },[])
      const cargadedatos = (e)=>{
            setUsers({
              ...Users,
              [e.target.name] : e.target.value
          })
      }
    
      const enviarDatos = (e) => {
         e.preventDefault();
         if(Users.password===Users.password2){
            toast.success('Usuario registrado con exito', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            disparador(usuarioinsertaction(Users.user,Users.password,Users.privilegios,Users.name,Users.email,Users.fNacimiento,Users.direccion,Users.cargo,Users.phone,Users.cel,Users.privilegios));
            let timeout=2000;
           setTimeout(() => {
            history.push("/Controldeusuario")
           }, timeout);
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
                            <label className="text-ups" >Privilegios</label>
                            <Select 
                                name="privilegios"
                                showSearch
                                placeholder="Selecciona un privilegio"
                                title="privilegios"
                                onChange={(value)=>{setUsers({...Users,
                                    privilegios : value})}}
                                onSearch={onSearch}
                                
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                  }
                                 
                            >
                          {privilegios.map((privilegio) => (
      <Select.Option key={privilegio.id_privilegio}>{privilegio.privilegio}</Select.Option>
    ))}
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
