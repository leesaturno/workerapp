import React from 'react';

import {NavLink} from 'react-router-dom';
import { Menu } from 'antd';
import Icon from '../Icons/Icons';
import {
  HomeOutlined,
  UserSwitchOutlined,
  SafetyOutlined,
  CloudOutlined
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
      <div style={{ width: 256 }}>
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
          <Menu.Item key="4" icon={<CloudOutlined />}>
            <NavLink to="/Portafolio">
                 Portafolio
            </NavLink>
          </Menu.Item>

          {/* <SubMenu key="sub1" icon={<CloudOutlined />} title="Utilidades">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu> */}

          <div className="footer" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          <Icon name="toggle"/>
          </div>
        </Menu>

      </div>
    );
  }
}

export default Menua;