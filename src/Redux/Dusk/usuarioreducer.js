import axios from 'axios';

//Constanes
const StateUsuario={
  registro:[]
};

//types
const GUARDAR_DATOS_DE_USUARIO_EN_API="GUARDAR_DATOS_DE_USUARIO_EN_API";

//reducer
export default function Usuarioreducer(state=StateUsuario,action){
    switch (action.type) {
        case GUARDAR_DATOS_DE_USUARIO_EN_API:
            return {...state,registro:action.payload}
        default:
            return state
    }
}

//Acciones
export const usuarioinsertaction = (username,password,index_privilegios,nombre,email,cumpleanos,direccion,cargo,telefono,telefono2,estado) => async (dispatch,getState) =>{
    try {
        const res= await axios.get("http://api.workerapp.cl/apiv2/saveuser/"+username+"/"+password+"/"+index_privilegios+"/"+nombre+"/"+email+"/"+cumpleanos+"/"+direccion+"/"+cargo+"/"+telefono+"/"+telefono2+"/"+estado);
        dispatch({
            type:GUARDAR_DATOS_DE_USUARIO_EN_API,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}