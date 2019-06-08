import { connect } from 'react-redux';
import {createVideo} from '../../actions/video/video_action'
import { sideBarTwo} from '../../actions/nav_bar_action'
import UploadVideo from './video_upload';

const msp = state =>{
    return {
        user: state.session,
    }
}

const mdp = dispatch => {
    return {
        createVideo: videoPayload => dispatch(createVideo(videoPayload)),
        sideBarTwo: () => dispatch(sideBarTwo()),
    }
}

export default connect(msp, mdp)(UploadVideo);