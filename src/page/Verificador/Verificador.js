import React,{useRef,useCallback,useState,useEffect} from 'react';
import './Verificador.scss';
import CardStep from '../../component/Card/CardStep';
import Camera from './WebCam'
import {useParams} from 'react-router-dom';
import Footer from '../../component/Footer/Footer';
import { Modal, Button } from 'antd';
import Logo from '../../images/logo-stel.png'
import {useDispatch,useSelector} from 'react-redux';
import {rutsaction} from '../../Redux/Dusk/verificadorreducer';

function Verificador() {
  let { id } = useParams();
  let or=1;
  const [cam,setCam]=useState("environment");
  const disparador=useDispatch();
  const cliente=useSelector(store=>store.rutespecifico);
  const [clienterut,setClienterut]=useState();


  useEffect(()=>{
    disparador(rutsaction(id));
    or=2
  },[or]);

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
  
  function botonandverso() {
    if(cliente.role=="ocultar1"){
      
      return (<>Informacion enviada con exito</>);
      
    }else{
      return (<><Button type="primary" onClick={()=>{setCam("environment"); showModal()}} className="btn-CB">
      Cedula de Identidad Anverso
    </Button></>);
    }
  }

  function selfie() {
    if(cliente.role1=="ocultar1"){
      
      return (<>Informacion enviada con exito</>);
      
    }else{
      return (<> <Button type="primary" onClick={()=>{setCam("user"); showModal()}} className="btn-CB">
      Tomar selfie
    </Button></>);
    }
  }

  return (
    <>
      <div className="main mt-5">
        <CardStep
          title="Stel desea verificar sus datos"
          content= { 
            <div>
              <form>
                  <div className="ed-grid lg-grid-2">
                  <div className="s-to-center ">
                    <div className="user d-inline-block">
                      <img src={Logo} alt="Logo" />
                    </div>
                  </div>
                  <br/><br/>
                    <div className="form-group">
                      <label className="text-ups">Run</label>
                      <input type="text" name="rut" className="form-control"  placeholder={cliente.registro.map(Item=>{ return Item.rut })} value={cliente.registro.map(Item=>{ return Item.rut })} readOnly/> 
                    </div>
                    <div className="form-group">
                      <label className="text-ups">Fecha de nacimiento</label>
                      <input type="date" name="fNacimiento" className="form-control"  value={cliente.registro.map(Item=>{ return Item.fechanacimiento })} readOnly />
                    </div>
                  </div>
                  <div className="ed-grid lg-grid-3">
                    <div className="form-group">
                      <label className="text-ups">Nombres</label>
                      <input type="text" name="nombres" className="form-control"  value={cliente.registro.map(Item=>{ return Item.nombres })} readOnly /> 
                    </div>
                    <div className="form-group">
                      <label className="text-ups">Apellido paterno</label>
                      <input type="text" name="apPaterno" className="form-control" value={cliente.registro.map(Item=>{ return Item.apPaterno })} readOnly  />
                    </div>
                    <div className="form-group">
                      <label className="text-ups">Apellido materno</label>
                      <input type="text" name="apMaterno" className="form-control" value={cliente.registro.map(Item=>{ return Item.apMaterno })} readOnly />
                    </div>
                  </div>  
                  <br/>
                  <div className="ed-grid lg-grid-2">
                    <div>
                      {selfie()}
                    </div>
                    <div>
                      <span>Necesitamos una selfie para verificar su identidad</span>
                    </div>
                  </div>
                    <br/><br/><br/>
                  <div className="ed-grid lg-grid-2">
                    <div>
                      {botonandverso()}
                    </div>
                    <div>
                      <span>Tome una foto de su cedula de identidad por el anverso</span>
                    </div>
                  </div>
                  <br/><br/>
              </form>
                  <button className="bttn btn-CB text-ups" onClick={()=>{console.log(clienterut)}}>Procesar</button>

              <Modal
              visible={ViewModal.visible}
              title=""
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Cancelar
                </Button>
              ]}
              >
                <Camera modecam={cam} rut={cliente.registro.map(Item=>{ return Item.rut })} fcn={cliente.registro.map(Item=>{ return Item.fechanacimiento })} nombres={cliente.registro.map(Item=>{ return Item.nombres })} apellidosP={cliente.registro.map(Item=>{ return Item.apPaterno })} apellidosM={cliente.registro.map(Item=>{ return Item.apMaterno })} ></Camera>
              </Modal>
            
            </div>
          }
        >

        </CardStep>
      </div>


      <Footer/>
    </>
  );
  
}

export default Verificador;
