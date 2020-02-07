import React from 'react';
import PreviewVideo from './preview_video';
import ThumbnailUploadBtn from './thumbnail_upload_btn';
import Thumbnail from './thumbnail';
import FormInput from './_form_inputs';



const VideoUploadForm = () => {
  const [isUploading, setIsUploading] = React.useState(false);

  return (
    <form className='upload-form'>
      <div className='upload-form--col-1 flex-vertical--style-3'>
        <div
          className='flex-vertical--style-5'
          style={{ marginTop: '8px' }}>
          <span
            className='tag-14 dark'
            style={{ fontSize: '14px' }}>
            Preview
          </span>
          <PreviewVideo />
        </div>
        <div
          style={{ marginTop: '50px' }}
          className='flex-vertical--style-3'>
          <div className='flex-vertical--style-5'>
            <span
              className='tag-14 dark'
              style={{ fontSize: '14px' }}>
              Video Thumbnail
            </span>
            <Thumbnail />
          </div>
        </div>
        <ThumbnailUploadBtn isUploading={isUploading} />
      </div>
      <FormInput 
        isUploading={isUploading}
        setIsUploading={ () => setIsUploading(true)}
      />
    </form>
  )
}

export default VideoUploadForm;