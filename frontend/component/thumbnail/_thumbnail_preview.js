import React, { useEffect, useRef } from 'react';

const ThumbnailPreviewVideo = props => {
  const videoRef = useRef();
  const playRef = useRef(false);

  useEffect(() => {
    if (props.playVid) {
      videoRef.current.currentTime = 0;
      playRef.current = true;
      videoRef.current.play()
        .then( unsetPlayRef, unsetPlayRef );
    } else {
      if (playRef.current) setTimeout(() => videoRef.current.pause(), 10);
      else videoRef.current.pause();
    }
  }, [props.playVid])

  const unsetPlayRef = () => playRef.current = false;
  const handleTimeUpdate = e => {
    e.preventDefault();
    if (videoRef.current.currentTime > 5) {
      videoRef.current.pause();
      props.stopRenderVideo();
    }
  }

  return (
    <video
      key={props.videoUrl}
      ref={videoRef}
      muted
      className='thumbnail-preview-active'
      onLoadedData={props.videoUrl ? props.setDataloaded : null}
      onTimeUpdate={handleTimeUpdate}>
      <source src={props.videoUrl} type="video/mp4" />
    </video>
  )
}

export default ThumbnailPreviewVideo;