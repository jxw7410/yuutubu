import React from 'react';
import PublishButton from './publish_button';

const FormInput = props => {
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
    <div className='upload-form--inputs--container'>
      <div className='flex-horizontal--style-1'>
        <PublishButton 
          isUploading={props.isUploading}
          setIsUploading={props.setIsUploading}
          videoText={videoText} 
        />
      </div>
      <div className='flex-vertical--style-3'>
        <label className='upload-form--inputs--label'>
          <span
            className={[
              'label',
              focusState.title || videoText.videoTitle.length ? 'upload-form--input-focus' : ""
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
            disabled={props.isUploading}
            onChange={handleChange('videoTitle')}
            value={videoText.videoTitle}
          />
        </label>

        <label className='upload-form--inputs--label'>
          <span
            className={[
              'label',
              focusState.description || videoText.videoDescription.length ? 'upload-form--input-focus' : ""
            ].join(" ")}>
            Description
          </span>
          <textarea 
            style={{ 
              fontSize: '16px',
              height: '100%', 
              width: 'calc(100% - 11px)' 
            }}
            className='upload-form--description input-style-1'
            onFocus={toggleFocus('description')}
            onBlur={toggleFocus('description')}
            disabled={props.isUploading}
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