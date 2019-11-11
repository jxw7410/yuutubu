import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import VideoPlayerContainer from '../video_player/video_player_ctn';
import { requestDefaultPlayer } from '../../actions/video_player/video_player';
import { Route } from 'react-router-dom';
import VideoRouter from './video_router';
import VideoRecommendedListContainer from './recommended_list';
import { MINI } from '../../util/constants';

/*
This is seemingly redundant. In terms of functionality, it really is,
But the true purpose of this is to hide the actual video player html from users
This way it seems like the videoplayer isn't global.
*/
const FakeVideoRouter = ({ requestDefaultPlayer }) => {
  // Functions like componentDidMount
  useEffect(() => {
    requestDefaultPlayer()
  }, [])

  return <div> Token Path </div>
}


const VideoWrapper = (props) => (
  <React.Fragment>
    {
      props.videoPlayer.type === null ?
        <Route path='/video/:video_id'
          requestDefaultPlayer={props.requestDefaultPlayer}
          render={() => <FakeVideoRouter requestDefaultPlayer={props.requestDefaultPlayer} />} />
        :
        <div className={`max-w-h flexh-1x ${props.videoPlayer.type === MINI ? "vmc-mini" : ""}`}>
          {
            <div className={`${props.videoPlayer.type === MINI ? "max-w-h" : "vid-mn"}`}>
              <div className={`${props.videoPlayer.type === MINI ? "max-w-h" : "vid-mn-lf"}`} >
                <VideoPlayerContainer />
                <Route path='/video/:video_id' component={VideoRouter} />
              </div>
              {props.videoPlayer.type === MINI ? null : <VideoRecommendedListContainer />}
            </div>
          }
        </div>
    }
  </React.Fragment>
)


const msp = state => ({
  videoPlayer: state.ui.videoPlayer,
})


const mdp = dispatch => ({
  requestDefaultPlayer: () => dispatch(requestDefaultPlayer()),
})


export default connect(msp, mdp)(VideoWrapper);