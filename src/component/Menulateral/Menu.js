import React, {Component} from 'react';
import { useSelector } from 'react-redux';
import {Redirect,NavLink} from 'react-router-dom';
import { Menu, Button } from 'antd';
import Icon from '../Icons/Icons'
import {
  HomeOutlined,
  UserSwitchOutlined,
  SafetyOutlined
} from '@ant-design/icons';

import './Menulateral.scss';

const { SubMenu } = Menu;

class Menua extends React.Component {
  state = {
    collapsed: true,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <div>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
          <NavLink to="/Bienvenida">
                 Inicio
           </NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserSwitchOutlined />}>
             <NavLink to="/Controldeusuario">
                 Control de usuarios
             </NavLink>
           </Menu.Item>
          <Menu.Item key="3" icon={<SafetyOutlined />}>
            <NavLink to="/Evaluador">
                 Evaluador
            </NavLink>
          </Menu.Item>

          <div className="footer" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          <Icon name="toggle"/>
          </div>
        </Menu>

      </div>
    );
  }
}

export default Menua;