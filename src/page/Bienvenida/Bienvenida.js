import React from 'react';
import './Bienvenida.scss';

import Footer from '../../component/Footer/Footer'
import {useSelector} from 'react-redux'
import Segurity from '../../component/Segurity/Segurity';

function Bienvenida() {
  const user=useSelector(store=>store.session);
  return (
      <div>
        <div className="main mt-10 ml-5">
          <h1 className="text-ups">Bienvenido   <br/>
           {user.user.map(Items=>{ return Items.nombre })}</h1>
        </div>

        <Footer></Footer>
        <Segurity/>
      </div>
  );
}

export default Bienvenida;
