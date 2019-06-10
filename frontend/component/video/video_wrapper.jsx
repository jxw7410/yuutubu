import React from 'react';
import { connect } from 'react-redux';
import VideoPlayerContainer from '../video_player/video_player_ctn';
import { requestDefaultPlayer } from '../../actions/video_player';
import { Route } from 'react-router-dom';
import VideoRouter from './video_router';


//This is seemingly redundant. In terms of functionality, it really is,
//But the true purpose of this is to hide the actual video player html from users
//This way it seems like the videoplayer is global, but it is only so conditionally depending on the state

class FakeVideoRouter extends React.Component {
    componentDidMount() {   
        console.log('token path');
        this.props.requestDefaultPlayer();
    }

    render() {
        return (
            <div>
                Oh Ho? You're approaching me?
            </div>
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
                        render={    
                            () => (<FakeVideoRouter requestDefaultPlayer={props.requestDefaultPlayer}/>)
                        } 
                        />
                    :
                    <div id={'video-main-ctn' + (props.videoPlayer.type === 'MINI' ? "-mini" : "")}>
                        {
                            <div id={'video-main' + (props.videoPlayer.type === 'MINI' ? "-mini" : "")}>
                                <div id={'video-main-left' + (props.videoPlayer.type === 'MINI' ? "-mini" : "")} >
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