import React, { useState } from 'react';
import { convertDurationToTime } from '../../util/selectors';
import { VideoPlayerContext } from './video_player';

const DefaultVideoUI = props => {
  const { videoRef, videoState, setVideoState } = React.useContext(VideoPlayerContext);

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

  function getVolumeIcon(){
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
    <div className='vid-ctrl-ui flexh-6'>
      <section
        className='flexh-3'
        style={{ width: 'auto' }}>
        <div> {props.videoStateBtn} </div>
        <div className='vol-ctrl-div flexh-3'>
          <div className='i-wrap'>
            <i 
              onClick={handleMute}
              className='material-icons volume-icon'>
              {getVolumeIcon()}
            </i>
          </div>
          <div className='vol-ctrl-bar-wrap flexh-3'>
            <div className='vol-ctrl-bar'>
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
          <div className='max-w-h'>
            {convertDurationToTime(videoState.currentTime)} / {convertDurationToTime(videoState.duration)}
          </div>
        </div>
      </section>

      <section className='flexh-3'>
        <div 
          // onClick={props.handleMiniScreen} 
          className='i-wrap'>
          <i 
            style={{ margin: '0 5px' }} 
            className="material-icons">
              picture_in_picture_alt
          </i>
          <div className='i-msg-v i-pos-rgt'>Miniplayer</div>
        </div>
        {
          videoState.fullScreen ?
            <div className="i-wrap" 
              onClick={()=>setVideoState({...videoState, fullScreen: false})}>
              <i className="material-icons-enlarged">fullscreen_exit</i>
              <div className='i-msg-v i-pos-rgt'>Exit Full Screen</div>
            </div>
            :
            <div className="i-wrap" 
              onClick={() => setVideoState({ ...videoState, fullScreen: true})}>
              <i className="material-icons-enlarged">fullscreen</i>
              <div className='i-msg-v i-pos-rgt'>Full Screen</div>
            </div>
        }
      </section>
    </div>
  )
}

export default DefaultVideoUI;