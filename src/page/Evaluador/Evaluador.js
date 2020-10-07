import React, {Component} from 'react';
import './Evaluador.scss';

import Nav from '../../component/Nav/Nav'
import Menulateral from '../../component/Menulateral/Menulateral'
import Footer from '../../component/Footer/Footer'

function Evaluador() {
  return (
      <div>
        <Nav></Nav>
        <Menulateral></Menulateral>

        <div class="main mt-10">
            <h1 class="text-ups">Evaluador</h1>
        </div>

        <Footer></Footer>
      </div>
  );
}

export default Evaluador;
