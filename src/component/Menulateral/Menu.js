import React, {useState} from "react";

import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import Icon from "../Icons/Icons";
import {
  HomeOutlined,
  UserSwitchOutlined,
  SafetyOutlined,
  CloudOutlined,
  CodeOutlined,
} from "@ant-design/icons";

import "./Menulateral.scss";
import { useSelector } from 'react-redux';
export default function Menua() {

  const { SubMenu } = Menu;

  const [collapsed, setcollapsed] = useState(true);
  const [role, setrole] =useState('');
  const Usuar = useSelector((store) => store.session);
  const toggleCollapsed = () => {
    setcollapsed(!collapsed);
  };
const getrole=()=>{
  Usuar.user.forEach(element => {
    setrole(element.INDEX_privilegio)
  });
}
React.useEffect(()=>{
  getrole()
},[])
  return (
    <div>
   
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <NavLink to="/Bienvenida">Inicio</NavLink>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserSwitchOutlined />}>
          <NavLink to="/Controldeusuario">Control de usuarios</NavLink>
        </Menu.Item>
        <Menu.Item key="3" icon={<SafetyOutlined />}>
          <NavLink to="/Evaluador">Evaluador</NavLink>
        </Menu.Item>
        <Menu.Item key="4" icon={<CloudOutlined />}>
          <NavLink to="/Portafolio">Portafolio</NavLink>
        </Menu.Item>
      { role === "1"?
      <>
        <SubMenu key="sub1" icon={<CodeOutlined />} title="Utilidades">
          <Menu.Item key="5">
            <NavLink to="/CodInstalacion">Códigos instalación</NavLink>
          </Menu.Item>
          <Menu.Item key="6">
            <NavLink to="/CodMensualidad">Códigos mensualidad</NavLink>
          </Menu.Item>
        </SubMenu> </>:""
      }
        <div
          className="footer"
          onClick={toggleCollapsed}
          style={{ marginBottom: 16 }}
        >
          <Icon name="toggle" />
        </div>
      </Menu>
    </div>
  );
}


