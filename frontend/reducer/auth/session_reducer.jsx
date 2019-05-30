import { RECEIVE_USER, LOGOUT_USER, RECEIVE_EMAIL, RECEIVE_CLEAR_EMAIL } from "../../actions/session/session_action";
import { merge }  from 'lodash'

const _nullSession = {
        id: null,
        email: null
};


const sessionReducer = (state= _nullSession, action) => {
    Object.freeze(state)
    switch(action.type){
        case RECEIVE_USER:
            return { id: action.user.id, email: null }
        
        case RECEIVE_EMAIL:
            const newState = merge({}, state)
            newState.email = action.email
            return newState;
        case RECEIVE_CLEAR_EMAIL:
            return merge({}, state, { email: null } )
        case LOGOUT_USER:
            return _nullSession;

        default:
            return state;
    }
}

export default sessionReducer;

