import React,{useRef,useCallback,useState,useEffect} from 'react';
import './Verificador.scss';
import { createWorker } from 'tesseract.js';
import Webcam from "react-webcam";
import {useDispatch} from 'react-redux';
import { Button } from 'antd';
import {cam2} from '../../Redux/Dusk/verificadorreducer';


function Camera1(props) {
  const disparador=useDispatch();

  const webcamRef = useRef(null);
  const [imageSrc,setImgSrc] = useState(null);
  const videoConstraints = {
    facingMode: 'user',
    width: { min: 400 },
    height: { min: 720 },
    aspectRatio: 0.6666666667
  };
  
  
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);
  

  function ord() {
    if(imageSrc==null){
      return (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
            <div className="controls">
                <button onClick={()=>{capture();}} className="btnCapture snap"></button>
            </div>
        </>
      );
    }else{
      return (
        <>
          <img src={imageSrc} ></img>
            <div>El reconocimiento puede tardar minutos por favor no recarge la pagina ni apage su pantalla </div>
        </>
      );
    }
  }

  
  return (
    <>
      {ord()}
    </>
  );

}

export default Camera1;
