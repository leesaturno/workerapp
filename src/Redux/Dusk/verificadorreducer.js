import axios from 'axios';

//Constanes
const StateUsuariospecifi={
  registro:[],
  role:'false',
  role1:'false'
};

//types
const DATOS_USUARIOS_ESPECIFICO="DATOS_USUARIOS_ESPECIFICO";
const DATOS_VARIABLES_DEL_VERIFICADOR_ENTRE_WEB_CAM_Y_VERIFICADOR="DATOS_VARIABLES_DEL_VERIFICADOR_ENTRE_WEB_CAM_Y_VERIFICADOR";
const DATOS_VARIABLES_DEL_VERIFICADOR_ENTRE_WEB_CAM_Y_VERIFICADOR1="DATOS_VARIABLES_DEL_VERIFICADOR_ENTRE_WEB_CAM_Y_VERIFICADOR1";


//reducer
export default function verificadoreducer(state=StateUsuariospecifi,action){
    switch (action.type) {
        case DATOS_USUARIOS_ESPECIFICO:
            return {...state,registro:action.payload}
        case DATOS_VARIABLES_DEL_VERIFICADOR_ENTRE_WEB_CAM_Y_VERIFICADOR:
            return {...state,role:action.payload}
        case DATOS_VARIABLES_DEL_VERIFICADOR_ENTRE_WEB_CAM_Y_VERIFICADOR1:
            return {...state,role1:action.payload}
        default:
            return state
    }
}

//Acciones
export const rutsaction = (ruts) => async (dispatch,getState) =>{
    try {
        const res= await axios.get('https://api.workerapp.cl/apiv2/verificador/'+ruts);
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