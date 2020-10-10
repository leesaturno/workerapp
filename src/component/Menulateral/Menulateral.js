import React, {useState, useEffect} from 'react';
import './Menulateral.scss';
import Icon from '../Icons/Icons'
import { useSelector } from 'react-redux';
import {Redirect,NavLink} from 'react-router-dom';

function Menulateral() {
    return (
      <div className="sidebar">
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
        </div>
      </div>

    );
}
//Si Dios con nosotros quien contra nosotros?.
export default Menulateral;
