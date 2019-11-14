import React from 'react';
import { VideoUploadContext } from './video_upload';

const VideoUploadArea = () => {
  const { 
    setIsUploadForm, 
    setVideoUploadState,
    videoUploadState,
   } = React.useContext(VideoUploadContext);

  function handleUpload(type) {
    return e => {
      e.preventDefault();
      setIsUploadForm(true);
      const video = type === 'DROP' ? e.dataTransfer.files[0] : e.currentTarget.files[0];
      const fileReader = new FileReader();   
      fileReader.onloadend = () => {
        setVideoUploadState({
          ...videoUploadState, 
          video, 
          videoUrl: fileReader.result
        });
      }
      if (video) fileReader.readAsDataURL(video)
    }
  }

  return (
    <div className='upload-area flexv-1'
      onDrop={handleUpload('DROP')}
      onDragEnter={e => e.preventDefault()}
      onDragOver={e => e.preventDefault()}
      onDragLeave={e => e.preventDefault()}>

      <label className='upload-input flexv-9'>
        <input 
          onChange={handleUpload('INPUT')}
          type="file" 
          accept="video/mp4,video/x-m4v,video/*" />
        <i className="fas fa-arrow-up"></i>
        <span>Upload file</span>
        <span>Or Drag and Drop</span>
      </label>
    </div>
  )
}

export default VideoUploadArea;