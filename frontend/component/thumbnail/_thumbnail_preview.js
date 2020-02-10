import React, { useEffect, useState, useRef } from 'react';

const ThumbnailPreviewVideo = props => {
  const videoRef = useRef();
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (play) {
      videoRef.current.play()
        .then(() => setPlay(false), () => setPlay(false))
    }
  }, [play])

  useEffect(() => {
    if (props.playVid) {
      videoRef.current.currentTime = 0;
      setPlay(true);
    } else {
      if (play) setTimeout(() => videoRef.current.pause(), 10);
      else videoRef.current.pause();
    }
  }, [props.playVid])

  function handleTimeUpdate(e) {
    e.preventDefault();
    if (videoRef.current.currentTime > 5) {
      videoRef.current.pause();
      props.stopRenderVideo();
    }
  }

  /*
    Key is required because React won't rerender if it doesn't know
    the video's source has changed. It only knows if there is a key change.
  */
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