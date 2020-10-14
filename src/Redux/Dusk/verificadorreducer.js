import axios from 'axios';

//Constanes
const StateUsuariospecifi={
  registro:[]
};

//types
const DATOS_USUARIOS_ESPECIFICO="DATOS_USUARIOS_ESPECIFICO";

//reducer
export default function Usuarioreducer(state=StateUsuariospecifi,action){
    switch (action.type) {
        case DATOS_USUARIOS_ESPECIFICO:
            return {...state,registro:action.payload}
        default:
            return state
    }
}

//Acciones
export const usuarioinsertaction = (username,password,index_privilegios,nombre,email,cumpleanos,direccion,cargo,telefono,telefono2,estado) => async (dispatch,getState) =>{
    try {
        const res= await axios.get();
        dispatch({
            type:DATOS_USUARIOS_ESPECIFICO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}