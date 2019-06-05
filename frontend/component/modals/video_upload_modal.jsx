import { connect } from 'react-redux';
import React from 'react';
import { openModal, closeModal } from '../../actions/modal_action';
import {withRouter} from 'react-router-dom';


class VideoUploadModal extends React.Component{
    constructor(props){
        super(props);
        this.redirect = this.redirect.bind(this);
    }

    redirect(url){
        return e => {
            this.props.closeModal();
            this.props.history.push(url)
        }
    }


    componentWillUnmount(){
        this.props.closeModal();
    }


    render(){
        return (
            <ul id='video-upload-modal'>
                <li onClick={this.redirect('/upload') }>Upload Video</li>
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        formType: 'upload_vid',
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VideoUploadModal));