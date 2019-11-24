import React from 'react';
import { VideoUploadContext } from './video_upload';

const PreviewVideo = props => {
  const videoRef = React.useRef();
  const canvasRef = React.useRef();

  const [videoState, setVideoState] = React.useState('PAUSE');
  const { videoMetaState, setVideoMetaState } = React.useContext(VideoUploadContext);


  function handleVideoState(state) {
    return e => {
      setVideoState(state);
    }
  }

  function handleVideoUI(e) {
    e.stopPropagation();
    if (videoState === 'PAUSE') {
      videoRef.current.play();
    } else if (videoState === 'PLAY') {
      videoRef.current.pause();
    } else if (videoState === 'END') {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }

  function setThumbnail(thumbnail, thumbnailUrl, duration) {
    setVideoMetaState({
      ...videoMetaState,
      thumbnail,
      thumbnailUrl,
      duration
    });
  }

  function captureImage(e) {
    if (videoMetaState.thumbnailUrl) return;
    setTimeout( () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')
        .drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      canvas.toBlob(blob => {
        const fileReader = new FileReader();
        fileReader.onloadend = () =>
          setThumbnail(blob, fileReader.result, video.duration)
        fileReader.readAsDataURL(blob);
      }); 
    }, 500);
  }

  function renderPreviewUI() {
    let iconType;
    switch (videoState) {
      case 'PAUSE':
        iconType = 'fa-play-circle';
        break
      case 'PLAY':
        iconType = 'fa-pause-circle';
        break;
      case 'END':
        icontype = 'fa-undo-alt';
        break;
    }
    return (
      <div
        className='upload-form--preview-ui upload-form-preview-ui--play flex-horizontal--style-1'
        onClick={handleVideoUI}>
        <i className={`fas ${iconType}`} />
      </div>
    )
  }

  return (
    <>
      <div className='upload-form--preview-video--container'>
        <video
          muted
          ref={videoRef}
          key={videoMetaState.videoUrl}
          onPlay={handleVideoState('PLAY')}
          onPause={handleVideoState('PAUSE')}
          onEnded={handleVideoState('END')}
          onCanPlay={captureImage}>
          <source src={videoMetaState.videoUrl} type="video/mp4" />
        </video>
        {renderPreviewUI()}
      </div>
      <span style={{ fontSize: '14px' }}>
        <span className='tag-14 dark' >Video Status</span>
        {
          videoMetaState.videoUrl && videoMetaState.thumbnailUrl ?
            <span style={{ color: 'green' }}> Ready</span>
            :
            <span style={{ color: 'red' }}> Pending</span>
        }
      </span>
      {
        videoMetaState.thumbnailUrl ? null :
          <canvas ref={canvasRef} className='capture-canvas' />
      }
    </>
  )
}

export default PreviewVideo;