import { connect } from 'react-redux';
import React, {useEffect} from 'react';
import { closeModal } from '../../actions/modal/modal_action';
import {withRouter} from 'react-router-dom';


const VideoUploadModal = props => {

    // ComponentWillUnmount
    useEffect( ()=>{
        return () => props.closeModal();
    }, [])

    const redirect = url => {
        return e => {
            props.closeModal();
            props.history.push(url)
        }
    }

    return (
        <ul className='video-upload-modal box-shad-s1'>
            <li className='flexh-1'
                style={{ height: '40px' }}
                onClick={redirect('/upload')}>
                Upload Video
                </li>
        </ul>
    )
}

const mapStateToProps = () => ({
        formType: 'upload_vid',
});

const mapDispatchToProps = dispatch => ({
        closeModal: () => dispatch(closeModal())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VideoUploadModal));