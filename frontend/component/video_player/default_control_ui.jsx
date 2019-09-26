import React, { useState } from 'react';
import { convertDurationToTime } from '../../util/selectors';

const DefaultControlUI = props => {

  const [state, setState] = useState({
    volume: localStorage.getItem('volume') || 1,
    volumeTrackLength: Math.floor(50 * (localStorage.getItem('volume') || 1)),
  })

  const updateState = newState => setState(Object.assign({}, state, newState));


  const handleMute = e => {
    e.stopPropagation();
    if (props.videoElement.muted) {
      const volume = localStorage.getItem('volume') || 1;
      props.videoElement.muted = false;
      updateState({ volume, volumeTrackLength: Math.floor(50 * volume) })
    } else if (parseFloat(state.volumeValue) === 0) {
      props.videoElement.volume = 0.5;
      localStorage.setItem('volume', 0.5);
      updateState({ volume: 0.5, volumeTrackLength: 25 })
    } else {
      localStorage.setItem('volume', props.videoElement.volume)
      props.videoElement.muted = true;
      updateState({ volume: 0, volumeTrackLength: 0 })
    }
  }

  const handleVolumeChange = e => {
    e.preventDefault();
    e.stopPropagation();

    if (props.videoElement.muted)
      props.videoElement.muted = false

    props.videoElement.volume = e.target.value;
    localStorage.setItem('volume', props.videoElement.volume);
    updateState({ volume: e.target.value, volumeTrackLength: 50 * e.target.value })
  }

  // HTML Stuff
  const getVolBtn = () => {
    let volumeType;
    if (parseFloat(state.volume) === 0)
      volumeType = 'volume_off';
    else if (state.volume > 0.5)
      volumeType = 'volume_up';
    else
      volumeType = 'volume_down';

    return (
      <div className='i-wrap'>
        <i onClick={handleMute} className="material-icons volume-icon">{volumeType}</i>
        <div className='i-msg-v i-pos-lft'>{volumeType === 'volume_off' ? 'Unmute' : 'Mute'}</div>
      </div>
    )
  }

  const getVolCtrl = () => (
    <React.Fragment>
      <div className='vol-ctrl-track' style={{ width: `${state.volumeTrackLength}px` }} />
      <input className='vol-ctrl' type="range" min="0" max="1" step="0.05" value={state.volume}
        onMouseDown={e => e.stopPropagation()}
        onClick={e => e.stopPropagation()}
        onChange={handleVolumeChange} />
    </React.Fragment>
  )

  const getFullScreen = () => (
    props.isFullScreen ?
      <div className="i-wrap" onClick={props.normalScreen}>
        <i className="material-icons-enlarged">fullscreen_exit</i>
        <div className='i-msg-v i-pos-rgt'>Exit Full Screen</div>
      </div>
      :
      <div className="i-wrap" onClick={props.maximizeScreen}>
        <i className="material-icons-enlarged">fullscreen</i>
        <div className='i-msg-v i-pos-rgt'>Full Screen</div>
      </div>
  )


  return (
    <div className='vid-ctrl-ui flexh-6'>
      <section className='flexh-3' style={{ width: 'auto' }}>
        <div> {props.playButton} </div>
        <div className='vol-ctrl-div flexh-3'>
          {getVolBtn()}
          <div className='vol-ctrl-bar-wrap flexh-3'>
            <div className='vol-ctrl-bar'>{getVolCtrl()}</div>
          </div>
        </div>

        <div className='vid-time'>
          <div className='max-w-h'>{convertDurationToTime(props.currentTime)} / {convertDurationToTime(props.duration)}</div>
        </div>
      </section>

      <section className='flexh-3'>
        <div onClick={props.handleMiniScreen} className='i-wrap'>
          <i style={{ margin: '0 5px' }} className="material-icons">picture_in_picture_alt</i>
          <div className='i-msg-v i-pos-rgt'>Miniplayer</div>
        </div>
        {getFullScreen()}
      </section>
    </div>
  )
}

export default DefaultControlUI;