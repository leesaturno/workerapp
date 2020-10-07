import React, {Component} from 'react';
import './Controldeusuario.scss';

import Nav from '../../component/Nav/Nav'
import Menulateral from '../../component/Menulateral/Menulateral'
import Card from '../../component/Card/Card'
import Footer from '../../component/Footer/Footer'

function Controldeusuario() {
  return (
      <div>
        <Nav></Nav>
        <Menulateral></Menulateral>

        <div class="main mt-5 ml-10">
            <Card title="usuarios del sistema" btn="Nuevo usuario" href="/NewUser"></Card>
        </div>

        <Footer></Footer>
      </div>
  );
}

export default Controldeusuario;
