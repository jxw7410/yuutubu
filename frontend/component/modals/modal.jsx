import React from 'react';
import { closeModal } from '../../actions/modal/modal_action';
import { connect } from 'react-redux';
import UnsubscribeModal from './unsubscribe_modal';


function Modal({ modal, closeModal }) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal.type) {
    case 'UNSUBSCRIBE':
      component = <UnsubscribeModal subId = {modal.payload.subId} />
      break;
    default:
      return null;
  }

  return (
    <React.Fragment>
      {
        component ?
          <div className="modal-background flex-horizontal--style-1" onClick={closeModal}>
            <div className="modal-child" onClick={e => e.stopPropagation()}>
              {component}
            </div>
          </div> : null
      }
    </React.Fragment>
  );
}



const mapStateToProps = state => ({
  modal: state.ui.modal
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);