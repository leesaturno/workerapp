import axios from 'axios';


//Constanes
const StateCLIENTE = {
    cliente: [],
    update: [],
    clientes: [],
    

};

//types
const OBTENER_DATOS_DE_CLIENTE_EN_API="OBTENER_DATOS_DE_CLIENTE_EN_API";
const ACTUALIZAR_DATOS_DE_CLIENTE_EN_API = "ACTUALIZAR_DATOS_DE_CLIENTE_EN_API";
const OBTENER_DATOS_DE_CLIENTES_EN_API = "OBTENER_DATOS_DE_CLIENTES_EN_API";
//reducer
export default function Clientesreducer(state = StateCLIENTE, action) {
    switch (action.type) {
        case ACTUALIZAR_DATOS_DE_CLIENTE_EN_API:
            return { ...state, update: action.payload }
        case OBTENER_DATOS_DE_CLIENTES_EN_API:
            return { ...state, clientes: action.payload }
            case OBTENER_DATOS_DE_CLIENTE_EN_API:
            return { ...state, cliente:action.payload }
        default:
            return state
    }
}

//Acciones

export const CLIENTEUpdateaction = (username2, username, password, index_privilegios, nombre, email, cumpleanos, direccion, cargo, telefono, telefono2, estado) => async (dispatch, getState) => {
    try {
        const res = await axios.get("https://apitwork.000webhostapp.com/api/editeuser/" + username2 + "/" + username + "/" + password + "/" + index_privilegios + "/" + nombre + "/" + email + "/" + cumpleanos + "/" + direccion + "/" + cargo + "/" + telefono + "/" + telefono2 + "/" + estado);
        dispatch({
            type: ACTUALIZAR_DATOS_DE_CLIENTE_EN_API,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}
export const getCLIENTES = () => async (dispatch, getState) => {
    try {
        const res = await axios.get("https://apitwork.000webhostapp.com/apiv2/clientes");
  
        dispatch({
            type: OBTENER_DATOS_DE_CLIENTES_EN_API,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}
export const getCLIENTE = (val) => async (dispatch, getState) => {
    try {
        const res = await axios.get("https://apitwork.000webhostapp.com/apiv2/cliente/" + val);
  
        dispatch({
            type: OBTENER_DATOS_DE_CLIENTE_EN_API,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}