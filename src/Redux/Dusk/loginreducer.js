import axios from 'axios';
import { toast } from 'react-toastify';
//Constanes
const LoginState={
    user:[],
    atividad:false
};

//types
const OPTENER_Y_VALIDAR_USUARIOS="OPTENER_Y_VALIDAR_USUARIOS";
var fix=false;
var fixarray=[];
//reducer
export default function Loginreducer(state=LoginState,action){
    switch (action.type) {
        case OPTENER_Y_VALIDAR_USUARIOS:
            if(action.payload!=""){
                fix=true;
                fixarray=action.payload;
            }
            return {...state, user:fixarray,atividad:fix}
        default:
            return state
    }
}

//Acciones
export const LoginAction = (user,pass) => async (dispatch,getState) =>{
    try {
        const res= await axios.get("https://api.workerapp.cl/apiv2/auth/"+user+"/"+pass);
        if(res.data!=""){
            toast.success('¡Usuario verificado con exito!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else{
            toast.error('Usuario o contraseña incorrecta', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        dispatch({
            type:OPTENER_Y_VALIDAR_USUARIOS,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}