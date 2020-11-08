import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";

import Nav from "./component/Nav/Nav";
import Menua from "./component/Menulateral/Menu";

import Login from "./page/Login/Login";
import Bienvenida from "./page/Bienvenida/Bienvenida";
import Evaluador from "./page/Evaluador/Evaluador";
import Controldeusuario from "./page/Controldeusuario/Controldeusuario";
import NewUser from "./page/Controldeusuario/NewUser";
import EditUser from "./page/Controldeusuario/EditUser";
import Perfil from "./page/Perfil/Perfil";
import Verificador from "./page/Verificador/Verificador";
import Error from "./page/Error/Error";
import Portafolio from "./page/Portafolio/Portafolio";

//import
//Redux
import { Provider } from "react-redux";
import GenerateStore from "./Redux/store";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const store = GenerateStore();
  return (
    <Router>
      <Provider store={store}>
        <Route
          path={[
            "/bienvenida",
            "/Evaluador",
            "/Controldeusuario",
            "/NewUser",
            "/EditUser",
            "/Perfil",
            "/Portafolio",
          ]}
        >
          <Nav />
          <Menua />
        </Route>

        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 1 }}
          atActive={{ opacity: 1 }}
          className="switch-wrapper"
        >
          <Route exact path="/" component={Login} />
          <Route exact path="/bienvenida" component={Bienvenida} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Evaluador" component={Evaluador} />
          <Route exact path="/Controldeusuario" component={Controldeusuario} />
          <Route exact path="/NewUser" component={NewUser} />
          <Route exact path="/EditUser/:id" component={EditUser} />
          <Route exact path="/Perfil" component={Perfil} />
          <Route exact path="/Verificador/:id" component={Verificador} />
          <Route exact path="/Portafolio" component={Portafolio} />
          <Route render={() => <Error />} />
          {/*ruta*/}
        </AnimatedSwitch>
      </Provider>
    </Router>
  );
}

export default App;
