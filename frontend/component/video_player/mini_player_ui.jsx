import React from 'react';
import { connect } from 'react-redux';
import { VideoPlayerContext } from './video_player';
import { withRouter } from 'react-router-dom';
import { removeVideoPlayer } from '../../actions/video_player/video_player';
import { convertDurationToTime } from '../../util/selectors';

const MiniPlayerUI = props => {
  const { videoState, currentUrl } = React.useContext(VideoPlayerContext);

  function closeVideoPlayer(e) {
    e.stopPropagation();
    props.removeVideoPlayer();
  }

  function goBackToVideoPage(e) {
    e.stopPropagation();
    props.history.push(currentUrl)
  }

  return (
    <div
      className='mini-ctrl-ui max-w-h flexv-9'
      onClick={goBackToVideoPage}>
      <div>
        <i
          onClick={closeVideoPlayer}
          className="material-icons">
          close</i>
      </div>
      <div className='flexh-1'>
        <div className='mini-scn-ply-btn flexh-1'>
          {props.videoStateBtn}
        </div>
      </div>
      <div className='vid-time'>
        <div>{convertDurationToTime(videoState.currentTime)} / {convertDurationToTime(videoState.duration)}</div>
      </div>
    </div>
  )
}

const mdp = dispatch => ({
  removeVideoPlayer: () => dispatch(removeVideoPlayer()),
})

export default withRouter(connect(null, mdp)(MiniPlayerUI));