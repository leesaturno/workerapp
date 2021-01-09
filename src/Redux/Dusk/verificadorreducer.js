import axios from 'axios';

//Constanes
const StateUsuariospecifi={
  registro:[],
  role:'false',
  role1:'false',
  tessract:[]
};

//types
const DATOS_USUARIOS_ESPECIFICO="DATOS_USUARIOS_ESPECIFICO";
const DATOS_VARIABLES_DEL_VERIFICADOR_ENTRE_WEB_CAM_Y_VERIFICADOR="DATOS_VARIABLES_DEL_VERIFICADOR_ENTRE_WEB_CAM_Y_VERIFICADOR";
const DATOS_VARIABLES_DEL_VERIFICADOR_ENTRE_WEB_CAM_Y_VERIFICADOR1="DATOS_VARIABLES_DEL_VERIFICADOR_ENTRE_WEB_CAM_Y_VERIFICADOR1";
const DATOS_DE_TESSERACT_ENTRE_WEB_CAM_Y_EVALUADOR="DATOS_DE_TESSERACT_ENTRE_WEB_CAM_Y_EVALUADOR"

//reducer
export default function verificadoreducer(state=StateUsuariospecifi,action){
    switch (action.type) {
        case DATOS_USUARIOS_ESPECIFICO:
            return {...state,registro:action.payload}
        case DATOS_VARIABLES_DEL_VERIFICADOR_ENTRE_WEB_CAM_Y_VERIFICADOR:
            return {...state,role:action.payload}
        case DATOS_VARIABLES_DEL_VERIFICADOR_ENTRE_WEB_CAM_Y_VERIFICADOR1:
            return {...state,role1:action.payload}
              case DATOS_DE_TESSERACT_ENTRE_WEB_CAM_Y_EVALUADOR:
            return {...state,tessract:action.payload}
        default:
            return state
    }
} 

//Acciones
export const rutsaction = (ruts) => async (dispatch,getState) =>{
    try {
        const res = await axios.get('https://apitwork.000webhostapp.com/apiv2/verificador/' + ruts);
        dispatch({
            type:DATOS_USUARIOS_ESPECIFICO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const cam1 = (val) => (dispatch,getState) =>{
    try {
        dispatch({
            type:DATOS_VARIABLES_DEL_VERIFICADOR_ENTRE_WEB_CAM_Y_VERIFICADOR,
            payload: val
        })
    } catch (error) {
        console.log(error)
    }
}


export const cam2 = (val) => (dispatch,getState) =>{
    try {
        dispatch({
            type:DATOS_VARIABLES_DEL_VERIFICADOR_ENTRE_WEB_CAM_Y_VERIFICADOR1,
            payload: val
        })
    } catch (error) {
        console.log(error)
    }
}
export const camevaluador = (ocr) => (dispatch,getState) =>{
    try {
        console.log(ocr)
        dispatch({
            type:DATOS_DE_TESSERACT_ENTRE_WEB_CAM_Y_EVALUADOR,
            payload: ocr
        })
    } catch (error) {
        console.log(error)
    }
}