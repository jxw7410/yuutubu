import React from 'react';
import { closeModal } from '../../actions/modal_action';
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
        case 'search':
            component = <SearchModal />
            break;
        case 'unsubscribe':
            component = null;
            break;
        default:
            return null;
    }

    return (
        <>
            {
                component ? 
                    <div className="modal-background" onClick={closeModal}>
                        <div className="modal-child" onClick={e => e.stopPropagation()}>
                            {component}
                        </div>
                    </div>  : null
            }
        </>
    );
}



const mapStateToProps = state => {
    return {
        modal: state.ui.modal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);