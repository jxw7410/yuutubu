import React from 'react';
import { connect } from 'react-redux';
import VideoPlayerContainer from '../video_player/video_player_ctn';
import { requestDefaultPlayer } from '../../actions/video_player/video_player';
import { Route } from 'react-router-dom';
import Video from './video_ctn';
import Recommendation from './recommendation';
import { MINI } from '../../util/constants';

const VideoWrapper = (props) => {
  React.useEffect(() => {
    if (!props.videoPlayer.type)
      requestDefaultPlayer()
  }, [])

  return (
    <div
      style={ props.videoPlayer.type ? null : {display: 'none'}} 
      className={[
      'max-w-h',
      'flexh-1x',
      props.videoPlayer.type === MINI ? "vmc-mini" : ""
    ].join(" ")}>
      {
        <div className={`${props.videoPlayer.type === MINI ? "max-w-h" : "vid-mn"}`}>
          <div className={`${props.videoPlayer.type === MINI ? "max-w-h" : "vid-mn-lf"}`} >
            <VideoPlayerContainer />
            <Route path='/video/:video_id' component={Video} />
          </div>
          {/* { 
            props.videoPlayer.type === MINI ? 
              null : <Recommendation />
          } */}
        </div>
      }
    </div>
  )
}


const msp = state => ({
  videoPlayer: state.ui.videoPlayer,
})


const mdp = dispatch => ({
  requestDefaultPlayer: () => dispatch(requestDefaultPlayer()),
})


export default connect(msp, mdp)(VideoWrapper);