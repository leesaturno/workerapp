import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './page/Login/Login';
import Bienvenida from './page/Bienvenida/Bienvenida';
import Evaluador from './page/Evaluador/Evaluador';
import Controldeusuario from './page/Controldeusuario/Controldeusuario';
//import
            
            

function App() {
  return (
    <Router>
      <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/bienvenida' component={Bienvenida} />
          <Route path='/Login' component={Login} />
          <Route path='/Evaluador' component={Evaluador} /> 
          <Route path='/Controldeusuario' component={Controldeusuario} /> 
          {/*ruta*/}
      </Switch>
    </Router>
  );
}

export default App;
