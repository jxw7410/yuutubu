import React from 'react';
import { closeModal } from '../../actions/modal/modal_action';
import { connect } from 'react-redux';
import VideoUploadModal from './video_upload_modal';
import SearchModal from './search_modal';


function Modal({ modal, closeModal }) {
    if (!modal) {
        return null;
    }
    let component;

    switch (modal) {
        case 'upload_vid':
            component = <VideoUploadModal />
            break;
        case 'unsubscribe':
            component = null;
            break;
        default:
            return null;
    }

    return (
        <React.Fragment>
            {
                component ? 
                    <div className="modal-background" onClick={closeModal}>
                        <div className="modal-child" onClick={e => e.stopPropagation()}>
                            {component}
                        </div>
                    </div>  : null
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