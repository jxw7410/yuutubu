import {combineReducers} from 'redux';
import sessionReducer from './auth/session_reducer';
import entitiesReducer from './entities/entities_reducer';

export default combineReducers({
    entities: entitiesReducer,
    session: sessionReducer
});

