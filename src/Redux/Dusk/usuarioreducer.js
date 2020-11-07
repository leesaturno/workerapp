import axios from 'axios';

//Constanes
const StateUsuario={
  registro:[],
  update:[],
  users:[]

};

//types
const GUARDAR_DATOS_DE_USUARIO_EN_API="GUARDAR_DATOS_DE_USUARIO_EN_API";
const ACTUALIZAR_DATOS_DE_USUARIO_EN_API="ACTUALIZAR_DATOS_DE_USUARIO_EN_API";
const OBTENER_DATOS_DE_USUARIOS_EN_API="OBTENER_DATOS_DE_USUARIOS_EN_API";
//reducer
export default function Usuarioreducer(state=StateUsuario,action){
    switch (action.type) {
        case GUARDAR_DATOS_DE_USUARIO_EN_API:
            return {...state,registro:action.payload}
        case ACTUALIZAR_DATOS_DE_USUARIO_EN_API:
             return {...state,update:action.payload}
        case OBTENER_DATOS_DE_USUARIOS_EN_API:
             return {...state,users:action.payload}     
        default:
            return state
    }
}

//Acciones
export const usuarioinsertaction = (username,password,index_privilegios,nombre,email,cumpleanos,direccion,cargo,telefono,telefono2,estado) => async (dispatch,getState) =>{
    try {
        const res= await axios.get("https://api.workerapp.cl/apiv2/saveuser/"+username+"/"+password+"/"+index_privilegios+"/"+nombre+"/"+email+"/"+cumpleanos+"/"+direccion+"/"+cargo+"/"+telefono+"/"+telefono2+"/"+estado);
        dispatch({
            type:GUARDAR_DATOS_DE_USUARIO_EN_API,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}
export const usuarioUpdateaction = (username2,username,password,index_privilegios,nombre,email,cumpleanos,direccion,cargo,telefono,telefono2,estado) => async (dispatch,getState) =>{
    try {
        const res= await axios.get("https://api.workerapp.cl/api/editeuser/"+username2+"/"+username+"/"+password+"/"+index_privilegios+"/"+nombre+"/"+email+"/"+cumpleanos+"/"+direccion+"/"+cargo+"/"+telefono+"/"+telefono2+"/"+estado);
        dispatch({
            type:ACTUALIZAR_DATOS_DE_USUARIO_EN_API,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}
export const getusuarios = () => async (dispatch,getState) =>{
    try {
        const res= await axios.get("https://api.workerapp.cl/api/users");
        dispatch({
            type:OBTENER_DATOS_DE_USUARIOS_EN_API,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}