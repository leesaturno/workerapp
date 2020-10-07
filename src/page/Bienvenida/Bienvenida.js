import React, {Component} from 'react';
import './Bienvenida.scss';

import Nav from '../../component/Nav/Nav'
import Menulateral from '../../component/Menulateral/Menulateral'
import Footer from '../../component/Footer/Footer'
import {useSelector} from 'react-redux'

function Bienvenida() {
  const user=useSelector(store=>store.session);
  return (
      <div>
        <Nav></Nav>
        <Menulateral ></Menulateral>

        <div className="main mt-10">
          <h1 className="text-ups">Bienvenido {user.user.map(Items=>{ return Items.nombre })}</h1>
        </div>

        <Footer></Footer>
      </div>
  );
}

export default Bienvenida;
