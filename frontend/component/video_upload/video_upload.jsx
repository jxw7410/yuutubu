import React from 'react';
import VideoUploadArea from './video_upload_area';
import VideoUploadForm from './video_upload_form';
import { withRouter } from 'react-router-dom';

export const VideoUploadContext = React.createContext();

const VideoUpload = props => {
  // Video itself is large, so state changing is slowing the application
  const [isUploadForm, setIsUploadForm] = React.useState(false);
  const [videoMetaState, setVideoMetaState] = React.useState({
    video: null,
    videoUrl: null,
    thumbnail: null,
    thumbnailUrl: null,
    videoDuration: null,
  });

  React.useEffect(() => {
    props.sideBarTwo();
    props.removeVideoPlayer();
    return () => props.updatePrevPath(props.match.path);
  }, []);

  function handleUpload(type) {
    return e => {
      e.preventDefault();
      setIsUploadForm(true)
      const video = type === 'DROP' ? e.dataTransfer.files[0] : e.currentTarget.files[0];
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setVideoMetaState({
          ...videoMetaState,
          video,
          videoUrl: fileReader.result
        });
      }

      if (video) fileReader.readAsDataURL(video)
    }
  }

  return (
    <div className='upload-form--container flex-vertical--style-3'>
      {
        isUploadForm ?
          <VideoUploadContext.Provider value={{videoMetaState, setVideoMetaState }}>
            <VideoUploadForm />
          </VideoUploadContext.Provider>
          :
          <VideoUploadArea
            handleUpload={handleUpload}
          />
      }

    </div>
  )
}


export default withRouter(VideoUpload);
