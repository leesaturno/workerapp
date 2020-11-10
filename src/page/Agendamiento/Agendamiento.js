import React, { useState, useEffect } from "react";
import "./Agendamiento.scss";
import CardStep from "../../component/Card/CardStep";
import Footer from "../../component/Footer/Footer";
import { Radio } from "antd";
import axios from "axios";
import {

  useHistory,
  useParams
} from "react-router-dom";
import { useSelector } from 'react-redux';
import { message, Select } from "antd";

function Agendamiento() {


  let history = useHistory();
  const { id } = useParams();
/*   const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
 */

  const [agendar, setagendar] = useState({
    user: "",
    cliente: "",
    fecha: null,
    costoinstalacion: 10000.00,
    codigodescuento: "",
    tramohorario: "",
    apMaterno: "",
    apPaterno: "",
    nombres: "",
    rut: "",
    costodescuento: ""
  });
  const onChange = (e) => {

    setagendar({ ...agendar, [e.target.name]: e.target.value });
  };
  /* const Clientes = useSelector((store) => store.Clientes); */
  const Usuar = useSelector((store) => store.session);
  const [stop, setStop] = useState(false);
  const [cup, setcup] = useState([]);
  const [cupn, setcupn] = useState();
  useEffect(() => {

    axios.get("https://api.workerapp.cl/apiv2/cliente/" + id)
      .then(res => {



        const client = res.data;
        client.forEach(element => {
          let cli_id = element.id;

          let nombres = element.nombres;

          let apMaterno = element.apMaterno;

          let apPaterno = element.apPaterno;

          let rut = element.rut;
          setagendar({
            ...agendar,
            cliente: cli_id,
            apPaterno: apPaterno,
            apMaterno: apMaterno,
            nombres: nombres,
            rut: rut
          })
        })
        Usuar.user.forEach(element => {
          let usr_id = element.id_user;
       
          setagendar({
            ...agendar,
            user: usr_id
          
          })
        })
        axios.get("https://api.workerapp.cl/apiv2/cupones/"+agendar.user)
          .then(res => {
            res.data.forEach(cupon => {
              if (cupon.codigo === agendar.codigodescuento) {

                setcupn(cupon.valor)
              }
            })
            setcup(res.data)

          })

      })
  }, []);

  const submit = (e) => {
    e.preventDefault();

    if(agendar.codigodescuento!==""){
      
      setTimeout(() => {
    axios.get("https://api.workerapp.cl/apiv2/agendar/" + agendar.user + "/" + agendar.cliente + "/" + agendar.fecha + "/" + (agendar.costoinstalacion - cupn)+ "/" + agendar.tramohorario + "/" + agendar.codigodescuento)
      .then(res => {
        message.success({
          content: "Instalacion agendada",
          duration: 5,
          style: {
            marginTop: "13vh",
            float: "right",
          },
        });

      })
    let timeout = 5000;
    setTimeout(() => {
      history.push("/Portafolio")
    }, timeout);
  }, 4000);
  }else {axios.get("https://api.workerapp.cl/apiv2/agendar/" + agendar.user + "/" + agendar.cliente + "/" + agendar.fecha + "/" + agendar.costoinstalacion + "/" + agendar.tramohorario)
  .then(res => {
    message.success({
      content: "Instalacion agendada",
      duration: 5,
      style: {
        marginTop: "13vh",
        float: "right",
      },
    });

  })
let timeout = 5000;
setTimeout(() => {
  history.push("/Portafolio")
}, timeout);}
  }

  return (
    <>

      <div className="main mt-5">
        <CardStep
          title="Agendamiento"
          content={

            <div>
              <form>

                <div className="ed-grid lg-grid-6">
                  <div className="lg-cols-2">
                    <div className="form-group">
                      <label className="text-ups">Rut</label>
                      <input type="text" value={agendar.rut} className="form-control" />
                    </div>
                  </div>

                  <div class="lg-cols-4">
                    <div className="form-group">
                      <label className="text-ups">Nombres</label>
                      <input
                        type="text"

                        className="form-control"
                        value={agendar.nombres + " " + agendar.apPaterno + " " + agendar.apMaterno}

                      />
                    </div>
                  </div>
                </div>

                <div className="ed-grid lg-grid-3">
                  <div className="form-group">
                    <label className="text-ups">Tramo horario</label>
                    <br />
                    <br />
                    <Radio.Group onChange={onChange} value={agendar.tramohorario} name="tramohorario">
                      <Radio value={"AM"}>AM</Radio>
                      <Radio value={"PM"}>PM</Radio>
                    </Radio.Group>
                    <br /><br />
                  </div>
                  <div className="form-group">
                    <label className="text-ups">Costo de instalación</label>
                    <input
                      type="text"
                      name="apPaterno"
                      className="form-control"
                      value={agendar.codigodescuento !== "" ? "$" + (agendar.costoinstalacion - cupn) : "$" + agendar.costoinstalacion}

                      readOnly
                    />
                  </div>

                  <div className="form-group">
                    <label className="text-ups">Fecha agenda</label>
                    <input
                      type="date"
                      name="fecha"
                      className="form-control"
                      onChange={onChange}
                    />
                  </div>
                </div>


                <br />
                <div className="ed-grid">
                  <div className="form-group">
                    <label className="text-ups">
                      Código descuento costo de instalación
                    </label>
                    <Select
                      name="descuento"
                      showSearch
                      placeholder="Selecciona un Cupon"
                      title="Cupones"
                      onChange={(value) => {
                        setagendar({ ...agendar, codigodescuento: value });
                        axios.get("https://api.workerapp.cl/apiv2/cupones/59")
                          .then(res => {
                            res.data.forEach(cupon => {
                              if (cupon.codigo === value) {

                                setcupn(cupon.valor)
                              }
                            })

                          })
                      }}

                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {cup.map((Cup) => (

                        <>
                          <Select.Option key={Cup.codigo}>
                            {Cup.codigo}
                          </Select.Option>
                        </>

                      ))}
                    </Select>
                  </div>
                </div>
                <br /><br /><br />
                <button className="bttn btn-CB text-ups" onClick={submit}>Procesar</button>
              </form>
            </div>
          }
        ></CardStep>
      </div>

      <Footer />
    </>
  );
}

export default Agendamiento;
