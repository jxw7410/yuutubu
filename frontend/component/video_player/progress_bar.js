import React, { useState, useRef, memo } from 'react';
import Styled, { css } from 'styled-components';
import { withVideoPlayerContext } from './video_player_context';

function ProgressBar(props) {
  const prevState = useRef();
  const [hoverBarLength, setHoverBarLength] = useState({
    current: 0,
    max: 0,
  });

  const hoverProgressBar = e => {
    const { x, width } = e.currentTarget.getBoundingClientRect();
    const newState = { ...hoverBarLength, current: e.clientX - x }
    if (width != hoverBarLength.max) newState.max = width;
    setHoverBarLength(newState)
  }

  const handleSeeking = e => {
    e.preventDefault();
    e.stopPropagation();
    const videoRef = props.videoRef.current;
    const seekerRef = props.seekerRef.current;
    const streamBarRef = props.streamBarRef.current;
    const seekedTime = videoRef.duration * e.currentTarget.value / 100;
    const streamed = (seekedTime / videoRef.duration * 100).toFixed(4);

    videoRef.pause();
    videoRef.currentTime = seekedTime;
    seekerRef.value = streamed;
    streamBarRef.style.width = streamed + '%';
    props.setVideoState({ ...props.videoState, currentTime: seekedTime });
  }

  const leaveProgressBar = e => {
    e.preventDefault();
    setHoverBarLength({ ...hoverBarLength, current: 0 });
  }

  const handleMouseDrag = type => e => {
    if (type === 'DOWN') {
      prevState.current = props.videoState.state;
    } else if (type === 'UP') {
      if (prevState.current === 'PLAY')
        setTimeout(() => props.videoRef.current.play(), 200);
      prevState.current = null;
    }
  }

  return (
    <Wrapper
      onMouseMove={hoverProgressBar}
      onMouseLeave={leaveProgressBar}>
      <StreamedBar ref={props.streamBarRef} />
      <BufferedBar style={{ width: props.videoState.buffered + '%' }} />
      <HoverBar
        style={{
          width: hoverBarLength.current,
          maxWidth: hoverBarLength.max
        }}
      />
      <SeekerBar 
        ref={props.seekerRef}
        type='range'
        onClick={e => e.stopPropagation()}
        onInput={handleSeeking}
        onChange={handleSeeking}
        onMouseDown={handleMouseDrag('DOWN')}
        onMouseUp={handleMouseDrag('UP')}
        step={0.05}
      />
    </Wrapper>
  )
}

const barCSS = css`
  position: absolute;
  height: 100%;
`

const theme = css`
  color: red;
  background: red;
`

const Wrapper = Styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 97.5%;
  height: 3px;
  border-radius: 2px;
  background: rgba(124,124,124, 0.6);
  transition: height 0.15s linear;   

  &:hover{ height: 5px; }
  & input[type='range']{
    -webkit-appearance: none;
    color: red;
    background: transparent;
    outline: none;
  }
`

const StreamedBar = Styled.div`
  ${theme}
  ${barCSS}
  z-index: 2;
`

const BufferedBar = Styled.div`
  ${barCSS}
  background: darkgray;
  z-index: 1
`

const HoverBar = Styled.div`
  ${barCSS}
  z-index: 1;
  background: rgba(220,220,220,0.5);
`

const SeekerBar = Styled.input`
  position: absolute;
  z-index: 3;
  height: 4px;
  width: 100.5%;
  padding: 0;
  margin: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 0.15s linear;

  &:hover{
    opacity: 1;
    height: 100%;
    cursor: pointer;
  }

  &::-webkit-slider-thumb{
    ${theme}
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    height: 14px;
    width: 14px;
    border-radius: 50%;
    margin-left: -1px;
  }

  &::-moz-range-thumb{
    ${theme}
    height:14px;
    width: 14px;
    border-radius: 50%;
    border: none;
  }
`


export default withVideoPlayerContext(memo(ProgressBar));