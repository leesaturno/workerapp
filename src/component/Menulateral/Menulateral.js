import React, {useState, useEffect} from 'react';
import './Menulateral.scss';
import Icon from '../Icons/Icons'
import { useSelector } from 'react-redux';
import {Redirect,NavLink} from 'react-router-dom';

function Menulateral() {
  const user=useSelector(store=>store.session);
  const door=()=>{
    if(user.atividad==false){
     //return <Redirect to="/"/>
    }
  }
<<<<<<< HEAD


      
  return (
    <div className="sidebar">
      {
        door()
      }
      <div className="main-menu bxs">
        <div className="scroll">
          <ul className="nav flex-column">
            <li className="nav-item active">
            <NavLink to="/Bienvenida"><a>
                <Icon name="home"/>
                <span>Inicio</span>
              </a></NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/Controldeusuario"><a>
                <Icon name="users"/>
                <span>Control de usuarios</span>
              </a></NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/Evaluador"><a>
                <Icon name="evaluador"/>
                <span>Evaluador</span>
              </a>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="footer">
          <Icon name="toggle"/>
=======
  const [ocultar,setOcultar]=useState(true);
    return (
      <div className="sidebar">
        {
          door()
        }
        <div className="main-menu bxs">
          <div className="scroll">
            <ul className="nav flex-column">
              <li className="nav-item active">
              <NavLink to="/Bienvenida"><a>
                  <Icon name="home"/>
                  <span>Inicio</span>
                </a></NavLink>
              </li>
              <li className="nav-item">
              <NavLink to="/Controldeusuario"><a>
                  <Icon name="users"/>
                  <span>Control de usuarios</span>
                </a></NavLink>
              </li>
              <li className="nav-item">
              <NavLink to="/Evaluador"><a>
                  <Icon name="evaluador"/>
                  <span>Evaluador</span>
                </a>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="footer">
            <a><Icon name="toggle"/></a>
          </div>
>>>>>>> 8228d351ca36062b4bf711906e48134eae4ec832
        </div>
      </div>

    );
}
//Si Dios con nosotros quien contra nosotros?.
export default Menulateral;
