import React, {Component} from 'react';
import './Controldeusuario.scss';

import Card from '../../component/Card/Card'
import Footer from '../../component/Footer/Footer'
import {Table} from 'antd'
import Segurity from '../../component/Segurity/Segurity';

function Controldeusuario() {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
      <div>
        <div class="main mt-5 ml-10">
            <Card title="Usuarios del sistema" btn="Nuevo usuario" href="/NewUser" />
        </div>

        <Footer></Footer>
        <Segurity/>
      </div>
  );
}

export default Controldeusuario;
