import { createStore, applyMiddleware} from 'redux';
import { logger } from 'redux-logger';
import  thunk  from 'redux-thunk';
import RootReducer from '../reducer/root_reducer';

//remove_for_production

const configureStore = ( preloadedState = {})=>{
    return createStore(RootReducer, preloadedState, applyMiddleware(thunk))
}

export default configureStore;

