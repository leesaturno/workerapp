import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './page/Login/Login';
import Bienvenida from './page/Bienvenida/Bienvenida';
import Evaluador from './page/Evaluador/Evaluador';
import Controldeusuario from './page/Controldeusuario/Controldeusuario';
import NewUser from './page/Controldeusuario/NewUser';
//import
//Redux
import {Provider} from 'react-redux';
import GenerateStore from './Redux/store';
import 'react-toastify/dist/ReactToastify.css';
            

function App() {
  const store=GenerateStore();
  return (
    <Router>
      <Provider store={store}>
        <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/bienvenida' component={Bienvenida} />
            <Route exact path='/Login' component={Login} />
            <Route exact path='/Evaluador' component={Evaluador} /> 
            <Route exact path='/Controldeusuario' component={Controldeusuario} /> 
            <Route exact path='/NewUser' component={NewUser} />
            <Route render={() => <h1>Not found!</h1>} />
            {/*ruta*/}
        </Switch>
      </Provider>
    </Router>
  );
}

export default App;
