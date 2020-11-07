import React, {useState, useEffect } from 'react';
import '../../App';
import './Login.scss';
import Logo from '../../images/logo.png';
//redux
import {useDispatch,useSelector} from 'react-redux';
import {LoginAction} from '../../Redux/Dusk/loginreducer';
//toast
import { ToastContainer } from 'react-toastify';

function Login(props){
  const disparador=useDispatch();
  const user=useSelector(store=>store.session);

  const [Datos,setDatos]=useState({
    usuario:"",
    password:""
  })

  const [bandera,setbandera]= useState(true);

  useEffect(() => {
      if(user.atividad===true){
            setTimeout(() => {
              setbandera(true);
              props.history.push("/Bienvenida");
            }, 3000);
      }
  });
  
  const cargadedatos = (e)=>{
        setDatos({
          ...Datos,
          [e.target.name] : e.target.value
      })
  }

  const enviarDatos = (e) => {
     e.preventDefault();
     disparador(LoginAction(Datos.usuario,Datos.password));
  }

  return (
    <div className="Bg-gradient">
      <div className="ed-grid"></div>
      <article className="border-login card-dark card-Lg">
        {/*Contenedor de la imagen*/}
        <div>
          <img src={Logo} alt="Logo" />
        </div>
        {/*Contenido*/}
        <form onSubmit={(e)=>{enviarDatos(e); setbandera(false)}} className="s-pxy-3">
          <div className="form-group">
            <label>Usuario</label>
            <input type="text" name="usuario" onChange={cargadedatos} required  className="form-control" />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input name="password" className="form-control" onChange={cargadedatos} required type="password" />
          </div>
          <div className="form-group">
            <label className="custom-radio-checkbox">
              {/* Input oculto */}
              <input className="custom-radio-checkbox__input" type="checkbox" name="recuerdame" defaultValue="recuerdame" />
              {/* Imagen en sustitucion */}
              <span className="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox" />
              {/* Texto */}
              <span className="custom-radio-checkbox__text">Recuerdame</span>
            </label>
          </div>
          <button className="bttn" disabled={()=> {return bandera}}>Autenticar</button>
        </form>
      </article>
      <ToastContainer/>
    </div>
  );
}

export default Login;
