import React from 'react';

const ThumbnailPreviewVideo = props => {
  const videoRef = React.useRef(null);


  React.useEffect(() => {
    if (props.playVid){
      videoRef.current.currentTime = 0;
      // to block the pause() interrupting play() error msg
      try { videoRef.current.play(); } catch {} 
    } else {
      videoRef.current.pause();
    }
  }, [props.playVid])

  async function handleTimeUpdate(e) {
    e.preventDefault();
    if (videoRef.current.currentTime > 5){
        await videoRef.current.pause();
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