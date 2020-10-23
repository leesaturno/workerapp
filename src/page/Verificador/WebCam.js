import React,{useRef,useCallback,useState,useEffect} from 'react';
import './Verificador.scss';
import { createWorker } from 'tesseract.js';
import Webcam from "react-webcam";
import { OmitProps } from 'antd/lib/transfer/ListBody';



function Camera(props) {
  const webcamRef = useRef(null);
  const [imageSrc,setImgSrc] = useState(null);
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
 
  //Tesseract
  const [ocr, setOcr] = useState('Reconociendo...');
  const doOCR = async () => {
    await worker.load();
    await worker.loadLanguage('spa');
    await worker.initialize('spa');
    const { data: { text } } = await worker.recognize(imageSrc);
    setOcr(text)
  }

  useEffect(()=>{
    doOCR()
  });

  function webcamp(){
    if(imageSrc==null){return(
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
    )}else{
      return(
        <>
          <img src={imageSrc} ></img>
          <br/>
          {ocr}
          <div>El reconocimiento puede tardar minutos por favor no recarge la pagina ni apage su pantalla </div>
      </>)
    }
  }

  return (
    <>
      {webcamp()}
    </>
  );
  
}

export default Camera;
