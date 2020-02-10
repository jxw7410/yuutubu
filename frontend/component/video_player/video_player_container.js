import React from 'react';
import { connect } from 'react-redux';
import VideoPlayer from './video_player';

// This causes videoPlayer to get rerendered, if the id changed.
function VideoPlayerRenderer(props){
    return (
        <VideoPlayer 
            key={props.videoPlayer.video.id}
            {...props} 
        />
    )
} 

const msp = state =>({
    videoPlayer: state.ui.videoPlayer,
});

export default connect(msp, null)(VideoPlayerRenderer);
