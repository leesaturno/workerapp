import React, {Component} from 'react';
import './Menulateral.scss';

import Icon from '../Icons/Icons'

function Menulateral() {
  return (
    <div className="sidebar">
      <div className="main-menu bxs">
        <div className="scroll">
          <ul className="nav flex-column">
            <li className="nav-item active">
              <a href="/bienvenida">
                <Icon name="home"/>
                <span>Inicio</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/Controldeusuario">
                <Icon name="users"/>
                <span>Control de usuarios</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/Evaluador">
                <Icon name="evaluador"/>
                <span>Evaluador</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="footer">
          <Icon name="toggle"/>
        </div>
      </div>
    </div>

  );
}

export default Menulateral;
