import React from 'react';
import {VideoUploadContext} from './video_upload';

const ThumbnailUploadBtn = props => {
  const { videoMetaState, setVideoMetaState } = React.useContext(VideoUploadContext)
  
  function changeThumbnail(e){
    e.preventDefault();
    const thumbnail = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setVideoMetaState({ 
        ...videoMetaState,
        thumbnail, 
        thumbnailUrl: fileReader.result 
      });
    }
    if (thumbnail) fileReader.readAsDataURL(thumbnail);
  }

  const isEnabled = (
    videoMetaState.videoUrl && 
    videoMetaState.thumbnailUrl && 
    !props.isUploading
  );
  return (
    <div className='upld-tbn-ctn flexv-4'>
      <label
        className={[
          'lbl-upld-btn',
          'flexh-1',
          isEnabled ? 'enabled' : 'disabled'
        ].join(" ")}>
        <input 
          onChange={changeThumbnail}
          type='file'
          disabled={!isEnabled}
          accept="image/*"
        />
        Upload Own Thumbnail
      </label>
    </div>
  )
}

export default ThumbnailUploadBtn;