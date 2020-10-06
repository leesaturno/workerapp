import axios from 'axios';

//Constanes
const LoginState={
    user:[]
};

//types
const OPTENER_Y_VALIDAR_USUARIOS="OPTENER_Y_VALIDAR_USUARIOS";

//reducer
export default function Loginreducer(state=LoginState,action){
    switch (action.type) {
        case OPTENER_Y_VALIDAR_USUARIOS:
            return {...state, user:action.payload}
        default:
            return state
    }
}

//Acciones
export const LoginAction = () => async (dispatch,getState) =>{
    try {
        const res= await axios.get('https://api.workerapp.cl/apiv2/auth/sierra/Password123');
        dispatch({
            type:OPTENER_Y_VALIDAR_USUARIOS,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}