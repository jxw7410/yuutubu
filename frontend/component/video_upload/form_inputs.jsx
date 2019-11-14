import React from 'react';
import { VideoUploadContext } from './video_upload';
import PublishButton from './publish_button';

const FormInput = props => {
  const { videoUploadState, setVideoUploadState } = React.useContext(VideoUploadContext);
  const [focusState, setFocusState] = React.useState({
    title: false,
    description: false,
  })

  function toggleFocus(field){
    return e => {
      e.preventDefault();
      const bool = !focusState[field];
      setFocusState({...focusState, [field]: bool})
    }
  }

  function handleChange(field){
    return e => {
      e.preventDefault();
      const userInput = e.currentTarget.value;
      setVideoUploadState({
        ...videoUploadState,
        [field]: userInput
      });
    }
  }

  return (
    <div className='vsf-col-2'>
      <div className='flexh-1'>
        <PublishButton />
      </div>
      <div className='flexv-3'>
        <label className='adfx'>
          <span
            className={[
              'label',
              focusState.title || videoUploadState.videoTitle.length ? 'ipt-fcs' : ""
            ].join(" ")}>
            Title
          </span>
          <input
            type='text'
            style={{
              fontSize: '16px',
              height: '20px',
              width: 'calc(100% - 11px)'
            }}
            onFocus={toggleFocus('title')}
            onBlur={toggleFocus('title')}
            disabled={videoUploadState.isUploading}
            onChange={handleChange('videoTitle')}
            value={videoUploadState.videoTitle}
          />
        </label>

        <label className='adfx'>
          <span
            className={[
              'label',
              focusState.description || videoUploadState.videoDescription.length ? 'ipt-fcs' : ""
            ].join(" ")}>
            Description
          </span>
          <textarea 
            style={{ 
              fontSize: '16px',
              height: '100%', 
              width: 'calc(100% - 11px)' 
            }}
            className='vid-upld-desc input-style-1'
            onFocus={toggleFocus('description')}
            onBlur={toggleFocus('description')}
            disabled={videoUploadState.isUploading}
            onChange={handleChange('videoDescription')}
            rows='10' />
        </label>
      </div>
    </div>
  )
}

export default FormInput;