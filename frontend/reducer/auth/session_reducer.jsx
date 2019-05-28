import { RECEIVE_USER, LOGOUT_USER } from "../../actions/session/session_action";

const _nullSession = {
        id: null
};


const sessionReducer = (state= _nullSession, action) => {
    Object.freeze(state)
    switch(action.type){
        case RECEIVE_USER:
            return { id: action.user.id }
        
            case LOGOUT_USER:
            return _nullSession;

        default:
            return state;
    }
}

export default sessionReducer;

