import React, {Component} from 'react';
import '../../App';
import './Login.scss';

import Logo from '../../images/logo.png'
//redux
import {useDispatch,useSelector} from 'react-redux';
import {LoginAction} from '../../Redux/Dusk/loginreducer';

function Login(){
  const disparador=useDispatch();
  const user=useSelector(store=>store.session.user);
  return (
    <div className="Bg-gradient">
      <article className="border-login card-dark card-Lg">
        {/*Contenedor de la imagen*/}
        <img src={Logo} />

        {/*Contenido*/}
        <form action="/bienvenida" className="s-mb-0">
          <div className="form-group">
            <label>USUARIO</label>
            <input type="email" name="email" className="form-control" />
          </div>
          <div className="form-group">
            <label>CONTRASE'A</label>
            <input name="password" className="form-control" type="password" />
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
