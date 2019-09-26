import React from 'react';

const VideoUploadArea = ({ handleDrop, handleFile }) => (
  <div className='upload-area flexv-1'
    onDrop={handleDrop}
    onDragEnter={e => e.preventDefault()}
    onDragOver={e => e.preventDefault()}
    onDragLeave={e => e.preventDefault()}>

    <label className='upload-input flexv-9'>
      <input onChange={handleFile} type="file" accept="video/mp4,video/x-m4v,video/*" />
      <i className="fas fa-arrow-up"></i>
      <span>Upload file</span>
      <span>Or Drag and Drop</span>
    </label>
  </div>
)

export default VideoUploadArea;