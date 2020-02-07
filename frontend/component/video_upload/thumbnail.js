import React from 'react';
import { VideoUploadContext } from './video_upload';

const Thumbnail = () => {
  const { videoMetaState } = React.useContext(VideoUploadContext);
  return (
    <>
      {
        videoMetaState.thumbnailUrl ?
          <div className='upload-form--thumbnail flex-horizontal--style-1'>
            <img src={videoMetaState.thumbnailUrl} />
          </div>
          :
          <div className='load-thumbnail flex-horizontal--style-1'>
            <div className='spinner' />
          </div>
      }
    </>
  )
}

export default React.memo(Thumbnail);