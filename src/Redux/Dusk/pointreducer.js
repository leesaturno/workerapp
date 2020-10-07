import axios from 'axios';

//Constanes
const pointState={
    rut:[],
    point:[]
};

//types
const OPTENER_PUNTOS_DE_SERVICIO="OPTENER_PUNTOS_DE_SERVICIO";
const VALIDAR_RUTS="OPTENER_PUNTOS_DE_SERVICIO";

//reducer
export default function pointreducer(state=pointState,action){
    switch (action.type) {
        case OPTENER_PUNTOS_DE_SERVICIO:
            return {...state, point:action.payload}
        case VALIDAR_RUTS:
            return {...state, rut:action.payloa}
        default:
            return state
    }
}

//Acciones
export const pointAction = () => async (dispatch,getState) =>{
    try {
        const res= await axios.get("https://api.workerapp.cl/api/pointservice");
        dispatch({
            type:OPTENER_PUNTOS_DE_SERVICIO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const ruttAction = (rutentrada) => async (dispatch,getState) =>{
    try {
        const res= await axios.get("https://api.workerapp.cl/api/factibilidadrut/"+rutentrada);
        dispatch({
            type:VALIDAR_RUTS,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}