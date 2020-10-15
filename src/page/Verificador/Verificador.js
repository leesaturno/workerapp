import React,{useRef,useCallback,useState,useEffect} from 'react';
import './Verificador.scss';
import CardStep from '../../component/Card/CardStep';
import Camera from './WebCam'

import Footer from '../../component/Footer/Footer';
import { Modal, Button } from 'antd';



function Verificador() {
  const [ViewModal, setViewModal]= useState(
    {
      loading:false,
       visible:false
      });
  
  

  const showModal = () => {
    setViewModal({...ViewModal,
      visible: true,
    });
  };

  const handleOk = () => {
    setViewModal({...ViewModal,
      loading: true,
    });
    setTimeout(() => {
      setViewModal({...ViewModal, loading: false, visible: false });
    }, 3000);
  };

  const handleCancel = () => {
    setViewModal({...ViewModal, visible: false });
  };
  
  return (
    <>
    
      <div>

        <div className="main mt-5">

          <CardStep
            title="WorkerApp desea verificar sus datos"
            content= {
              
              <div>
                <form>
                    <div className="ed-grid lg-grid-2">
                      <div className="form-group">
                        <label className="text-ups">Run</label>
                        <input type="text" name="rut" className="form-control"  placeholder="12.672.579" value={'Hola'} readOnly/> 
                      </div>
                      
                      <div className="form-group">
                        <label className="text-ups">Fecha de nacimiento</label>
                        <input type="date" name="fNacimiento" className="form-control"  value={'10/12/2020'} readOnly />
                      </div>
                    </div>

                    <div className="ed-grid lg-grid-3">
                      <div className="form-group">
                        <label className="text-ups">Nombres</label>
                        <input type="text" name="nombres" className="form-control"  value={'Hola'} readOnly /> 
                      </div>
                      <div className="form-group">
                        <label className="text-ups">Apellido paterno</label>
                        <input type="text" name="apPaterno" className="form-control" value={'Hola'} readOnly  />
                      </div>
                      <div className="form-group">
                        <label className="text-ups">Apellido materno</label>
                        <input type="text" name="apMaterno" className="form-control" value={'Hola'} readOnly />
                      </div>
                    </div>  
                    <br/>
                    <div className="ed-grid lg-grid-2">
                      <div>
                        <Button type="primary" onClick={showModal} className="btn-CB">
                          Tomar selfie
                        </Button>
                      </div>

                      <div>
                        <span>Necesitamos una selfie para verificar su identidad</span>
                      </div>
                    </div>

                      <br/><br/><br/>
                    <div className="ed-grid lg-grid-2">
                      <div>
                        <Button type="primary" onClick={showModal} className="btn-CB">
                          Cedula de identidad
                        </Button>
                      </div>

                      <div>
                        <span>Tome una foto de su cedula de identidad</span>
                      </div>
                    </div>

                    <br/><br/>

                    <button className="bttn btn-CB text-ups">Procesar</button>
                
                </form>

                <Modal
                visible={ViewModal.visible}
                title=""
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Cancelar
                  </Button>,
                  <Button key="submit" type="primary" loading={ViewModal.loading} onClick={handleOk}>
                    Enviar
                  </Button>,
                ]}
                >
                  <Camera></Camera>
                </Modal>
              
              </div>
            }
          >

          </CardStep>
        </div>


        <Footer/>
      </div>
    </>
  );
  
}

export default Verificador;
