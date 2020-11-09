import axios from 'axios';

import { message } from 'antd';
//Constanes
const StateCUPONE = {
    CUPONE: [],
    update: [],
    CUPONES: [],
    

};

//types
const GUARDAR_DATOS_DE_CUPONE_EN_API="OBTENER_DATOS_DE_CUPONE_EN_API";
const ACTUALIZAR_DATOS_DE_CUPONE_EN_API = "ACTUALIZAR_DATOS_DE_CUPONE_EN_API";
const OBTENER_DATOS_DE_CUPONES_EN_API="OBTENER_DATOS_DE_CUPONES_EN_API"
const OBTENER_DATOS_DE_CUPON_EN_API="OBTENER_DATOS_DE_CUPON_EN_API"
//reducer
export default function Cuponesreducer(state = StateCUPONE, action) {
    switch (action.type) {
        case ACTUALIZAR_DATOS_DE_CUPONE_EN_API:
            return { ...state, update: action.payload }
            case OBTENER_DATOS_DE_CUPONES_EN_API:
                return { ...state, CUPONES: action.payload }
            case GUARDAR_DATOS_DE_CUPONE_EN_API:
            return { ...state, CUPONE:action.payload }
            case OBTENER_DATOS_DE_CUPON_EN_API:
            return { ...state, CUPONE:action.payload }
        default:
            return state
    }
}

//Acciones

export const CUPONEUpdateaction = (username2, username, password, index_privilegios, nombre, email, cumpleanos, direccion, cargo, telefono, telefono2, estado) => async (dispatch, getState) => {
    try {
        const res = await axios.get("https://api.workerapp.cl/api/editeuser/" + username2 + "/" + username + "/" + password + "/" + index_privilegios + "/" + nombre + "/" + email + "/" + cumpleanos + "/" + direccion + "/" + cargo + "/" + telefono + "/" + telefono2 + "/" + estado);
        dispatch({
            type: ACTUALIZAR_DATOS_DE_CUPONE_EN_API,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}
export const getCUPONES = () => async (dispatch, getState) => {
    try {
        const res = await axios.get("https://api.workerapp.cl/apiv2/cupones");
  
        dispatch({
            type:OBTENER_DATOS_DE_CUPONES_EN_API,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
} 
export const setCUPONES = (user,codigo,valor,cantidad,vigencia) => async (dispatch, getState) => {
    try {
        const res = await axios.get("https://api.workerapp.cl/apiv2/cupones/"+user+"/"+codigo+"/"+valor+"/"+cantidad+"/"+vigencia);
        message.success({
            content: "Cupones creados",
      
            style: {
              marginTop: "13vh",
              float: "right",
            },
          });
        dispatch({
            type:GUARDAR_DATOS_DE_CUPONE_EN_API,
            payload: res.data
        })
    } catch (error) {
        message.error({
            content: "Error al crear verifique los datos",
      
            style: {
              marginTop: "13vh",
              float: "right",
            },
          });
    }
}
export const getCUPON = (val) => async (dispatch, getState) => {
    try {
        const res = await axios.get("https://api.workerapp.cl/apiv2/CUPON/"+val);
  
        dispatch({
            type: OBTENER_DATOS_DE_CUPON_EN_API,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}