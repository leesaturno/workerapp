import React, {Component} from 'react';
import { Steps, Button, message } from 'antd';
import Icon from '../../component/Icons/Icons';
import CardStep from '../../component/Card/CardStep';

const { Step } = Steps;

const steps = [
  {
    content: <CardStep title="Evaluador"
    content={
        <div>
          <form>
            <div className="form-group ed-grid">
              <label className="text-ups">Rut</label>
              <div className="ed-grid lg-grid-2">
                <div>
                  <input type="text" name="rut" className="form-control" placeholder="12.672.579" /> 
                </div>
                <div>
                
                  <input type="text" name="digito" className="form-control" placeholder={1} />
                </div>
              </div>
            </div>
            
            <div className="ed-grid">
              <div className="form-group">
                <label className="text-ups">Direccion</label>
                <input name="direccion" className="form-control" type="text" placeholder="Escribe tu direccion"  id='autocomplete'/>
              </div>
            </div>

            {/* <button className="bttn btn-CB text-ups">crear cliente 
              <Icon name="shoppingCart"/>
            </button> */}
          </form>
        </div>
      }
    ></CardStep>,
  },
  {
    content: <CardStep title="Registro de cliente"
                content={
                <form action>
                  <div className="separador">
                    <span className="text-ups">Datos del titular</span>
                    <div className="ed-grid lg-grid-3">
                      <div className="form-group">
                        <label className="text-ups">Run</label>
                        <input type="number" name="rut" className="form-control" placeholder="12.672.579" /> 
                      </div>
                      <div className="form-group">
                        <label className="text-ups">Serie run</label>
                        <input type="number" name="rut" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label className="text-ups">Fecha de nacimiento</label>
                        <input type="date" name="fNacimiento" className="form-control" placeholder={1} />
                      </div>
                    </div>

                    <div className="ed-grid lg-grid-3">
                      <div className="form-group">
                        <label className="text-ups">Nombres</label>
                        <input type="text" name="nombres" className="form-control" /> 
                      </div>
                      <div className="form-group">
                        <label className="text-ups">Apellido paterno</label>
                        <input type="text" name="apPaterno" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label className="text-ups">Apellido materno</label>
                        <input type="text" name="apMaterno" className="form-control" />
                      </div>
                    </div>
                    
                    <div className="ed-grid lg-grid-2">
                      <div className="form-group">
                        <label className="text-ups">Telefono</label>
                        <input type="tel" name="phone" className="form-control" /> 
                      </div>

                      <div className="form-group">
                        <label className="text-ups">Correo electronico</label>
                        <input type="email" name="email" className="form-control" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="separador">
                    <span className="text-ups">Datos de la direccion</span>
                    <div className="ed-grid lg-grid-2">
                      <div className="form-group">
                        <label className="text-ups">Block / Manzana</label>
                        <input type="text" name="blocManzana" className="form-control" /> 
                      </div>
                      
                      <div className="form-group">
                        <label className="text-ups">Departamento / Sitio</label>
                        <input type="text" name="dptoSitio" className="form-control" />
                      </div>
                    </div>

                    <div className="ed-grid">
                      <div className="form-group">
                        <label className="text-ups">Calle referencia</label>
                        <input name="cReferencia" className="form-control" type="text" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="separador">
                    <span className="text-ups">Plan a contratar</span>
                    <div className="ed-grid">
                      <div className="form-group">
                        <br />
                        <select name="plan" id="plan">
                          <option>Lista de planes por velocidad</option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                        </select>
                      </div>
                    </div>
                  </div>
  
                  {/* <button className="bttn btn-CB text-ups">procesar</button> */}
                </form>
                }
              ></CardStep>,
  },
  {
    content: <CardStep title="Estas a un paso"
                content={
                    <div class="step3">
                    <Icon name="exito"/>
                    </div>
                }
             ></CardStep>,
  },
];

class Eevaluador extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    return (
      <>
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Siguiente
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('¡Cliente creado exitosamente!')}>
              Procesar
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '10px 25px' }} onClick={() => this.prev()}>
              Anterior
            </Button>
          )}
        </div>
      </>
    );
  }
}

export default Eevaluador;