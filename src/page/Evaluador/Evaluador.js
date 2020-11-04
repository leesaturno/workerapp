import React, { useState } from 'react';
import './Evaluador.scss';

import { Steps, Button as BTN, message, Select, Spin, Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import axios from 'axios';
import CardStep from '../../component/Card/CardStep';

import Icon from '../../component/Icons/Icons';
import Footer from '../../component/Footer/Footer';
import Script from 'react-load-script';
import verificador from 'verificador-rut';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Camera1 from '../Verificador/WebCam1'
import Segurity from '../../component/Segurity/Segurity';
//redux
/* import {pointAction,ruttAction} from '../../Redux/Dusk/pointreducer'; */
import { useDispatch, useSelector } from 'react-redux';

function Evaluador() {

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
  const [query, setQuery] = useState('');
  const [cReferencia, setcReferencia] = useState('');
  const [datos, setDatos] = useState({
    rut: '',
    digito: '', rutvalido: false, rutivalido: false
  });
  const [lat, setlat] = useState(0);
  const [lng, setlng] = useState(0);
  const [FO, setFO] = useState({ mensaje: false, sinFO: false });
  const [WLess, setWLess] = useState({ mensaje: false, sinWL: false });
  const [cliente, setcliente] = useState({ rut: "", deuda: null }); //estado para el cliente que se trae si hay coincidencia para verficar deuda
  const [cercanoFO, setcercanoFO] = useState({ distancia: "", dispositivo: "" });
  const [cercanoWL, setcercanoWL] = useState({ distancia: "", dispositivo: "" });
  const [Clientes, setClientes] = useState({
    rut: "",
    email: "",
    run:"",
    fNacimiento: null,
    user: "",
    nombres: "",
    apPaterno: "",
    apMaterno: "",
    phone: "",
    plan: "",
    cReferencia: '',
    direccion: '',
    blocManzana: "",
    dptoSitio: ""
  });

  const captarrut = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    })
  }

  const captadatos = (e) => {
    setClientes({
      ...Clientes,
      [e.target.name]: e.target.value
    })
  }

  const usr = useSelector(store => store.session);

  const verificadorrut = async () => {
    if (verificador(datos.rut + '-' + datos.digito)) {
      setDatos({ ...datos, rutvalido: true, rutinvalido: false })
      setClientes({
        ...Clientes,
        rut: datos.rut + '-' + datos.digito
      });
      usr.user.forEach(user => {
        setClientes({
          ...Clientes,
          user: user.INDEX_user
        });
      })

      const res = await axios.get("https://api.workerapp.cl/api/factibilidadrut/" + datos.rut + '-' + datos.digito);
      const timeout = 1000;

      if (res.data.length === 0) {
        setcliente({ ...cliente, deuda: 0 })
      } else res.data.forEach(cliente => {

        setTimeout(() => {
          if (cliente.deuda > 0) {
            setcliente({ rut: cliente.rut, deuda: cliente.deuda })

          } else { setcliente({ rut: cliente.rut, deuda: 0 }) }

        }, timeout);
      });


    } else {
      setDatos({ ...datos, rutinvalido: true, rutvalido: false })
      setcliente({ rut: cliente.rut, deuda: null })
    }
  }
//autocompletado de la direccion de cobertura y verificador de cobertura
  const handleScriptLoad = () => {

    // Declare Options For Autocomplete
    const options = {
      componentRestrictions: { country: "cl" }
    };

    // Initialize Google Autocomplete
    /*global google*/ // To disable any eslint 'google not defined' errors
    const autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'), options
    );
    autocomplete.addListener('place_changed', () => {
      const addressObject = autocomplete.getPlace();


      
      let distancesWL = [];
      let distancesFO = [];

      const query3 = addressObject.formatted_address;
      const lttd = addressObject.geometry.location.lat();
      const lngtd = addressObject.geometry.location.lng();
      
      setQuery(query3);
      setlat(lttd);
      setlng(lngtd);
      axios.get(`https://api.workerapp.cl/api/v2/pointservice`)
        .then(res => {
          const pointservice = res.data;
          var R =6378;
          var rad = function (x) { return x * Math.PI / 180; }

             setFO({...FO, mensaje:false});
             
          pointservice.forEach(point => {
//verifica cobertura Fibra optica
            if (point.INDEX_tecnologia === "1") {



              var dLat1 = rad(lttd - point.latitud);
              var dLong1 = rad(lngtd - point.longitud);
              var a1 = Math.sin(dLat1 / 2) * Math.sin(dLat1 / 2) + Math.cos(rad(lttd)) * Math.cos(rad(point.latitud)) * Math.sin(dLong1 / 2) * Math.sin(dLong1 / 2);
              var circunferencia = 2 * Math.atan2(Math.sqrt(a1), Math.sqrt(1 - a1));
              var d1 = R * circunferencia;
              var dist = d1.toFixed(3);
            

              distancesFO.sort(ordenar);
              if (dist <= point.distancia) {  ;
                distancesFO.push({ id: dist, nombre: point.dispositivo});
              
                distancesFO.sort(ordenar);
               

                setFO({ ...FO, mensaje: true });
                console.log(dist + "soy fibra "+lttd+","+lngtd+" Base de datos: "+point.latitud+", "+point.longitud);
                
                
                 setTimeout(() => {
                   
                   setcercanoFO({ ...cercanoFO, distancia: distancesFO[0].id, dispositivo: distancesFO[0].nombre });
                 }, 1000);
                
               
               
              } else  console.log(dist + "soy fibra "+lttd+","+lngtd);
            } else { setFO({ ...FO, sinFO: true }); }
//verifica cobertura wifi
            if (point.INDEX_tecnologia === "2") {



              var dLat = rad(lttd - point.latitud);
              var dLong = rad(lngtd - point.longitud);
              var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lttd)) * Math.cos(rad(point.latitud)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
              var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
              var d = R * c;
              var distWL = d.toFixed(3);
              if (distWL <= point.distancia) {

                distancesWL.push({ id: distWL, nombre: point.dispositivo});
                distancesWL.sort(ordenar);
                console.log(distWL + "soy WL "+lttd+","+lngtd);
                setWLess({ ...WLess, mensaje: true });
                setTimeout(() => {
                  setcercanoWL({ ...cercanoWL, distancia: distancesWL[0].id, dispositivo: distancesWL[0].nombre });
                }, 1000);
               
               

              
              }

            } else { setWLess({ ...WLess, sinWL: true }); }
          });
          if (FO.mensaje === true && WLess.mensaje === true) {
            
            if  (cercanoFO.distancia<cercanoWL.distancia)  {
              setFO({ ...FO, mensaje: false });
              
            }else if (cercanoWL.distancia<cercanoFO.distancia) {
              setWLess({ ...WLess, mensaje: false });
              
              
            }
          }

        })


    })
  }
//ordenador de las distancias para cobertura 
  const ordenar = (valor1, valor2) => {
    return valor1.id - valor2.id
  }
//autocompletado de la calle de referencia 
  const handleScriptLoad2 = () => {
    const options = {
      componentRestrictions: { country: "cl" }
    };
    const cReferencia = new google.maps.places.Autocomplete(
      document.getElementById('cReferencia'), options
    );
    cReferencia.addListener('place_changed', () => {
      const addressObject2 = cReferencia.getPlace();


      // Check if address is valid

      const query2 = addressObject2.formatted_address;

      setcReferencia(query2);



    })
  }

  /* const  disparador= useDispatch(); */

  /* disparador(pointAction()); disparador(ruttAction('RUT')) */

  /* const evaluador=useSelector(store=>store.evaluador); */


//loading de la deuda en el rut step 1
  const loading2 = () => {
    if (datos.rutvalido === true) {
      do {
        if (cliente.deuda === 0) { break }
        if (cliente.deuda > 0) { break }
        return <Spin indicator={antIcon} />
      } while (cliente.deuda === null);
    }


  }
//loading de la cobertura step 1
  const loading = () => {


    if (query !== "") {
      do {
        if (FO.mensaje === true || WLess.mensaje === true) { break }

        if (FO.sinFO === true && WLess.sinWL === true) { break }

        return <Spin indicator={antIcon} />

      } while (FO.mensaje === false || WLess.mensaje === false);

    }

  }

  // modal
const doc = (ocr,e)=>{

  var nombres = "LEE MARK CLAUDE";
var apellidos = "SATURNO YNOJOSA";
var dni="20.958.067"
var indexnombres = ocr.search(nombres);
var indexapellidos = ocr.search(apellidos);
var indexdni = ocr.search(dni);
var textnombres = ocr.substr(indexnombres,nombres.length);
var textapellidos = ocr.substr(indexapellidos,nombres.length);
var textdni = ocr.substr(indexdni,dni.length);
  console.log("nombres: "+textnombres+" Apellidos: "+textapellidos+" DNI: "+textdni);
  console.log(e);
}
  const [ViewModal, setViewModal] = useState(
    {
      loading: false,
      visible: false
    }
  );

  const showModal = () => {
    setViewModal({
      ...ViewModal,
      visible: true,
    });
  };

  const handleOk = () => {
    setViewModal({
      ...ViewModal,
      loading: true,
    });
    setTimeout(() => {
      setViewModal({ ...ViewModal, loading: false, visible: false });
    }, 3000);
  };

  const handleCancel = () => {
    setViewModal({ ...ViewModal, visible: false });
  };
  // fin modal
 const LengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
     object.target.value = object.target.value.slice(0, object.target.maxLength)
      }
      if (object.target.value.length > object.target.minLength) {
        object.target.value = object.target.value.slice(0, object.target.maxLength)
         }
    }
  const { Option } = Select;

  const onSearch = (val) => {
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
                  <input type="number" name="rut" onInput={LengthCheck} minLength={7} maxLength={8} onChange={captarrut} className="form-control" placeholder="12672579" />
                </div>

                <div>
                  <input type="text" name="digito" maxLength="1" onBlur={verificadorrut} onChange={captarrut} className="form-control" placeholder={1} />
                </div>

                <div>
                  <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button disabled={datos.rutvalido === true ? false : true} ><Icon name={datos.rutvalido === true ? "valido" : "validoF"} /></Button>
                    <Button disabled={datos.rutinvalido === true ? false : true}><Icon name={datos.rutinvalido === true ? "invalido" : "invalidoF"} /></Button>
                    <Button disabled={cliente.deuda > 0 ? false : true}><Icon name={cliente.deuda > 0 ? "deudor" : "deudorF"} /></Button>
                  </ButtonGroup>
                </div>

                <span className="lg-cols-3 cobertura" id="cobertura"> {loading2()} {datos.rutinvalido === true ? "Rut invalido " : "" || datos.rutvalido === true ? "Rut Valido " : ""}{cliente.deuda > 0 ? <span>¡Rut deudor!</span> : ""}</span>


              </div>
            </div>

            <div className="form-group ed-grid">

              <label className="text-ups">Direcci&#243;n</label>

              <div className="ed-grid lg-grid-4">
                <div class="lg-cols-3">
                  <input name="direccion" className="form-control" type="text" placeholder="Escribe tu direccion" id='autocomplete' />

                </div>

                <div>
                  <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button disabled={FO.mensaje === true ? false : true} ><Icon name={FO.mensaje === true ? "fibraOp" : "fibraOpF"} /></Button>
                    <Button disabled={WLess.mensaje === true ? false : true}><Icon name={WLess.mensaje === true ? "wifi" : "wifiF"} /></Button>
                  </ButtonGroup>
                </div>

                <span className="lg-cols-3 cobertura" id="cobertura"> {loading()} {WLess.mensaje === true ? <span>Tu cobertura más cercana es: WIRELESS Nodo: {cercanoWL.dispositivo}</span> : "" || FO.mensaje === true ? <span>Tu cobertura más cercana es: FIBRA OPTICA Nodo: {cercanoFO.dispositivo}</span> : "" || (FO.sinFO === true && WLess.sinWL === true) ? "!No hay Cobertura¡" : ""}</span>

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
                <Icon name="scan" />
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
                <Camera1 doc={doc}></Camera1>
              </Modal>
            </div>

            <div className="separador">
              <span className="text-ups spanSeparador">Datos del titular</span>
              <div className="ed-grid lg-grid-3">
                <div className="form-group">
                  <label className="text-ups">Run</label>
                  <input type="text" name="rut"  className="form-control" placeholder="" value={datos.rut+'-'+ datos.digito} readOnly />
                </div>
                <div className="form-group">
                  <label className="text-ups">Serie run</label>
                  <input type="text" name="run" className="form-control" value={Clientes.run} onChange={captadatos} required />
                </div>
                <div className="form-group">
                  <label className="text-ups">Fecha de nacimiento</label>
                  <input type="date" name="fNacimiento" className="form-control" value={Clientes.fNacimiento} onChange={captadatos} placeholder={1} required />
                </div>
              </div>

              <div className="ed-grid lg-grid-3">
                <div className="form-group">
                  <label className="text-ups">Nombres</label>
                  <input type="text" name="nombres" className="form-control" value={Clientes.nombres} onChange={captadatos} required />
                </div>
                <div className="form-group">
                  <label className="text-ups">Apellido paterno</label>
                  <input type="text" name="apPaterno" className="form-control" value={Clientes.apPaterno} onChange={captadatos} required />
                </div>
                <div className="form-group">
                  <label className="text-ups">Apellido materno</label>
                  <input type="text" name="apMaterno" className="form-control" value={Clientes.apMaterno} onChange={captadatos} required />
                </div>
              </div>

              <div className="ed-grid lg-grid-2">
                <div className="form-group">
                  <label className="text-ups">Tel&#233;fono</label>
                  <div className="ed-grid lg-grid-6">
                    <div className="lg-cols-2">
                      <input type="tel" className="form-control" value="+569" readOnly />
                    </div>

                    <div className="lg-cols-4">
                      <input type="number" onInput={LengthCheck} name="phone"  className="form-control" value={Clientes.phone} onChange={captadatos} minLength="8" maxLength="8" required />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="text-ups">Correo electr&#243;nico</label>
                  <input type="email" name="email" className="form-control" onBlur={(e) => {
                    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(e.target.value)) { return (true) } message.error({
                      content: ' ¡escriba un correo valido!',
                      duration: 5,
                      style:
                      {
                        marginTop: '13vh', float: 'right',
                      }
                    }); return (false)
                  }} onChange={captadatos} required title="Por favor, solo proporciona una dirección de correoᵉ valida" />
                </div>

              </div>

            </div>

            <div className="separador">
              <span className="text-ups spanSeparador">Datos de la direcci&#243;n</span>

              <div className="ed-grid">
                <div className="form-group">
                  <label className="text-ups">Direcci&#243;n</label>

                  <input name="direccion" className="form-control" type="text" value={query} readOnly />
                </div>
              </div>


              <div className="ed-grid lg-grid-2">
                <div className="form-group">
                  <label className="text-ups">Block / Manzana</label>
                  <input type="text" name="blocManzana" className="form-control" value={Clientes.blocManzana} onChange={captadatos} />
                </div>

                <div className="form-group">
                  <label className="text-ups">Departamento / Sitio</label>
                  <input type="text" name="dptoSitio" className="form-control" value={Clientes.dptoSitio} onChange={captadatos} />
                </div>
              </div>

              <div className="ed-grid">
                <div className="form-group">
                  <label className="text-ups">Calle referencia</label>
                  <input name="cReferencia" className="form-control" value={Clientes.cReferencia} onChange={captadatos} type="text" id='cReferencia' onFocus={handleScriptLoad2} required />
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
                    required
                    onChange={(value) => {
                      setClientes({
                        ...Clientes,
                        plan: value
                      })
                    }}
                    onSearch={onSearch}

                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="1">{WLess.mensaje === true ? "6 BM" : "" || FO.mensaje === true ? "50 MB" : ""}</Option>
                    <Option value="2">{WLess.mensaje === true ? "8 BM" : "" || FO.mensaje === true ? "200 MB" : ""}</Option>
                    <Option value="3">{WLess.mensaje === true ? "10 BM" : "" || FO.mensaje === true ? "300 MB" : ""}</Option>
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
            <Icon name="exito" />
          </div>
        }
      ></CardStep>,
    },

  ];

  const [current, setCurrent] = useState(0);

  const next = () => {
    if (datos.rutvalido === true) {
      if (cliente.deuda === 0) {
        if (query !== "") {
          if (WLess.mensaje === true || FO.mensaje === true) {
            setprocesar(true);
            if (current === 1) {
              if (Clientes.run !== "") {
                if (Clientes.fNacimiento !== null) {
                  if (Clientes.nombres !== "") {
                    if (Clientes.apPaterno !== "") {
                      if (Clientes.apMaterno !== "") {
                        if (Clientes.phone !== "") {
                          if (Clientes.email !== "") {
                            if (cReferencia !== "") {
                              if (Clientes.plan !== "") {
                                setCurrent(current + 1);
                              } else {
                                message.error(
                                  {
                                    content: ' ¡Debe seleccionar un plan!',
                                    duration: 5,
                                    style: {
                                      marginTop: '13vh', float: 'right',
                                    }
                                  }
                                )
                              }
                            } else {
                              message.error(
                                {
                                  content: ' ¡Debe proporcionar una calle de referencia!',
                                  duration: 5,
                                  style: {
                                    marginTop: '13vh', float: 'right',
                                  }
                                }
                              )
                            }
                          } else {
                            message.error(
                              {
                                content: ' ¡Debe proporcionar un email!',
                                duration: 5,
                                style: {
                                  marginTop: '13vh', float: 'right',
                                }
                              }
                            )
                          }
                        } else {
                          message.error(
                            {
                              content: ' ¡Debe proporcionar un numero de telefono!',
                              duration: 5,
                              style: {
                                marginTop: '13vh', float: 'right',
                              }
                            }
                          )
                        }
                      } else {
                        message.error(
                          {
                            content: ' ¡Debe proporcionar un Apellido materno!',
                            duration: 5,
                            style: {
                              marginTop: '13vh', float: 'right',
                            }
                          }
                        )
                      }
                    } else {
                      message.error(
                        {
                          content: ' ¡Debe proporcionar un Apellido paterno!',
                          duration: 5,
                          style: {
                            marginTop: '13vh', float: 'right',
                          }
                        }
                      )
                    }
                  } else {
                    message.error(
                      {
                        content: ' ¡ Debe proporcionar un nombre o nombres!',
                        duration: 5,
                        style: {
                          marginTop: '13vh', float: 'right',
                        }
                      }
                    )
                  }
                }else {
                  message.error(
                    {
                      content: ' ¡Debe proporcionar una fecha de nacimiento!',
                      duration: 5,
                      style: {
                        marginTop: '13vh', float: 'right',
                      }
                    }
                  )
                }
              } else {
                message.error(
                  {
                    content: ' ¡Debe proporcionar una Serie run!',
                    duration: 5,
                    style: {
                      marginTop: '13vh', float: 'right',
                    }
                  }
                )
              }
            } else { setCurrent(current + 1); }
          }
          else
            message.error(
              {
                content: ' ¡Sin cobertura! ¡imposible avanzar!',
                duration: 5,
                style:
                {
                  marginTop: '13vh', float: 'right',
                }
              }
            )
        }
        else message.error(
          {
            content: ' ¡Tiene que escribir una dirección!',
            duration: 5, style:
            {
              marginTop: '13vh', float: 'right',
            }
          }
        )
      }

      else {
        message.error({
          content: ' ¡Deudor no puedes avanzar!',
          icon: <Icon name="deudor" />,
          duration: 5,
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
      content: ' ¡Por favor ingresa un rut valido!',
      icon: <Icon name="invalido" />,
      duration: 5,
      style: {
        marginTop: '13vh', float: 'right',
      }
    })

  }

  const final = () => {
    axios.get('https://api.workerapp.cl/api/subscripcion/' + Clientes.nombres + '/' + Clientes.apPaterno + '/' + Clientes.apMaterno + '/' + datos.rut + '-' + datos.digito + '/' + Clientes.run + '/' + '+569' + Clientes.phone + '/' + Clientes.email + '/' + Clientes.fNacimiento + '/' + query + ', ' + Clientes.blocManzana + ', ' + Clientes.dptoSitio + '/' + cReferencia + '/' + Clientes.plan + '/' + Clientes.user)

      .then(res => {

        message.success({
          content: '¡Cliente creado exitosamente!', duration: 5,

          style: {
            marginTop: '13vh', float: 'right',
          }
        });
        setTimeout(() => {
          axios.get('https://api.workerapp.cl/api/sms/' + '+569' + Clientes.phone + '/' + datos.rut + '-' + datos.digito)

            .then(res => {

              message.success({
                content: '¡mensaje de verificacion enviado exitosamente!', duration: 5,

                style: {
                  marginTop: '13vh', float: 'right',
                }
              });
              setTimeout(() => {
                
                setClientes({
                  rut: "",
                  email: "",
                  run:"",
                  fNacimiento: null,
                  user: "",
                  nombres: "",
                  apPaterno: "",
                  apMaterno: "",
                  phone: "",
                  plan: "",
                  cReferencia: '',
                  direccion:"",
                  blocManzana: "",
                  dptoSitio: ""
                });
                setCurrent(0);
  
                setprocesar(false);
                setFO({ mensaje: false, sinFO: false });
                setWLess({ mensaje: false, sinFO: false });
                setcliente({ rut: "", deuda: null });
                setcercanoFO({ distancia: "", dispositivo: "" });
                setcercanoWL({ distancia: "", dispositivo: "" });
              }, 2000);
            })
        }, 3000);

      })
  }

  const prev = () => {

    setCurrent(current - 1);
    if (current === 1) {
      setprocesar(false);
    }
  }


  const [procesar, setprocesar] = useState(false);

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
            <BTN type="primary" className="btn-SVG" onClick={() => { next() }}>
              { procesar === false ? <span>CREAR CLIENTE <Icon name="shoppingCart" /></span> : "PROCESAR"}
            </BTN>

          )}
          {current === steps.length - 1 && (
            <BTN type="primary" onClick={() => { final() }}>
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
      {/* <Segurity/> */}
      <Footer></Footer>
    </div>
  );

}

export default Evaluador;
