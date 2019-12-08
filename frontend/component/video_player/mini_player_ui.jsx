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
      className='mini-player-ui max-width-height flex-vertical--style-9'>
      <div>
        <i 
          style={{ position: 'relative', marginLeft: '12px', marginTop: '12px' }}
          onClick={goBackToVideoPage}
          className="material-icons">
          check_box_outline_blank
          <div
            style={{top: '35px'}}
            className='icon-message'>
              Expand
            </div>
        </i>
        <i
          style={{ marginRight: '12px',  marginTop: '12px'}}
          onClick={closeVideoPlayer}
          className="material-icons">
          close
        </i>
      </div>
      <div className='flex-horizontal--style-1'>
        <div className='mini-player--play-btn flex-horizontal--style-1'>
          {props.videoStateBtn}
        </div>
      </div>
      <div 
        style={{ marginLeft: '12px', marginBottom: '12px' }}
        className='vid-time'>
        <div>{convertDurationToTime(videoState.currentTime)} / {convertDurationToTime(videoState.duration)}</div>
      </div>
    </div>
  )
}

const mdp = dispatch => ({
  removeVideoPlayer: () => dispatch(removeVideoPlayer()),
})

export default withRouter(connect(null, mdp)(MiniPlayerUI));