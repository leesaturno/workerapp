import React, {Component, useEffect} from 'react';
import './Bienvenida.scss';

import Nav from '../../component/Nav/Nav'
import Menulateral from '../../component/Menulateral/Menulateral'
import Footer from '../../component/Footer/Footer'

function Bienvenida() {
  return (
      <div>
        <Nav></Nav>
        <Menulateral ></Menulateral>

        <div className="main mt-10">
            <h1 className="text-ups">Bienvenido (NOMBRE DE USUARIO)</h1>
        </div>

        <Footer></Footer>
      </div>
  );
}

export default Bienvenida;
