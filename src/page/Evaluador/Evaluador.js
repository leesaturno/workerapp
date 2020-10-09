import React, {useEffect, useState, useCallback} from 'react';
import './Evaluador.scss';
import { ToastContainer, toast } from 'react-toastify';
// import CardStep from '../../component/Card/CardStep';
import Icon from '../../component/Icons/Icons';
import Footer from '../../component/Footer/Footer';
import Script from 'react-load-script';
import verificador  from 'verificador-rut';

import Eevaluador from './eevaluador';
//redux
import {pointAction,ruttAction} from '../../Redux/Dusk/pointreducer';
import {useDispatch,useSelector} from 'react-redux';

function Evaluador() {
  const [query, setQuery] = useState(null);
  const [datos, setDatos] = useState({
    rut:'',
    digito:''
  });
   const [lat, setlat]= useState(0);
  const [lng,setlng]= useState(0);
  const [FO,setFO]= useState(false);
  const [WL,setWL]= useState(false);
const captarrut= (e)=>{
  setDatos({
    ...datos, 
    [e.target.name] : e.target.value
  })
}
const verificadorrut= ()=>{
  if(verificador(datos.rut+'-'+datos.digito)) {return (<h3 >Valido</h3>); }else return (<h3>invalido</h3>)
}

const  handleScriptLoad =  () => {
       
  // Declare Options For Autocomplete
/*     const options = {
    types: ['(cities)'],
  }; */

  // Initialize Google Autocomplete
  /*global google*/ // To disable any eslint 'google not defined' errors

  
  const autocomplete  =  new google.maps.places.Autocomplete(
    document.getElementById('autocomplete'),
  );
  // Avoid paying for data that you don't need by restricting the set of
  // place fields that are returned to just the address components and formatted
  // address.
 /*  this.autocomplete.setFields(['address_components', 'formatted_address','geometry.location.lat']); */

  // Fire Event when a suggested name is selected
  autocomplete.addListener('place_changed', ()=> {   const addressObject = autocomplete.getPlace();
  const address = addressObject.address_components;

  // Check if address is valid

    const query2= addressObject.formatted_address;
    const lttd= addressObject.geometry.location.lat();
    const lngtd =addressObject.geometry.location.lng();
    //aqui deberian almacenarse en el estado pero no logro hacerlo
   setQuery(query2);
    setlat(lttd);
    setlng(lngtd);
  })

}


const disparador=useDispatch();
const evaluador=useSelector(store=>store.evaluador);
/* disparador(pointAction()); disparador(ruttAction('RUT')) */

useEffect(()=>{
  disparador(pointAction());
})
const evaldireccion = ()=>{
  var R = 6371
  var  rad = function(x) {return x*Math.PI/180;}

evaluador.point.forEach(point => {
  /* let INDEX_tecnologia= element.INDEX_tecnologia; */
 
  if(point.INDEX_tecnologia==="1"){
   
 

     var dLat1 = rad( lat - point.latitud );
     var dLong1 = rad( lng- point.longitud );
     var a1 = Math.sin(dLat1/2) * Math.sin(dLat1/2) + Math.cos(rad(lat)) * Math.cos(rad(point.latitud)) * Math.sin(dLong1/2) * Math.sin(dLong1/2);
var circunferencia = 2 * Math.atan2(Math.sqrt(a1), Math.sqrt(1-a1));
var d1 = R * circunferencia;
d1.toFixed(3)
if(d1.toFixed(3) <= 0.300){

setFO(true)
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
setWL(true)



} /* else if (d.toFixed(3) >  0.350  ){
WL= false;
} */ 
   
}
})


if (WL && FO) {
  toast.success( <Icon name="exito"/>, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });  
    
  
  
}else if (WL) {
  toast.success( <Icon name="exito"/>, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    }); 
  
  
} else if (FO) {
  
  toast.success( <Icon name="exito"/>, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    }); 
} else {
 
  toast.info( <Icon name="info"/> , {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    }); 
}
  }
  return (
      <div>
        <Script
          url="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyBMNPzyCUNfyF9hFDMBspwZhOkDvUQamp8"
          onLoad={handleScriptLoad}
        />
        <ToastContainer/>
        <div class="main mt-5 ml-10">
          <Eevaluador></Eevaluador>

            {/* <CardStep title="evaluador"
              content={
                <div>
                  <form action>
                    <div className="form-group ed-grid">
                      <label className="text-ups">Rut</label>
                      <div className="ed-grid lg-grid-2">
                        <div>
                          <input type="text" name="rut" onChange={captarrut} className="form-control" placeholder="12.672.579" /> 
                        </div>
                        <div>
                        
                          <input type="text" name="digito"  onBlur={verificadorrut} onChange={captarrut} className="form-control" placeholder={1} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="ed-grid">
                      <div className="form-group">
                        <label className="text-ups">Direccion</label>
                        <input name="direccion" className="form-control" type="text" placeholder="Escribe tu direccion"  id='autocomplete'  onBlur={evaldireccion}/>
                      </div>
                    </div>

                    <button className="bttn btn-CB text-ups">crear cliente 
                      <Icon name="shoppingCart"/>
                    </button>
                  </form>
                </div>
              }
            ></CardStep> */}

            {/* <CardStep title="registro de cliente"
              content={
                <form action>
                  <div className="separador">
                    <span className="text-ups">datos del titular</span>
                    <div className="ed-grid lg-grid-3">
                      <div className="form-group">
                        <label className="text-ups">run</label>
                        <input type="number" name="rut" className="form-control" placeholder="12.672.579" /> 
                      </div>
                      <div className="form-group">
                        <label className="text-ups">serie run</label>
                        <input type="number" name="rut" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label className="text-ups">fecha de nacimiento</label>
                        <input type="date" name="fNacimiento" className="form-control" placeholder={1} />
                      </div>
                    </div>

                    <div className="ed-grid lg-grid-3">
                      <div className="form-group">
                        <label className="text-ups">Nombres</label>
                        <input type="text" name="nombres" className="form-control" /> 
                      </div>
                      <div className="form-group">
                        <label className="text-ups">apellido paterno</label>
                        <input type="text" name="apPaterno" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label className="text-ups">apellido materno</label>
                        <input type="text" name="apMaterno" className="form-control" />
                      </div>
                    </div>
                    
                    <div className="ed-grid lg-grid-2">
                      <div className="form-group">
                        <label className="text-ups">telefono</label>
                        <input type="tel" name="phone" className="form-control" /> 
                      </div>

                      <div className="form-group">
                        <label className="text-ups">correo electronico</label>
                        <input type="email" name="email" className="form-control" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="separador">
                    <span className="text-ups">datos de la direccion</span>
                    <div className="ed-grid lg-grid-2">
                      <div className="form-group">
                        <label className="text-ups">block / manzana</label>
                        <input type="text" name="blocManzana" className="form-control" /> 
                      </div>
                      
                      <div className="form-group">
                        <label className="text-ups">departamento / sitio</label>
                        <input type="text" name="dptoSitio" className="form-control" />
                      </div>
                    </div>

                    <div className="ed-grid">
                      <div className="form-group">
                        <label className="text-ups">calle referencia</label>
                        <input name="cReferencia" className="form-control" type="text" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="separador">
                    <span className="text-ups">plan a contratar</span>
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
  
                  <button className="bttn btn-CB text-ups">procesar</button>
                </form>

              }
            ></CardStep> */}
        
            {/* <CardStep title="¡cliente creado exitosamente!"
              content={
                <div class="step3">
                  <Icon name="exito"/>
                </div>
          }
            ></CardStep> */}
        </div>

        <Footer></Footer>
      </div>
  );
}

export default Evaluador;
