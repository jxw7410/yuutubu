import React from 'react';
import { VideoUploadFormContext } from './video_upload_form';
import PublishButton from './publish_button';

const FormInput = props => {
  const { isUploading } = React.useContext(VideoUploadFormContext);
  const [ videoText, setVideoText] = React.useState({
    videoTitle: "",
    videoDescription: "",
  });

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
      setVideoText({
        ...videoText,
        [field]: userInput
      });
    }
  }

  return (
    <div className='vsf-col-2'>
      <div className='flexh-1'>
        <PublishButton videoText={videoText} />
      </div>
      <div className='flexv-3'>
        <label className='adfx'>
          <span
            className={[
              'label',
              focusState.title || videoText.videoTitle.length ? 'ipt-fcs' : ""
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
            disabled={isUploading}
            onChange={handleChange('videoTitle')}
            value={videoText.videoTitle}
          />
        </label>

        <label className='adfx'>
          <span
            className={[
              'label',
              focusState.description || videoText.videoDescription.length ? 'ipt-fcs' : ""
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
            disabled={isUploading}
            onChange={handleChange('videoDescription')}
            rows='10' 
            value={videoText.videoDescription}
            />
        </label>
      </div>
    </div>
  )
}

export default FormInput;