import React, {Component} from 'react';
import './Controldeusuario.scss';

import Nav from '../../component/Nav/Nav'
import Menua from '../../component/Menulateral/Menu'
import CardStep from '../../component/Card/CardStep'
import Footer from '../../component/Footer/Footer'

function Newuser() {
    return (
        <div>
          <Nav></Nav>
          <Menua></Menua>
          <div class="main mt-5 ml-10">
              <CardStep
                title="nuevo usuario"
                content={
                    <form>

                        <div className="ed-grid lg-grid-2">
                            <div className="form-group">
                                <label className="text-ups">usuario</label>
                                <input type="text" name="user" className="form-control"/> 
                            </div>

                            <div className="form-group">
                                <label className="text-ups">correo electronico</label>
                                <input type="email" name="email" className="form-control" />
                            </div>
                        </div>

                        <br/>

                        <div className="ed-grid lg-grid-2">
                            <div className="form-group">
                                <label className="text-ups">contrase'a</label>
                                <input type="password" name="password" className="form-control"/> 
                            </div>

                            <div className="form-group">
                                <label className="text-ups">confirmar contrase'a</label>
                                <input type="password" name="password" className="form-control" />
                            </div>
                        </div>

                        <br/>

                        <div className="ed-grid lg-grid-3">
                            <div className="form-group">
                                <label className="text-ups">fecha de nacimiento</label>
                                <input type="date" name="fNacimiento" className="form-control"/> 
                            </div>

                            <div className="form-group">
                                <label className="text-ups">cargo</label>
                                <input type="text" name="cargo" className="form-control" />
                            </div>

                            <div className="form-group">
                                <label className="text-ups">Nombre</label>
                                <input type="text" name="name" className="form-control" />
                            </div>
                        </div>

                        <div className="ed-grid lg-grid-3">
                            <div className="form-group">
                                <label className="text-ups">telefono</label>
                                <input type="tel" name="phone" className="form-control"/> 
                            </div>

                            <div className="form-group">
                                <label className="text-ups">celular</label>
                                <input type="tel" name="cel" className="form-control" />
                            </div>

                            <div className="form-group">
                                <label className="text-ups" name="privilegios">privilegios</label>
                                <select name="privilegios" id="privilegios">
                                    <option value="admin">Admin</option>
                                    <option value="usuario">Usuario</option>
                                </select>
                            </div>
                        </div>

                        <br/>
                        <div className="ed-grid">
                            <div className="form-group">
                                <label className="text-ups">Direccion</label>
                                <input type="text" name="direccion" className="form-control" />
                            </div>
                        </div>
                    
                    
                    <button className="bttn btn-CB text-ups">procesar</button>
                    </form>

                }
              ></CardStep>
          </div>

          <Footer></Footer>
        </div>
    );
  }
  
  export default Newuser;