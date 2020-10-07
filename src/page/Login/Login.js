import React, {useState, useEffect } from 'react';
import '../../App';
import './Login.scss';

import Logo from '../../images/logo.png';
import {Redirect} from 'react-router-dom';
//redux
import {useDispatch,useSelector} from 'react-redux';
import {LoginAction} from '../../Redux/Dusk/loginreducer';

function Login(props){
  const disparador=useDispatch();
  const user=useSelector(store=>store.session);

  const [Datos,setDatos]=useState({
    usuario:"",
    password:""
  })

  useEffect(() => {
    if(user.atividad==true){
      props.history.push("/Bienvenida");
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
        <form onSubmit={(e)=>{enviarDatos(e);}} className="s-pxy-3">
          <div className="form-group">
            <label>USUARIO</label>
            <input type="text" name="usuario" onChange={cargadedatos} className="form-control" />
          </div>
          <div className="form-group">
            <label>CONTRASE'A</label>
            <input name="password" className="form-control" onChange={cargadedatos} type="password" />
          </div>
          <div className="form-group">
            <label className="custom-radio-checkbox">
              {/* Input oculto */}
              <input className="custom-radio-checkbox__input" type="checkbox" name="recuerdame" defaultValue="recuerdame" />
              {/* Imagen en sustitucion */}
              <span className="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox" />
              {/* Texto */}
              <span className="custom-radio-checkbox__text">RECUERDAME</span>
            </label>
          </div>
          <button className="bttn">AUTENTICAR</button>
        </form>
      </article>
    </div>
  );
}

export default Login;
