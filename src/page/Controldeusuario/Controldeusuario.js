import React, {Component} from 'react';
import './Controldeusuario.scss';

import Card from '../../component/Card/Card'
import MuiDT from "../../component/Datatable/MuiDT"
import Footer from '../../component/Footer/Footer'

function Controldeusuario() {
  return (
      <div>
        <div class="main mt-5 ml-10">
            <Card 
              title="usuarios del sistema" 
              btn="Nuevo usuario " 
              href="/NewUser"
              content= {<MuiDT></MuiDT>}
            ></Card>
        </div>

        <Footer></Footer>
      </div>
  );
}

export default Controldeusuario;
