import axios from 'axios';

//Constanes
const LoginState={
    user:[],
    atividad:false
};

//types
const OPTENER_Y_VALIDAR_USUARIOS="OPTENER_Y_VALIDAR_USUARIOS";
var fix;
//reducer
export default function Loginreducer(state=LoginState,action){
    switch (action.type) {
        case OPTENER_Y_VALIDAR_USUARIOS:
            if(action.payload!=""){
                fix=true;
            }
            return {...state, user:action.payload,atividad:fix}
        default:
            return {...state,atividad:false}
    }
}

//Acciones
export const LoginAction = (user,pass) => async (dispatch,getState) =>{
    try {
        const res= await axios.get("https://api.workerapp.cl/apiv2/auth/"+user+"/"+pass);
        dispatch({
            type:OPTENER_Y_VALIDAR_USUARIOS,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}