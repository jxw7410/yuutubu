import { connect } from 'react-redux';
import {createVideo} from '../../actions/video/video_action'
import { sideBarTwo} from '../../actions/nav_bar_action'
import {removeVideoPlayer} from '../../actions/video_player';
import UploadVideo from './video_upload';
import { requestUpdatePrevPath } from '../../actions/prev_path_action';

const msp = state =>{
    return {
        user: state.session,
    }
}

const mdp = dispatch => {
    return {
        createVideo: videoPayload => dispatch(createVideo(videoPayload)),
        sideBarTwo: () => dispatch(sideBarTwo()),
        removeVideoPlayer: () => dispatch(removeVideoPlayer()),
        updatePrevPath: path => dispatch( requestUpdatePrevPath(path)),
    }
}

export default connect(msp, mdp)(UploadVideo);