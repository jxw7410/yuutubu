import React from 'react';

const VideoUploadArea = ({handleUpload}) => {
  return (
    <div className='upload-area flex-vertical--style-1'
      onDrop={handleUpload('DROP')}
      onDragEnter={e => e.preventDefault()}
      onDragOver={e => e.preventDefault()}
      onDragLeave={e => e.preventDefault()}>

      <label className='upload-area--input flex-vertical--style-9'>
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

export default React.memo(VideoUploadArea);