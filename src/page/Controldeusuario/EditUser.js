import React, {useState, useEffect} from 'react';
import './Controldeusuario.scss';
import {
    useHistory,
    useParams
  } from "react-router-dom";
  import axios from 'axios';
import CardStep from '../../component/Card/CardStep'
import Footer from '../../component/Footer/Footer'
import { Select } from 'antd';
// Redux 
import {useDispatch} from 'react-redux';
import {usuarioUpdateaction} from '../../Redux/Dusk/usuarioreducer';
import { ToastContainer, toast } from 'react-toastify';
import Segurity from '../../component/Segurity/Segurity';
function EditUser() {
    const disparador=useDispatch();
    let history = useHistory();
    let { id } = useParams();
    const [privilegios, setprivilegios]=useState([]);
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
     const [stop, setStop] = useState(false);
    

      useEffect(() => {
        if(stop=== false){
          axios.get(`https://api.workerapp.cl/api/users/`+id)
          .then(res => {
              const user = res.data;
              user.forEach(element => {
                  let username= element.username;       
                  
                  let email= element.email;
                  
                  let telefono= element.telefono;
                  
                  let cargo= element.cargo;
                  
                  let password= element.password;
    
       let cumpleanos= element.cumpleanos;
       
       let direccion= element.direccion;
       
       let telefono2= element.telefono2;
       
       let nombre= element.nombre;
       
       let privilegios= element.INDEX_privilegio;
       setClientes({...Clientes, user:username,
           email:email,
       password:password,
       password2:password,
       fNacimiento:cumpleanos,
       cargo:cargo,
       name:nombre,
       phone:telefono,
       cel:telefono2,
       privilegios:privilegios,
       direccion:direccion})
       console.log(user)
     });
  
    
    
   
     
   })
   axios.get("https://api.workerapp.cl/apiv2/privilegios")
   .then(res => {setprivilegios(res.data)})
        }
          return () =>   setStop(true);
      }, [setStop, stop, setClientes, Clientes,id]);
  
  
        const cargadedatos = (e)=>{
            setClientes({
              ...Clientes,
              [e.target.name] : e.target.value
          })
      }
    
      const enviarDatos = (e) => {
          
         e.preventDefault();
         if(Clientes.password===Clientes.password2){
            toast.success('Usuario actualizado con exito', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            disparador(usuarioUpdateaction(id,Clientes.user,Clientes.password,Clientes.privilegios,Clientes.name,Clientes.email,Clientes.fNacimiento,Clientes.direccion,Clientes.cargo,Clientes.phone,Clientes.cel,"43"));
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
    
            <CardStep title="Editar usuario"
              content={
                <form onSubmit={enviarDatos}>
                    <div className="ed-grid lg-grid-2">
                        <div className="form-group">
                            <label className="text-ups">Usuario</label>
                            <input type="text" name="user" required onChange={cargadedatos} value={Clientes.user} className="form-control"/> 
                        </div>

                        <div className="form-group">
                            <label className="text-ups">Correo electr&#243;nico</label>
                            <input type="email" name="email" onChange={cargadedatos} required value={Clientes.email} className="form-control" />
                        </div>
                    </div>

                    <br/>

                    <div className="ed-grid lg-grid-2">
                        <div className="form-group">
                            <label className="text-ups">Contraseña</label>
                            <input type="password" name="password" required onChange={cargadedatos} value={Clientes.password} className="form-control"/> 
                        </div>

                        <div className="form-group">
                            <label className="text-ups">Confirmar contraseña</label>
                            <input type="password" name="password2" required onChange={cargadedatos} value={Clientes.password2} className="form-control" />
                        </div>
                    </div>

                    <br/>

                    <div className="ed-grid lg-grid-3">
                        <div className="form-group">
                            <label className="text-ups">Fecha de nacimiento</label>
                            <input type="date" name="fNacimiento" required onChange={cargadedatos} value={Clientes.fNacimiento} className="form-control"/> 
                        </div>

                        <div className="form-group">
                            <label className="text-ups">Cargo</label>
                            <input type="text" name="cargo" required onChange={cargadedatos} value={Clientes.cargo} className="form-control" />
                        </div>

                        <div className="form-group">
                            <label className="text-ups">Nombre</label>
                            <input type="text" name="name" required onChange={cargadedatos} value={Clientes.name} className="form-control" />
                        </div>
                    </div>

                    <div className="ed-grid lg-grid-3">
                        <div className="form-group">
                            <label className="text-ups">Tel&#233;fono</label>
                            <input type="tel" name="phone" required onChange={cargadedatos} value={Clientes.phone} className="form-control"/> 
                        </div>

                        <div className="form-group">
                            <label className="text-ups">Celular</label>
                            <input type="tel" name="cel" required onChange={cargadedatos} value={Clientes.cel} className="form-control" />
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
                                value={Clientes.privilegios=== '1'? 'Admin': "Usuario"}
                                
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
                            <input type="text" name="direccion" required onChange={cargadedatos} value={Clientes.direccion} className="form-control" />
                        </div>
                    </div>
                  
                  
                  <button className="bttn btn-CB text-ups">Procesar</button>
                </form>

              }
            ></CardStep>
        </div>
        <ToastContainer/>
        <Footer></Footer>
    {/*     <Segurity/> */}
      </div>
  );
}

export default EditUser;
