import React, { useRef, useEffect } from 'react';
import Styled from 'styled-components';

function Preview(props) {
  const playRef = useRef(false);
  const videoRef = useRef();

  useEffect(() => {
    if (props.playVid) {
      videoRef.current.currentTime = 0;
      playRef.current = true;
      videoRef.current.play()
        .then(() => playRef.current = false )
    } else {
      if (playRef.current) setTimeout(() => videoRef.current.pause(), 10)
      else videoRef.current.pause();
    }
  }, [props.playVid]);

  const handleTimeUpdate = e => {
    e.preventDefault();
    if (videoRef.current.currentTime > 5) {
      videoRef.current.pause();
      props.stopVideoRendering();
    }
  }

  return (
    <Video
      muted
      key={props.videoUrl}
      ref={videoRef}
      onTimeUpdate={handleTimeUpdate}
      onLoadedData={props.videoUrl ? props.setDataLoaded : null}
    >
      <source src={props.videoUrl} type='video/mp4' />
    </Video>
  )
}


const Video = Styled.video`
  width: 100%;
  height: 100%;
  opacity: 1;
  position: absolute;
  z-index: 1;
  object-fit: contain;
`

export default Preview;