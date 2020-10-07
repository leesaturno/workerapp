import React from 'react';
import './Segurity.scss';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

function Segurity() {
  const user=useSelector(store=>store.session);
  const verif=()=>{
    if(user.atividad==false){  
      return <Redirect to="/"/>
    }else{
      return <Redirect to="/Bienvenida"/>
    }
  }
  return(<>{verif}</>);
}

export default Segurity;
