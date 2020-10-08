import React, {Component} from 'react';
import './Nav.scss';

import Icon from '../Icons/Icons'
import Logo from '../../images/logo.png'
// import Drop from './dropdown'
import { Menu, Dropdown } from 'antd';

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="#">Perfil</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="#">Salir</a>
    </Menu.Item>
  </Menu>
)

function Nav() {
  return (
      <div>
        <nav className="navbar">
          <div className="navbar-right">
            <div className="user d-inline-block">
              <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                <img src={Logo} alt="Logo" />
                </a>
              </Dropdown>
            </div>
          </div>
        </nav>

      </div>
  );
}

export default Nav;