import React from 'react';
import {connect} from 'react-redux';
import VideoPlayerContainer from '../video_player/video_player_ctn';
import { Route } from 'react-router-dom';
import VideoRouter from './video_router';
const VideoWrapper = (props) => {
    return(
        
        <div id={'video-main-ctn' + (props.videoPlayer.type === 'MINI' ? "-mini" : "")}>
            {
                <div id={'video-main' + (props.videoPlayer.type === 'MINI' ? "-mini" : "")}>
                    <div id={'video-main-left' + (props.videoPlayer.type === 'MINI' ? "-mini" : "") } >
                        <VideoPlayerContainer />
                        <Route path='/video/:video_id' component={VideoRouter} />
                    </div>
                    {
                        props.videoPlayer.type === 'MINI' ? null
                        : <div id='video-main-right'></div> 
                    }
                </div>
            }
        </div>
    )
}


const msp = state => {
    return{
        videoPlayer: state.ui.videoPlayer,
    }
}

export default connect(msp)(VideoWrapper);