import React from 'react'
import { connect } from 'react-redux'
import VideoPlayer from './video_player';
import { requestDefaultPlayer, requestMiniPlayer, removeVideoPlayer } from '../../actions/video_player/video_player';



const VideoPlayerWrapper = (props) => (
  <React.Fragment>
    {
      props.videoPlayer.type ?
        <VideoPlayer key={props.videoPlayer.video.id} {...props} /> : null
    }
  </React.Fragment>
)

//This works because the only time a video loads if its clicked meaning
//There should exist only 1 video inside videos
const msp = state => ({
  channels: Object.values(state.entities.channels),
  video: state.ui.videoPlayer.video,
  videoPlayer: state.ui.videoPlayer,
  prevPath: state.ui.prevPath.path,
})

const mdp = dispatch => ({
  requestDefaultPlayer: () => dispatch(requestDefaultPlayer()),
  requestMiniPlayer: () => dispatch(requestMiniPlayer()),
  removeVideoPlayer: () => dispatch(removeVideoPlayer()),
})


export default connect(msp, mdp)(VideoPlayerWrapper);