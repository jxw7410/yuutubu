import {RECEIVE_ERRORS, RECEIVE_EMAIL, RECEIVE_USER} from '../../actions/session/session_action';



const errorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_EMAIL:
            return [];
        case RECEIVE_USER:
            return [];
        case RECEIVE_ERRORS:
            return action.errors
        default:
            return [];
    }
}


export default errorsReducer;