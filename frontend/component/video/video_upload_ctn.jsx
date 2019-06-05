import { connect } from 'react-redux';
import {createVideo} from '../../actions/video/video_action'
import UploadVideo from './video_upload';

const msp = state =>{
    return {
        user: state.session,
    }
}

const mdp = dispatch => {
    return {
        createVideo: videoPayload => dispatch(createVideo(videoPayload)),

    }
}

export default connect(msp, mdp)(UploadVideo);