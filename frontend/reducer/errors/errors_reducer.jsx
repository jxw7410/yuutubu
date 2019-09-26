import { RECEIVE_ERRORS, RECEIVE_EMAIL, RECEIVE_USER, RECEIVE_EMAIL_ERROR } from '../../actions/session/session_action';



const errorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_EMAIL:
      return [];
    case RECEIVE_USER:
      return [];
    case RECEIVE_ERRORS:
      return action.errors
    case RECEIVE_EMAIL_ERROR:
      return action.errors
    default:
      return [];
  }
}


export default errorsReducer;