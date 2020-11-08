import axios from 'axios';

//Constanes
const StateCLIENTE = {
    registro: [],
    update: [],
    clientes: []

};

//types

const ACTUALIZAR_DATOS_DE_CLIENTE_EN_API = "ACTUALIZAR_DATOS_DE_CLIENTE_EN_API";
const OBTENER_DATOS_DE_CLIENTES_EN_API = "OBTENER_DATOS_DE_CLIENTES_EN_API";
//reducer
export default function Clientesreducer(state = StateCLIENTE, action) {
    switch (action.type) {
        case ACTUALIZAR_DATOS_DE_CLIENTE_EN_API:
            return { ...state, update: action.payload }
        case OBTENER_DATOS_DE_CLIENTES_EN_API:
            return { ...state, clientes: action.payload }
        default:
            return state
    }
}

//Acciones

export const CLIENTEUpdateaction = (username2, username, password, index_privilegios, nombre, email, cumpleanos, direccion, cargo, telefono, telefono2, estado) => async (dispatch, getState) => {
    try {
        const res = await axios.get("https://api.workerapp.cl/api/editeuser/" + username2 + "/" + username + "/" + password + "/" + index_privilegios + "/" + nombre + "/" + email + "/" + cumpleanos + "/" + direccion + "/" + cargo + "/" + telefono + "/" + telefono2 + "/" + estado);
        dispatch({
            type: ACTUALIZAR_DATOS_DE_CLIENTE_EN_API,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}
export const getCLIENTEs = () => async (dispatch, getState) => {
    try {
        const res = await axios.get("https://api.workerapp.cl/apiv2/users");
        dispatch({
            type: OBTENER_DATOS_DE_CLIENTES_EN_API,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}