import React from 'react';
import { connect } from 'react-redux';
import VideoPlayerContainer from '../video_player/video_player_ctn';
import { requestDefaultPlayer } from '../../actions/video_player';
import { Route } from 'react-router-dom';
import VideoRouter from './video_router';
import VideoRecommendedListContainer from './video_sub_components/video_recommended_list';

/*
This is seemingly redundant. In terms of functionality, it really is,
But the true purpose of this is to hide the actual video player html from users
This way it seems like the videoplayer isn't global.
*/

class FakeVideoRouter extends React.Component {
    componentDidMount() {   
        this.props.requestDefaultPlayer();
    }

    render() {
        return (
            <div> Token Path </div>
        )
    }
}




const VideoWrapper = (props) => {
    return (
        <>
            {
                props.videoPlayer.type === null ?
                    <Route path='/video/:video_id' 
                        requestDefaultPlayer={props.requestDefaultPlayer}
                        render={ () => (<FakeVideoRouter requestDefaultPlayer={props.requestDefaultPlayer}/>)} 
                        />
                    :
                    <div id={'video-main-ctn' + (props.videoPlayer.type === 'MINI' ? "-mini" : "")}>
                        {
                            <div id={'video-main' + (props.videoPlayer.type === 'MINI' ? "-mini" : "")}>
                                <div id={'video-main-left' + (props.videoPlayer.type === 'MINI' ? "-mini" : "")} >
                                    <VideoPlayerContainer />
                                    <Route path='/video/:video_id' component={VideoRouter} />
                                </div>
                                { props.videoPlayer.type === 'MINI' ? null : <VideoRecommendedListContainer />}
                            </div>
                        }
                    </div>
            }
        </>
    )
}


const msp = state => {
    return {
        videoPlayer: state.ui.videoPlayer,
    }
}



const mdp = dispatch => {
    return {
        requestDefaultPlayer: () => dispatch(requestDefaultPlayer()),
    }
}


export default connect(msp, mdp)(VideoWrapper);