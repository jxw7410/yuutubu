import { CLOSE_MODAL, OPEN_MODAL } from '../../actions/modal/modal_action';


const modalReducer = (state = null, action) => {
  Object.freeze(state);
  switch (action.type) {
    case OPEN_MODAL:
      return action.modal;
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }

}

export default modalReducer;