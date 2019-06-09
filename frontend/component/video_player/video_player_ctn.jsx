import React from 'react'
import { connect } from 'react-redux'
import VideoPlayer from './video_player';
import { requestDefaultPlayer, requestMiniPlayer} from '../../actions/video_player';
import { withRouter } from 'react-router-dom';

//This works because the only time a video loads if its clicked meaning
//There should exist only 1 video inside videos

const VideoPlayerWrapper = (props) => {
    
    return (
        <>
        {   
            props.videoPlayer.type ? 
                <VideoPlayer key={ props.videoPlayer.video.id } {...props} /> : null
        }
        </>
    )
}

const msp = state => {
    return {
        video: state.ui.videoPlayer.video,
        videoPlayer: state.ui.videoPlayer
    }
}

const mdp = dispatch => {
    return {
        requestDefaultPlayer: () => dispatch(requestDefaultPlayer()),
        requestMiniPlayer: () => dispatch(requestMiniPlayer())
    }
}

export default withRouter(connect(msp, mdp)(VideoPlayerWrapper));