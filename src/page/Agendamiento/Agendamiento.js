import React, { useState, useEffect } from "react";
import "./Agendamiento.scss";
import CardStep from "../../component/Card/CardStep";
import Footer from "../../component/Footer/Footer";
import { Radio } from "antd";
function Agendamiento() {
  const [Rad, setRad] = useState({
    value: 1,
  });

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setRad({ ...Rad, value: e.target.value });
  };

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
                      <input type="text" name="rut" className="form-control" />
                    </div>
                  </div>

                  <div class="lg-cols-4">
                    <div className="form-group">
                      <label className="text-ups">Nombres</label>
                      <input
                        type="text"
                        name="nombres"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                <div className="ed-grid lg-grid-3">
                  <div className="form-group">
                    <label className="text-ups">Tramo horario</label>
                    <br />
                    <br />
                    <Radio.Group onChange={onChange} value={Rad.value}>
                      <Radio value={1}>AM</Radio>
                      <Radio value={2}>PM</Radio>
                    </Radio.Group>
                    <br/><br/>
                  </div>
                  <div className="form-group">
                    <label className="text-ups">Costo de instalación</label>
                    <input
                      type="text"
                      name="apPaterno"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="text-ups">Fecha agenda</label>
                    <input
                      type="date"
                      name="fNacimiento"
                      className="form-control"
                    />
                  </div>
                </div>


                <br/>
                <div className="ed-grid">
                  <div className="form-group">
                    <label className="text-ups">
                      Código descuento costo de instalación
                    </label>
                    <input
                      type="text"
                      name="apMaterno"
                      className="form-control"
                    />
                  </div>
                </div>

                <button className="bttn btn-CB text-ups">Procesar</button>
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
