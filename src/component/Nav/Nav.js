import React from 'react';
import './Nav.scss';

import {NavLink} from 'react-router-dom';
import Logo from '../../images/logo.png'
// import Drop from './dropdown'
import { Menu, Dropdown } from 'antd';

const menu = (
  <Menu>
    <Menu.Item key="0">
      <NavLink to="/Perfil">
        Perfil
      </NavLink>
    </Menu.Item>
    <Menu.Item key="1">
      <NavLink to="#">
        Salir
      </NavLink>
    </Menu.Item>
  </Menu>
)

function Nav(props) {
  const verif=()=>{
    console.log(props);
  }
  return (
      <div>
        {verif()}
        <nav className="navbar">
          <div className="navbar-right">
            <div className="user d-inline-block">
              <Dropdown overlay={menu} trigger={['click']}>
                <NavLink to="#" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  <img src={Logo} alt="Logo" />
                </NavLink>
              </Dropdown>
            </div>
          </div>
        </nav>

      </div>
  );
}

export default Nav;