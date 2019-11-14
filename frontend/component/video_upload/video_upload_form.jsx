import React from 'react';
import PreviewVideo from './preview_video';
import {VideoUploadContext} from './video_upload';
import ThumbnailUploadBtn from './thumbnail_upload_btn';
import FormInput from './form_inputs';


const VideoUploadForm = props => {
  const { videoUploadState } = React.useContext(VideoUploadContext);

  return (
    <form className='vid-sbmt-frm'>
      <div className='vsf-col-1 flexv-3'>
        <div
          className='flexv-5'
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
          className='flexv-3'>
          <div className='flexv-5'>
            <span
              className='tag-14 dark'
              style={{ fontSize: '14px' }}>
              Video Thumbnail
            </span>
            {
              // Turn this into a screen
              videoUploadState.thumbnailUrl ? 
                <div className='tbn-img flexh-1'>
                  <img src={videoUploadState.thumbnailUrl} />
                </div> 
                :
                <div className='ld-tbn flexh-1'> 
                  <div className='spinner' />
                </div>
            }
          </div>
        </div>
        <ThumbnailUploadBtn />
      </div>
      <FormInput />
    </form>
  )
}

export default VideoUploadForm;