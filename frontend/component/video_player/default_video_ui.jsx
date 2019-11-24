import React, { useState } from 'react';
import { convertDurationToTime } from '../../util/selectors';
import { VideoPlayerContext } from './video_player';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { requestMiniPlayer } from '../../actions/video_player/video_player';

const DefaultVideoUI = props => {
  const { videoRef,  videoCtnRef, videoState, isFullscreen, setCurrentUrl } = React.useContext(VideoPlayerContext);

  const [state, setState] = useState({
    volume: localStorage.getItem('volume') || 1,
    volumeTrackLength: Math.floor(50 * (localStorage.getItem('volume') || 1)),
  });


  function handleMute(e) {
    e.stopPropagation();
    if (videoRef.muted) {
      const volume = localStorage.getItem('volume') || 1;
      videoRef.muted = false;
      setState({ ...state, volume, volumeTrackLength: Math.floor(50 * volume) });
    } else if (state.volume == 0) {
      videoRef.volume = 0.5;
      localStorage.setItem('volume', 0.5);
      setState({ ...state, volume: 0.5, volumeTrackLength: 25 });
    } else {
      localStorage.setItem('volume', videoRef.volume);
      videoRef.muted = true;
      setState({ ...state, volume: 0, volumeTrackLength: 0 });
    }
  }

  function handleVolumeChange(e) {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.muted) videoRef.muted = false;

    const volume = e.currentTarget.value;
    videoRef.volume = volume;
    localStorage.setItem('volume', volume);
    setState({ ...state, volume, volumeTrackLength: 50 * volume });
  }

  function minMaxScreen(bool) {
    return e => {
      e.stopPropagation();
      if (bool) videoCtnRef.requestFullscreen();
      else document.exitFullscreen();
    }
  }

  async function requestMiniPlayer(e) {
    e.stopPropagation();
    if (isFullscreen) await document.exitFullscreen();
    props.requestMiniPlayer();
    setCurrentUrl(`/video/${props.video.id}`);
    if (!props.prevPath || props.prevPath === '/video/:video_id')
      props.history.push('/');
    else
      props.history.goBack();
  }


  function getVolumeIcon() {
    let volumeType;
    if (state.volume == 0)
      volumeType = 'volume_off';
    else if (state.volume > 0.5)
      volumeType = 'volume_up';
    else
      volumeType = 'volume_down';
    return volumeType;
  }

  return (
    <div className='video-player-main-ui flex-horizontal-style-6'>
      <section
        className='flex-horizontal--style-3'
        style={{ width: 'auto' }}>
        <div> {props.videoStateBtn} </div>
        <div className='volume-ui--container flex-horizontal--style-3'>
          <div className='icon-wrap'>
            <i
              onClick={handleMute}
              className='material-icons volume-icon'>
              {getVolumeIcon()}
            </i>
          </div>
          <div className='volume-bar--wrapper flex-horizontal--style-3'>
            <div className='volume-bar'>
              <div
                className='vol-ctrl-track'
                style={{ width: `${state.volumeTrackLength}px` }} />
              <input
                className='vol-ctrl'
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={state.volume}
                onMouseDown={e => e.stopPropagation()}
                onClick={e => e.stopPropagation()}
                onChange={handleVolumeChange} />
            </div>
          </div>
        </div>

        <div className='vid-time'>
          <div className='max-width-height'>
            {convertDurationToTime(videoState.currentTime)} / {convertDurationToTime(videoState.duration)}
          </div>
        </div>
      </section>

      <section className='flex-horizontal--style-3'>
        <div
          onClick={requestMiniPlayer}
          className='icon-wrap'>
          <i
            style={{ margin: '0 5px' }}
            className="material-icons">
            picture_in_picture_alt
          </i>
          <div className='icon-message-v icon-position-right'>Miniplayer</div>
        </div>
        {
          isFullscreen ?
            <div className="icon-wrap"
              onClick={minMaxScreen(false)}>
              <i className="material-icons-enlarged">fullscreen_exit</i>
              <div className='icon-message-v icon-position-right'>Exit Full Screen</div>
            </div>
            :
            <div className="icon-wrap"
              onClick={minMaxScreen(true)}>
              <i className="material-icons-enlarged">fullscreen</i>
              <div className='icon-message-v icon-position-right'>Full Screen</div>
            </div>
        }
      </section>
    </div>
  )
}


const msp = state => ({
  video: state.ui.videoPlayer.video,
  prevPath: state.ui.prevPath.path,
})

const mdp = dispatch => ({
  requestMiniPlayer: () => dispatch(requestMiniPlayer()),
})

export default withRouter(connect(msp, mdp)(DefaultVideoUI));