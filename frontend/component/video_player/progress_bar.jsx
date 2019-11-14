import React, { useState } from 'react';
import { VideoPlayerContext } from './video_player';


const ProgressBar = props => {
  const prevState = React.useRef(null);
  const { videoRef, videoState, setVideoState } = React.useContext(VideoPlayerContext);
  const [state, setState] = useState({
    hoverBarLength: 0,
    maxHoverBarLength: 0,
  });

  function handleSeeking(e) {
    e.preventDefault();
    e.stopPropagation();
    const seekedTime = videoRef.duration * (e.currentTarget.value / 100);
    const streamed = (seekedTime / videoRef.duration * 100).toFixed(4);
    videoRef.pause();
    videoRef.currentTime = seekedTime;
    props.seekerRef.current.value = streamed;
    props.streamBarRef.current.style.width = streamed + '%';
    setVideoState({ ...videoState, currentTime: seekedTime });
  }

  function hoverProgressBar(e) {
    let { x, width } = e.currentTarget.getBoundingClientRect();

    if (width != state.maxHoverBarLength)
      setState({
        ...state,
        hoverBarLength: e.clientX - x,
        maxHoverBarLength: width
      });
    else
      setState({ ...state, hoverBarLength: e.clientX - x })
  }

  function leaveProgressBar(e) {
    e.preventDefault();
    setState({ ...state, hoverBarLength: 0 })
  }

  // Hacky solution to allow pause seeking, follow by play.
  function handleMouseHold(type) {
    return e => {
      if (type === 'DOWN'){
        prevState.current = videoState.state;
      } else if (type === 'UP') {
        if (prevState.current === 'PLAY')
          setTimeout( () => videoRef.play(), 200);
        prevState.current = null;
      }
    }
  }

  return (
    <div className='progress-bar flexh-3'
      onMouseMove={hoverProgressBar}
      onMouseLeave={leaveProgressBar}>
      <div
        ref={props.streamBarRef}
        className='user-stream' />
      <div className='buffer-stream'
        style={{ width: videoState.buffered + "%" }} />
      <div className='hover-bar'
        style={{
          width: state.hoverBarLength,
          maxWidth: state.maxHoverBarLength
        }} />
      <input
        ref={props.seekerRef}
        className='seeker-bar'
        type='range'
        onClick={e => e.stopPropagation()}
        onInput={handleSeeking}
        onChange={handleSeeking}
        onMouseDown={handleMouseHold('DOWN')}
        onMouseUp={handleMouseHold('UP')}
        step={0.05}
      />
    </div>

  )
}


export default ProgressBar