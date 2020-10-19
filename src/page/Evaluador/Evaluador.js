import React, {useEffect, useState} from 'react';
import './Evaluador.scss';

import { Steps, Button as BTN, message, Select, Spin, Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import axios from 'axios';
import CardStep from '../../component/Card/CardStep';

import Icon from '../../component/Icons/Icons';
import Footer from '../../component/Footer/Footer';
import Script from 'react-load-script';
import verificador  from 'verificador-rut';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Camera from '../Verificador/WebCam'

//redux
/* import {pointAction,ruttAction} from '../../Redux/Dusk/pointreducer'; */
import {useDispatch,useSelector} from 'react-redux';

function Evaluador() {

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
  const [query, setQuery] = useState('');
  const [cReferencia, setcReferencia] = useState('');
  const [datos, setDatos] = useState({
    rut:'',
    digito:'', rutvalido: false,  rutivalido: false
  });
  const [lat, setlat]= useState(0);
  const [lng,setlng]= useState(0);
  const [FO,setFO]= useState({mensaje: false, cercano:false});
  const [WL,setWL]= useState({mensaje: false, cercano:false});
  const [cliente,setcliente]= useState({rut:"", deuda:null});
  
  const [Clientes,setClientes]= useState({
    rut:"",
    email:"",
  
    fNacimiento:"",
    user:"",
    nombres:"",
    apPaterno:"",
    apMaterno:"",
    phone:"",
    plan:"",
    cReferencia:'',
    blocManzana:"",
    dptoSitio:""
  });

  const captarrut= (e)=>{
    setDatos({
      ...datos, 
      [e.target.name] : e.target.value
    })
  }

  const captadatos= (e)=>{
    setClientes({
      ...Clientes, 
      [e.target.name] : e.target.value
    })
  }

  const usr=useSelector(store=>store.session);

  const verificadorrut= async ()=>{
    if(verificador(datos.rut+'-'+datos.digito)) {
      setDatos({ ...datos, rutvalido:true, rutinvalido:false })
      setClientes({
        ...Clientes, 
        rut:datos.rut+'-'+datos.digito
      });
      usr.user.forEach(user =>{
        setClientes({
          ...Clientes, 
          user:user.INDEX_users
        });
      })
   
      const res= await axios.get("https://api.workerapp.cl/api/factibilidadrut/"+datos.rut+'-'+datos.digito);
        const timeout= 1000;

        if(res.data.length===0){
          setcliente({...cliente, deuda:0})
        } else   res.data.forEach(cliente =>{
      
        setTimeout(() => {
          if (cliente.deuda >0) {
            setcliente({rut:cliente.rut, deuda:cliente.deuda})
        
          } else {setcliente({rut:cliente.rut, deuda:0})}
        
        }, timeout);
      });
   
  
    } else { 
      setDatos({ ...datos, rutinvalido:true,rutvalido:false })
      setcliente({rut:cliente.rut, deuda:null})
    }
  }

  const  handleScriptLoad =  () => {
  
    // Declare Options For Autocomplete
    const options = {
      componentRestrictions: {country: "cl"}
    }; 

    // Initialize Google Autocomplete
    /*global google*/ // To disable any eslint 'google not defined' errors
    const autocomplete  =  new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),options
    );
    autocomplete.addListener('place_changed', ()=> {   const addressObject = autocomplete.getPlace();
 
  
      // Check if address is valid
      let distancesWL= [];
      let distancesFO= [];

      const query3= addressObject.formatted_address;
      const lttd= addressObject.geometry.location.lat();
      const lngtd =addressObject.geometry.location.lng();
      //aqui deberian almacenarse en el estado pero no logro hacerlo
      setQuery({...query, query3});
      setlat(lttd);
      setlng(lngtd);
      axios.get(`https://api.workerapp.cl/api/v2/pointservice`)
      .then(res => {
        const pointservice = res.data;
        var R = 6371
        var  rad = function(x) {return x*Math.PI/180;}
        var FO= false;
        var WL= false;
        setFO({...FO, mensaje:false});
        setWL({...WL, mensaje:false});
        pointservice.forEach(point => {
      
          if(point.INDEX_tecnologia==="1"){
        
      

            var dLat1 = rad( lttd - point.latitud );
            var dLong1 = rad( lngtd- point.longitud );
            var a1 = Math.sin(dLat1/2) * Math.sin(dLat1/2) + Math.cos(rad(lttd)) * Math.cos(rad(point.latitud)) * Math.sin(dLong1/2) * Math.sin(dLong1/2);
            var circunferencia = 2 * Math.atan2(Math.sqrt(a1), Math.sqrt(1-a1));
            var d1 = R * circunferencia;
            var dist=d1.toFixed(3);

            if(dist <= 0.300){
              distancesFO.push(dist);


              setFO({...FO, mensaje:true});
  
              console.log(d1.toFixed(3)+"soy fibra");


            }
          }else { setFO({...FO, cercano:true}); }

          if (point.INDEX_tecnologia==="2") {
      
      
        
            var dLat = rad( lttd - point.latitud );
            var dLong = rad( lngtd- point.longitud );
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lttd)) * Math.cos(rad(point.latitud)) * Math.sin(dLong/2) * Math.sin(dLong/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c;
            var distWL=d.toFixed(3);
            if(distWL <= 0.350){
              setWL({...WL, mensaje:true});
              distancesWL.push(distWL);
              
            console.log(distWL+"soy WL");

            } 
        
          }else { setWL({...WL, cercano:true});}
        });
  
    
        /*  distancesFO.sort(ordenar);
          distancesWL.sort(ordenar);
          var DWL=distancesWL[0];
          var DFO=distancesFO[0];
        if(DFO > 0){
          setFO({...FO, cercano:true});
        }else if(DWL > 0){
          setWL({...WL, cercano:true});
        } */
  
      })
  
    
  
    })  
  }

  const ordenar= (valor1,valor2)=>{
    return valor1 - valor2
  }

  const handleScriptLoad2 = ()=>{
    const options = {
      componentRestrictions: {country: "cl"}
    }; 
    const cReferencia  =  new google.maps.places.Autocomplete(
      document.getElementById('cReferencia'),options
    );
    cReferencia.addListener('place_changed', ()=> {   const addressObject2 = cReferencia.getPlace();
 
  
    // Check if address is valid
  
      const query2= addressObject2.formatted_address;
     
      //aqui deberian almacenarse en el estado pero no logro hacerlo
      setcReferencia({...cReferencia, query2});


  
    })
  }

  /* const  disparador= useDispatch(); */

  /* disparador(pointAction()); disparador(ruttAction('RUT')) */

  /* const evaluador=useSelector(store=>store.evaluador); */

  /* useEffect(()=>{

    if(datos.digito && evaluador.filled===false) {disparador(pointAction()); }



  }) */

  const loading2= ()=>{
      if (datos.rutvalido===true){
      do {
        if(cliente.deuda === 0){break}
        if(cliente.deuda > 0){break}
        return <Spin indicator={antIcon} />
      } while ( cliente.deuda === null);
      }  
    

  }

  const loading= ()=>{
  /*  if (datos.rutvalido===true){
      do {
        if(cliente.deuda === 0){break}
        return <Spin indicator={antIcon} />
      } while ( cliente.deuda === null);
      }  */
  
    if (query !== ""){
    do {
      if(FO.mensaje === true || WL.mensaje === true ){break}
  
      if(FO.cercano === true && WL.cercano === true ){break}
      
        return  <Spin indicator={antIcon} />
      
    } while (FO.mensaje === false || WL.mensaje === false);
  
    }
    
  }

  // modal

  const [ViewModal, setViewModal]= useState(
    {
      loading:false,
      visible:false
    }
  );

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
  // fin modal

  const { Option } = Select;
      
    const onSearch=(val) => {
        console.log('search:', val);
    }

  const { Step } = Steps;

  const steps = [
    {
      content: <CardStep title="Evaluador"
                          content={
                            <form className="ml-8">
                              <div className="form-group ed-grid">
                                <label className="text-ups">Rut</label>
                                <div className="ed-grid lg-grid-6">
                                  <div class="lg-cols-3">
                                  <input type="text" name="rut" minLength="7" maxLength="8"  onChange={captarrut} className="form-control" placeholder="12672579" /> 
                                  </div>

                                  <div>                                  
                                  <input type="text" name="digito" maxLength="1" onBlur={verificadorrut} onChange={captarrut} className="form-control" placeholder={1} />
                                  </div>

                                  <div>
                                    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                                      <Button disabled={datos.rutvalido===true? false:true} ><Icon name={datos.rutvalido===true? "valido":"validoF"}/></Button>
                                      <Button disabled={datos.rutinvalido===true? false:true}><Icon name={datos.rutinvalido===true? "invalido":"invalidoF"}/></Button>
                                      <Button disabled={cliente.deuda > 0? false:true}><Icon name={cliente.deuda > 0? "deudor":"deudorF"}/></Button>
                                    </ButtonGroup>
                                  </div>

                                  <span className="lg-cols-3 cobertura" id="cobertura"> {loading2() } {datos.rutinvalido===true? "Rut invalido ":"" || datos.rutvalido===true? "Rut Valido ":""}{cliente.deuda > 0? <span>¡Rut deudor!</span>:""}</span>


                                </div>
                              </div>

                              <div className="form-group ed-grid">
                              
                                <label className="text-ups">Direcci&#243;n</label>

                                <div className="ed-grid lg-grid-4">
                                  <div class="lg-cols-3">
                                    <input name="direccion" className="form-control" type="text"  placeholder="Escribe tu direccion"  id='autocomplete'/>

                                  </div>

                                  <div>
                                    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                                      <Button disabled={FO.mensaje===true? false:true} ><Icon name={FO.mensaje===true? "fibraOp":"fibraOpF"}/></Button>
                                      <Button disabled={WL.mensaje===true? false:true}><Icon name={WL.mensaje===true? "wifi":"wifiF"}/></Button>
                                    </ButtonGroup>
                                  </div>

                                  <span className="lg-cols-3 cobertura" id="cobertura"> {loading()} {WL.mensaje=== true? " Tu cobertura más cercana es: WIRELESS": "" || FO.mensaje=== true? " Tu cobertura más cercana es: FIBRA OPTICA":"" || (FO.cercano === true && WL.cercano === true)? "!No hay Cobertura¡": "" }</span>

                                </div>
                              </div>
                            </form>
                          }
              ></CardStep>,
    },

    {
      content: <CardStep title="Registro de cliente"
                          content={
                            <form>
                              <div className="scanFlotante">
                                <BTN type="primary" onClick={showModal} className="btn-scan scan">
                                    <Icon name="scan"/>
                                </BTN>

                                <Modal
                                  visible={ViewModal.visible}
                                  title=""
                                  onOk={handleOk}
                                  onCancel={handleCancel}
                                  footer={[
                                    <BTN key="back" onClick={handleCancel}>
                                      Cancelar
                                    </BTN>,
                                    <BTN key="submit" type="primary" loading={ViewModal.loading} onClick={handleOk}>
                                      Enviar
                                    </BTN>,
                                  ]}
                                  >
                                    <Camera></Camera>
                                </Modal>
                              </div>

                              <div className="separador">
                                <span className="text-ups spanSeparador">Datos del titular</span>
                                <div className="ed-grid lg-grid-3">
                                  <div className="form-group">
                                    <label className="text-ups">Run</label>
                                    <input type="text" name="rut" className="form-control"  placeholder="12672579" value={datos.rut+'-'+datos.digito} readOnly/> 
                                  </div>
                                  <div className="form-group">
                                    <label className="text-ups">Serie run</label>
                                    <input type="text" name="run" className="form-control" onChange={captadatos}/>
                                  </div>
                                  <div className="form-group">
                                    <label className="text-ups">Fecha de nacimiento</label>
                                    <input type="date" name="fNacimiento" className="form-control" onChange={captadatos} placeholder={1} />
                                  </div>
                                </div>

                                <div className="ed-grid lg-grid-3">
                                  <div className="form-group">
                                    <label className="text-ups">Nombres</label>
                                    <input type="text" name="nombres" className="form-control" onChange={captadatos} /> 
                                  </div>
                                  <div className="form-group">
                                    <label className="text-ups">Apellido paterno</label>
                                    <input type="text" name="apPaterno" className="form-control"  onChange={captadatos}/>
                                  </div>
                                  <div className="form-group">
                                    <label className="text-ups">Apellido materno</label>
                                    <input type="text" name="apMaterno" className="form-control" onChange={captadatos}/>
                                  </div>
                                </div>
                                
                                <div className="ed-grid lg-grid-2">
                                  <div className="form-group">
                                    <label className="text-ups">Tel&#233;fono</label>
                                    <input type="tel" name="phone" className="form-control" onChange={captadatos}/> 
                                  </div>

                                  <div className="form-group">
                                    <label className="text-ups">Correo electr&#243;nico</label>
                                    <input type="email" name="email" className="form-control" onChange={captadatos}/>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="separador">
                                <span className="text-ups spanSeparador">Datos de la direcci&#243;n</span>

                                <div className="ed-grid">
                                  <div className="form-group">
                                    <label className="text-ups">Direcci&#243;n</label>
                                    
                                    <input name="direccion" className="form-control" type="text" value={query} readOnly/>
                                  </div>
                                </div>


                                <div className="ed-grid lg-grid-2">
                                  <div className="form-group">
                                    <label className="text-ups">Block / Manzana</label>
                                    <input type="text" name="blocManzana" className="form-control" onChange={captadatos}/> 
                                  </div>
                                  
                                  <div className="form-group">
                                    <label className="text-ups">Departamento / Sitio</label>
                                    <input type="text" name="dptoSitio" className="form-control" onChange={captadatos}/>
                                  </div>
                                </div>

                                <div className="ed-grid">
                                  <div className="form-group">
                                    <label className="text-ups">Calle referencia</label>
                                    <input name="cReferencia" className="form-control" type="text" id='cReferencia' onFocus={handleScriptLoad2} />
                                  </div>
                                </div>
                              </div>
                              
                              <div className="separador">
                                <span className="text-ups spanSeparador">Plan a contratar</span>
                                <div className="ed-grid">
                                  <div className="form-group">
                                    {/* <br /> */}
                                    <Select 
                                      name="plan"
                                      showSearch
                                      placeholder="Selecciona un plan"
                                      title="plan"
                                      onChange={(value)=>{setClientes({...Clientes,
                                        plan : value})}}
                                      onSearch={onSearch}
                                    
                                      filterOption={(input, option) =>
                                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                      <Option value="1">{WL.mensaje===true? "6 BM":"" || FO.mensaje===true? "50 MB": ""}</Option>
                                      <Option value="2">{WL.mensaje===true? "8 BM":"" || FO.mensaje===true? "200 MB": ""}</Option>
                                      <Option value="3">{WL.mensaje===true? "10 BM":"" || FO.mensaje===true? "300 MB": ""}</Option>
                                    </Select>
                                  </div>
                                </div>
                              </div>
                          </form>
                        }
              ></CardStep>,
    },
    {
      content: <CardStep title="Estas a un paso"
                        content={
                            <div className="step3">
                              <Icon name="exito"/>
                            </div>
                        }
              ></CardStep>,
    },
    
  ];

  const [current, setCurrent]= useState(0);

  const next=()=> {
    if(datos.rutvalido=== true){if(cliente.deuda === 0) 
      {
        if(query !== "") 
        {
          if(WL.mensaje ===true || FO.mensaje=== true)
          { 
            setprocesar(true);  setCurrent(current+1 );
          }
          else 
          message.error(
            {
              content:' ¡Sin cobertura! ¡imposible avanzar!', 
              duration:5, 
              style: 
              {
                  marginTop: '13vh', float: 'right',
              }
            }
          )
        }
        else message.error(
          {
            content:' ¡Tiene que escribir una dirección!', 
            duration:5, style:
            {
              marginTop: '13vh', float: 'right',
            }
          }
        )
      }
      
      else { 
        message.error({
          content:' ¡Deudor no puedes avanzar!',
          icon:<Icon name="deudor"/>,
          duration:5, 
          style: 
          {
            marginTop: 
            '13vh', 
            float: 'right',            
          }
        }) 
      }
    }
    else message.error({
      content:' ¡Por favor ingresa un rut valido!', 
      icon:<Icon name="invalido"/>,
      duration:5, 
      style: {
        marginTop: '13vh', float: 'right',
      }
    })
  
  }

  const final =()=>{
    axios.get('https://api.workerapp.cl/api/subscripcion/'+Clientes.nombres+'/'+Clientes.apPaterno+'/'+Clientes.apMaterno+'/'+Clientes.run+'/'+Clientes.phone+'/'+Clientes.email+'/'+Clientes.fNacimiento+'/'+query+', '+Clientes.blocManzana+', '+Clientes.dptoSitio+'/'+cReferencia+'/'+Clientes.plan+'/'+Clientes.user)

    .then(res => {
      
      message.success('¡Cliente creado exitosamente!')
      axios.get('/api/sms/'+Clientes.phone+'/'+Clientes.run)

      .then(res => {
        
        message.success('¡Cliente creado exitosamente!')

      })
    })
  }

  const prev =()=> {
    
    setCurrent(current-1 );
    if(current===1){
    setprocesar(false);}
  }


  const [procesar, setprocesar]= useState(false);
  
  return (
    <div>
      <Script
        url="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyBMNPzyCUNfyF9hFDMBspwZhOkDvUQamp8"
        onLoad={handleScriptLoad}
      />
  
      <div className="main mt-5 ml-10">
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        
        <div className="steps-content">{steps[current].content}</div>
      
        <div className="steps-action">
          {current < steps.length - 1 && (
            <BTN type="primary" className="btn-SVG" onClick={() =>  {next()}}>
              { procesar === false? <span>CREAR CLIENTE <Icon name="shoppingCart"/></span> : "PROCESAR"}
            </BTN>
            
          )}
          {current === steps.length - 1 && (
            <BTN type="primary" onClick={() => {final()}}>
            Finalizar
            </BTN>
          )}
          {current > 0 && (
            <BTN style={{ margin: '10px 25px' }} onClick={() => prev()}>
              Anterior
            </BTN>
          )}
        </div>
      </div>

      <Footer></Footer>
    </div>
  );

}

export default Evaluador;
