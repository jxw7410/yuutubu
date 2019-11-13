import React from 'react';
import { connect } from 'react-redux';
import VideoPlayer from './video_player';


const VideoPlayerWrapper = (props) => (
  <>
    {
      props.videoPlayer.type ?
        <VideoPlayer key={props.videoPlayer.video.id} {...props} /> : null
    }
  </>
)

//This works because the only time a video loads if its clicked meaning
//There should exist only 1 video inside videos
const msp = state => ({
  channels: Object.values(state.entities.channels),
  video: state.ui.videoPlayer.video,
  videoPlayer: state.ui.videoPlayer,
})


export default connect(msp, null)(VideoPlayerWrapper);