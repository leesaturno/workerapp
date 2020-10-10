import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route,Fade } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import Nav from './component/Nav/Nav'
import Menua from './component/Menulateral/Menu'

import Login from './page/Login/Login';
import Bienvenida from './page/Bienvenida/Bienvenida';
import Evaluador from './page/Evaluador/Evaluador';
import Controldeusuario from './page/Controldeusuario/Controldeusuario';
import NewUser from './page/Controldeusuario/NewUser';
import Perfil from './page/Perfil/Perfil'
//Redux
import {Provider} from 'react-redux';
import GenerateStore from './Redux/store';
import 'react-toastify/dist/ReactToastify.css';
            

function App() {
  
  const store=GenerateStore();
  return (
    <Router>
      <Provider store={store}>
        <Route path={["/bienvenida","/Evaluador","/Controldeusuario","/NewUser", "/Perfil"]} >
          <Nav/>
          <Menua/>
        </Route>

        <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 1 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
        >
          <Route exact path='/' component={Login} />
          <Route exact path='/bienvenida' component={Bienvenida} />
          <Route exact path='/Login' component={Login} />
          <Route exact path='/Evaluador' component={Evaluador} /> 
          <Route exact path='/Controldeusuario' component={Controldeusuario} /> 
          <Route exact path='/NewUser' component={NewUser} />
          <Route exact path='/Perfil' component={Perfil} />
          <Route render={() => <h1>Not found!</h1>} />
          {/*ruta*/}
        </AnimatedSwitch>
      </Provider>
    </Router>
  );
}

export default App;
