import React, {Component} from 'react';
import './Nav.scss';

import Icon from '../Icons/Icons'
import Logo from '../../images/logo.png'

function Nav() {
  return (
      <div>
        <nav className="navbar fixed-top">
          <div className="navbar-left">
            <a href="#" className="menu-button-mobile">
              <Icon name="toggle"/>
            </a>
          </div>
          <div className="navbar-right">
            <div className="user d-inline-block">
              <div className="dropdown-menu-right dropdown">
                <button type="button" aria-haspopup="true" aria-expanded="false" className="p-0 btn btn-empty">
                  <img src={Logo} alt="Logo" />
                </button>
              </div>
            </div>
          </div>
        </nav>

      </div>
  );
}

export default Nav;