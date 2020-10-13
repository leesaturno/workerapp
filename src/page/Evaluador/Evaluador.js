import React, {useEffect, useState} from 'react';
import './Evaluador.scss';
import { ToastContainer, toast } from 'react-toastify';
import { Steps, Button, message } from 'antd';
import axios from 'axios';
import CardStep from '../../component/Card/CardStep';

// import CardStep from '../../component/Card/CardStep';
import Icon from '../../component/Icons/Icons';
import Footer from '../../component/Footer/Footer';
import Script from 'react-load-script';
import verificador  from 'verificador-rut';

//redux
import {pointAction,ruttAction} from '../../Redux/Dusk/pointreducer';
import {useDispatch,useSelector} from 'react-redux';

function Evaluador() {
  
 
  const [query, setQuery] = useState({cReferencia:'',
direccion:''});
  const [datos, setDatos] = useState({
    rut:'',
    digito:''
  });
   const [lat, setlat]= useState(0);
  const [lng,setlng]= useState(0);
  const [FO,setFO]= useState(false);
  const [WL,setWL]= useState(false);
  const [cliente,setcliente]= useState({rut:"", deuda:0});
const captarrut= (e)=>{
  setDatos({
    ...datos, 
    [e.target.name] : e.target.value
  })
}
const verificadorrut= async ()=>{
  if(verificador(datos.rut+'-'+datos.digito)) {
    message.success({content:'¡Rut Valido!', icon:<img src={require("../../images/id-card.png")} width="28" height="28" alt=""/>, duration:3, onClose:evaldireccion,   style: {
      marginTop: '13vh', float: 'right',
    }})
    disparador(pointAction()); 
    const res= await axios.get("https://api.workerapp.cl/api/factibilidadrut/"+datos.rut+'-'+datos.digito);
    const timeout= 1000;

    
    res.data.forEach(cliente =>{
      
      setTimeout(() => {
        if (cliente.deuda >0) {
          setcliente({rut:cliente.rut, deuda:cliente.deuda})
          message.error({content:' ¡Deudor!', icon:<img src={require("../../images/deudor.png")} width="28" height="28" alt=""/>, duration:5, style: {
            marginTop: '13vh', float: 'right',
          }})
        } 
       
      }, timeout);
    });
   

  
  } else return ( message.error({content:'¡Rut invalido!', icon:<img src={require("../../images/invalidrut.png")} width="32" height="32" alt=""/>, duration:3, style: {
    marginTop: '13vh', float: 'right',
  }}))
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
  
      const query3= addressObject.formatted_address;
      const lttd= addressObject.geometry.location.lat();
      const lngtd =addressObject.geometry.location.lng();
      //aqui deberian almacenarse en el estado pero no logro hacerlo
      setQuery({direccion: query3});
      setlat(lttd);
  setlng(lngtd);
  axios.get(`https://api.workerapp.cl/api/v2/pointservice`)
  .then(res => {
    const pointservice = res.data;
    var R = 6371
    var  rad = function(x) {return x*Math.PI/180;}
    var FO= false;
    var WL= false;

    pointservice.forEach(point => {
     
      if(point.INDEX_tecnologia==="1"){
       
     

         var dLat1 = rad( lttd - point.latitud );
         var dLong1 = rad( lngtd- point.longitud );
         var a1 = Math.sin(dLat1/2) * Math.sin(dLat1/2) + Math.cos(rad(lttd)) * Math.cos(rad(point.latitud)) * Math.sin(dLong1/2) * Math.sin(dLong1/2);
var circunferencia = 2 * Math.atan2(Math.sqrt(a1), Math.sqrt(1-a1));
var d1 = R * circunferencia;
d1.toFixed(3)
if(d1.toFixed(3) <= 0.300){
FO=true;

  setFO(FO);
 



console.log(d1.toFixed(3)+"soy fibra");


} /* else if (d1.toFixed(3) >  0.350  ){
FO= false;
} */ }
    if (point.INDEX_tecnologia==="2") {
    
     
      
        var dLat = rad( lat - point.latitud );
        var dLong = rad( lng- point.longitud );
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat)) * Math.cos(rad(point.latitud)) * Math.sin(dLong/2) * Math.sin(dLong/2);
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
var d = R * c;
d.toFixed(3)
if(d.toFixed(3) <= 0.350){
console.log(d.toFixed(3)+"soy WL");
WL= true;

setWL(WL);

} 
       
    }
  });
  if (WL && FO) {
    message.success({content:<img src={require("../../images/optica-fiber.png")} width="32" height="32" alt=""/>, icon:<img src={require("../../images/wifi-signal (1).png")} width="28" height="28" alt=""/>, duration:3, style: {
      marginTop: '13vh', float: 'right',
    }}) 
    
    
    
  }else if (WL) {
    message.success({content:<img src={require("../../images/wifi-signal (1).png")} width="28" height="28" alt=""/>,icon: "", duration:3, style: {
      marginTop: '13vh', float: 'right',
    }})
      
    
    } else if (FO) {
      
      message.success({content:<img src={require("../../images/optica-fiber.png")} width="32" height="32" alt=""/>,icon: "" , duration:3, style: {
        marginTop: '13vh', float: 'right',
      }}) 
  } else if (lat && lng) 
    
  {
    
    message.error({content:<img src={require("../../images/no-optica-fiber.png")} width="32" height="32" alt=""/>, icon:<img src={require("../../images/no-wifi.png")} width="32" height="32" alt=""/> , duration:3, style: {
      marginTop: '13vh', float: 'right',
    }})
  }
  })
 
    
  
    })
 
  
    // Initialize Google Autocomplete
    /*global google*/ // To disable any eslint 'google not defined' errors


 
  
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
      setQuery({cReferencia: query2});


  
    })
}

const  disparador= useDispatch();

/* disparador(pointAction()); disparador(ruttAction('RUT')) */

const evaluador=useSelector(store=>store.evaluador);

/* useEffect(()=>{

  if(datos.digito && evaluador.filled===false) {disparador(pointAction()); }



}) */

const msgevaldirecc =()=>{
  
  

  

 

}
const evaldireccion = async()=>{
 
  
  
 
 
  }


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
                <input type="text" name="rut" minLength="7" maxLength="8"  onChange={captarrut} className="form-control" placeholder="12672579" /> 
                </div>
                <div>
               
                <input type="text" name="digito" maxLength="1" onBlur={verificadorrut} onChange={captarrut} className="form-control" placeholder={1} />
                </div>
              </div>
            </div>
            
            <div className="ed-grid">
              <div className="form-group">
                <label className="text-ups">Direcci&#243;n</label>
                
                <input name="direccion" className="form-control" type="text"  placeholder="Escribe tu direccion"  id='autocomplete' onBlur={evaldireccion}/>
              </div>
            </div>
          </form>
        </div>
      }
             ></CardStep>,
  },

  {
    content: <CardStep title="Registro de cliente"
                        content={
                          <form>
                            <div className="separador">
                              <span className="text-ups">Datos del titular</span>
                              <div className="ed-grid lg-grid-3">
                                <div className="form-group">
                                  <label className="text-ups">Run</label>
                                  <input type="text" name="rut" className="form-control" placeholder="12.672.579" value={datos.rut+'-'+datos.digito} readOnly/> 
                                </div>
                                <div className="form-group">
                                  <label className="text-ups">Serie run</label>
                                  <input type="text" name="rut" className="form-control" />
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
                                  <label className="text-ups">Tel&#233;fono</label>
                                  <input type="tel" name="phone" className="form-control" /> 
                                </div>

                                <div className="form-group">
                                  <label className="text-ups">Correo electr&#243;nico</label>
                                  <input type="email" name="email" className="form-control" />
                                </div>
                              </div>
                            </div>
                            
                            <div className="separador">
                              <span className="text-ups">Datos de la direcci&#243;n</span>

                              <div className="ed-grid">
                                <div className="form-group">
                                  <label className="text-ups">Direcci&#243;n</label>
                                  
                                  <input name="direccion" className="form-control" type="text" value={query.direccion} readOnly/>
                                </div>
                              </div>


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
                                  <input name="cReferencia" className="form-control" type="text" id='cReferencia' onFocus={handleScriptLoad2}/>
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

  setCurrent(current+1 );
}

const prev =()=> {
 
  setCurrent(current-1 );
}
  return (
      <div>
        <Script
          url="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyBMNPzyCUNfyF9hFDMBspwZhOkDvUQamp8"
          onLoad={handleScriptLoad}
        />
       
        <ToastContainer/>
        <div className="main mt-5 ml-10">
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() =>  {if(cliente.deuda === 0) {if(WL ===true || FO=== true){    next()}}else {  message.error({content:' ¡Deudor no puedes avanzar!', icon:<img src={require("../../images/deudor.png")} width="28" height="28" alt=""/>, duration:5, style: {
            marginTop: '13vh', float: 'right',
          }})}}}>
              Siguiente 
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('¡Cliente creado exitosamente!')}>
            Finalizar
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '10px 25px' }} onClick={() => prev()}>
              Anterior
            </Button>
          )}
        </div>
        </div>

        <Footer></Footer>
      </div>
  );
}

export default Evaluador;
