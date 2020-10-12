import React,{useRef,useCallback,useState} from 'react';
import './Verificador.scss';
import CardStep from '../../component/Card/CardStep';
import { createWorker } from 'tesseract.js';
import Webcam from "react-webcam";


function Verificador() {
  const webcamRef = React.useRef(null);

  const videoConstraints = {
    facingMode: "user",
    width: { min: 480 },
    height: { min: 720 },
    aspectRatio: 0.6666666667
  };
  
  /*const doOCR = async () => {
    await worker.load();
    await worker.loadLanguage('spa');
    await worker.initialize('spa');
    const { data: { text } } = await worker.recognize(imgSrc);
  }*/
  const [imageSrc,setImgSrc] = useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);



 
  return (
    <>
      <Webcam
        audio={false}
        width={480}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      
      <img src={imageSrc} ></img>
      <button onClick={capture}>capture</button>
    </>
  );
  
}

export default Verificador;
