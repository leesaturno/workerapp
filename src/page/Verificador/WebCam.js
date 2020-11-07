import React,{useRef,useCallback,useState,useEffect} from 'react';
import './Verificador.scss';
import { createWorker } from 'tesseract.js';
import Webcam from "react-webcam";
import {useDispatch} from 'react-redux';
import { Button } from 'antd';
import {cam1,cam2} from '../../Redux/Dusk/verificadorreducer';


function Camera(props) {
  const disparador=useDispatch();

  const webcamRef = useRef(null);
  const [imageSrc,setImgSrc] = useState(null);
  const [imageSrc1,setImgSrc1] = useState(null);

  const videoConstraints = {
    facingMode: props.modecam,
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
 
  const capture1 = useCallback(() => {
    const imageSrc1 = webcamRef.current.getScreenshot();
    setImgSrc1(imageSrc1);
  }, [webcamRef, setImgSrc1]);

  //Tesseract
  const [ocr, setOcr] = useState('Reconociendo...');
  const doOCR = async () => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(imageSrc);
    setOcr(text)
    await worker.terminate();
  }
  
  const [quees,setquees] =useState(true);
  

  useEffect(()=>{
    doOCR()
  });

  

  function verif() {
    let col1=ocr.indexOf(props.rut);
    let col2=ocr.indexOf(props.fcn);
    let col3=ocr.indexOf(props.nombres);
    let col4=ocr.indexOf(props.apellidosP);
    let col5=ocr.indexOf(props.apellidosM);

    if(ocr!=='Reconociendo...'){
      if(col1>0 && col2>0 && col3>0 && col4>0 && col5>0){
        if(quees===true){
          return (<>Exito <br/><br/> <Button onClick={()=>{ disparador(cam1("ocultar1")); setquees(false); }}> Enviar </Button> <br/></>);  
        }else{
          return (<>Enviado</>);  
        }
      }else{
        return (<>fallo verificacion</>);  
      }
    }else{
     return '' ;
    }
  }

  

  function ord() {
    if(imageSrc===null){
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
              <br/>
              {
                verif()
              }
              <br/>
            <div>El reconocimiento puede tardar minutos por favor no recarge la pagina ni apage su pantalla </div>
            
        </>
      );
    }
  }

  function selfie(){
    if(imageSrc1===null){
    return (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
            <div className="controls">
                <button onClick={()=>{capture1(); disparador(cam2("ocultar1"));}} className="btnCapture snap"></button>
            </div>
        </>
      );
    }else{
      return(
      <>
        <img src={imageSrc1} ></img>
            <br/>
        <div> Selfie realizada con exito </div>
      </>);
    }
  }

  function ordverif(){
    if(props.modecam==="user"){
      return(<>
        {selfie()}
      </>);
    }else{
      return(<>
        {ord()}
      </>);
    }
  }

  
  return (
    <>
      {ordverif()}
    </>
  );

}

export default Camera;
