import React from 'react';
import PreviewVideo from './preview_video';
import { VideoUploadContext } from './video_upload';
import ThumbnailUploadBtn from './thumbnail_upload_btn';
import FormInput from './form_inputs';


export const VideoUploadFormContext = React.createContext(null);

const VideoUploadForm = props => {
  const { videoMetaState } = React.useContext(VideoUploadContext);
  const [isUploading, setIsUploading] = React.useState(false);

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
              videoMetaState.thumbnailUrl ?
                <div className='tbn-img flexh-1'>
                  <img src={videoMetaState.thumbnailUrl} />
                </div>
                :
                <div className='ld-tbn flexh-1'>
                  <div className='spinner' />
                </div>
            }
          </div>
        </div>
        <ThumbnailUploadBtn isUploading={isUploading} />
      </div>
      <VideoUploadFormContext.Provider value={{ isUploading, setIsUploading }}>
        <FormInput />
      </VideoUploadFormContext.Provider>
    </form>
  )
}

export default VideoUploadForm;