import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import Loginreducer from './Dusk/loginreducer';
import pointreducer from './Dusk/pointreducer';
import Usuarioreducer from './Dusk/usuarioreducer';
import verificadoreducer from './Dusk/verificadorreducer';
import Clientesreducer from './Dusk/Clientesreducer';
import Cuponesreducer from './Dusk/Cuponesreducer';

const rootReducer = combineReducers({
    session: Loginreducer,
    evaluador: pointreducer,
    Usuarios: Usuarioreducer,
    rutespecifico:verificadoreducer,
    Clientes:Clientesreducer,
    Cupones:Cuponesreducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ) );
    return store
}