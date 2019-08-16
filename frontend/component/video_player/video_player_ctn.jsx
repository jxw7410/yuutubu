import React from 'react'
import { connect } from 'react-redux'
import VideoPlayer from './video_player';
import { requestDefaultPlayer, requestMiniPlayer, removeVideoPlayer} from '../../actions/video_player';
import { withRouter } from 'react-router-dom';



const VideoPlayerWrapper = (props) => {
    
    return (
        <React.Fragment>
        {   
            props.videoPlayer.type ? 
                <VideoPlayer key={ props.videoPlayer.video.id } {...props} /> : null
        }
        </React.Fragment>
    )
}

//This works because the only time a video loads if its clicked meaning
//There should exist only 1 video inside videos
const msp = state => {
    return {
        channels: Object.values(state.entities.channels),
        video: state.ui.videoPlayer.video,
        videoPlayer: state.ui.videoPlayer,
        prevPath: state.ui.prevPath.path,
    }
}

const mdp = dispatch => {
    return {
        requestDefaultPlayer: () => dispatch(requestDefaultPlayer()),
        requestMiniPlayer: () => dispatch(requestMiniPlayer()),
        removeVideoPlayer: () => dispatch( removeVideoPlayer()),
    }
}

export default withRouter(connect(msp, mdp)(VideoPlayerWrapper));