import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import Loginreducer from './Dusk/loginreducer';
import pointreducer from './Dusk/pointreducer';



const rootReducer = combineReducers({
    session: Loginreducer,
    evaluador: pointreducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ) );
    return store
}