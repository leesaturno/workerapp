import React,{useRef,useCallback,useState,useEffect} from 'react';
import './Verificador.scss';
import { createWorker } from 'tesseract.js';
import Webcam from "react-webcam";
import {useDispatch} from 'react-redux';
import { Button } from 'antd';
import {cam2} from '../../Redux/Dusk/verificadorreducer';


function Camera1() {
  const disparador=useDispatch();

  const webcamRef = useRef(null);
  const [imageSrc,setImgSrc] = useState(null);
  const videoConstraints = {
    facingMode: { exact: "environment" },
    width: { min: 400 },
    height: { min: 720 },
    aspectRatio: 0.6666666667
  };
  const worker = createWorker({
    logger: m => console.log(m),
  });
  
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
      
  }, [webcamRef, setImgSrc]);
  const [ocr, setOcr] = useState('Reconociendo...');
  const doOCR = async () => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(imageSrc);
    setOcr(text)
    await worker.terminate();
  }
  useEffect(()=>{
    doOCR()
  });

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
        
          <img src={imageSrc} alt="" ></img>
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
