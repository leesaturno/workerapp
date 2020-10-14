import React,{useRef,useCallback,useState,useEffect} from 'react';
import './Verificador.scss';
import CardStep from '../../component/Card/CardStep';
import { createWorker } from 'tesseract.js';
import Webcam from "react-webcam";


function Verificador() {
  //webcam
  const webcamRef = useRef(null);
  const [imageSrc,setImgSrc] = useState(null);
  const videoConstraints = {
    facingMode: "environment",
    width: { min: 480 },
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
  const [ocr, setOcr] = useState('Recognizing...');
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

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <img src={imageSrc} ></img>
      {ocr}
      <button onClick={()=>{capture();}}>capture</button>
    </>
  );
  
}

export default Verificador;
