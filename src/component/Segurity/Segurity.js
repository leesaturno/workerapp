import React from 'react';
import './Segurity.scss';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

function Segurity() {
  const user=useSelector(store=>store.session);  
  const door=()=>{
    if(user.atividad===false){
     return <Redirect to="/"/>
    }
  }
  return(<>{door()}</>);
}

export default Segurity;
