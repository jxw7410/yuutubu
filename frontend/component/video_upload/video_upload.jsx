import React from 'react';
import VideoUploadArea from './video_upload_area';
import VideoUploadForm from './video_upload_form';
import { withRouter } from 'react-router-dom';

export const VideoUploadContext = React.createContext();

const VideoUpload = props => {
  const [isUploadForm, setIsUploadForm] = React.useState(false);
  const [videoUploadState, setVideoUploadState] = React.useState({
    video: null,
    videoUrl: null,
    thumbnail: null,
    thumbnailUrl: null,
    videoDuration: null,
    videoTitle: "",
    videoDescription: "",
    isUploading: false
  });

  React.useEffect(() => {
    props.sideBarTwo();
    props.removeVideoPlayer();
    return () => props.updatePrevPath(props.match.path);
  }, []);

  return (
    <div className='upld-bd flexv-3'>
      <VideoUploadContext.Provider 
        value={{
          setIsUploadForm,
          videoUploadState,
          setVideoUploadState
        }}
        >
        {
          isUploadForm ? 
            <VideoUploadForm /> : <VideoUploadArea />
        }
      </VideoUploadContext.Provider>
    </div>
  )
}


export default withRouter(VideoUpload);
