import React, { useRef, useState } from 'react';
import Styled from 'styled-components';
import { InfoWrapper, MediaBox, SpinnerContainer} from './styles';
import { withUploadPageContext } from './upload_page_context';
import SelectedVideoUI from './selected_video_ui';

function SelectedVideo({ videoAttr, setVideoAttr }) {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [videoState, setVideoState] = useState('PAUSE');

  const changeVideoState = state => e => {
    e.preventDefault();
    setVideoState(state);
  }

  const extractThumbnail = e => {
    e.preventDefault();
    if (videoAttr.thumbnail) return;
    setTimeout(() => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      canvas.getContext('2d')
        .drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      canvas.toBlob(blob => {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          setVideoAttr({
            ...videoAttr,
            thumbnail: blob,
            thumbnailUrl: fileReader.result,
            duration: video.duration,
          })
        };
        fileReader.readAsDataURL(blob);
      })
    }, 500)
  }

  const handleVideoUI = e => {
    e.stopPropagation();
    const video = videoRef.current;

    switch(videoState){
      case 'PAUSE':
        video.play();
        break;
      case 'PLAY':
        video.pause();
        break;
      case 'END':
        video.currentTime = 0;
        video.current.play();
        break;
      default: break;
    }
  }

  return (
    <div>
      <InfoWrapper>
        <h1>Video</h1>
        <span>Video to be uploaded.</span>
      </InfoWrapper>
      <VideoWrapper>
        {
          videoAttr.videoUrl ?
            <>
              <video
                muted
                ref={videoRef}
                onPlay={changeVideoState('PLAY')}
                onPause={changeVideoState('PAUSE')}
                onEnded={changeVideoState('END')}
                onCanPlay={extractThumbnail}
              >
                <source
                  src={videoAttr.videoUrl}
                  type={videoAttr.video ? videoAttr.video.type : '*' }
                />
              </video>
              <SelectedVideoUI 
                videoState={videoState}
                handleVideoUI={handleVideoUI}
              />
            </>
            :
            <SpinnerContainer>
              <div className='spinner' />
            </SpinnerContainer>
        }

        <VideoLabel>
          <div>Filename</div>
          <div>{videoAttr.video ? videoAttr.video.name : 'Processing...'} </div>
        </VideoLabel>
      </VideoWrapper>
      {
        videoAttr.thumbnail ? null : <Canvas ref={canvasRef} />
      }
    </div>
  )
}


const VideoWrapper = Styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  & > video {
    ${MediaBox}
    object-fit: cover;
    z-index: 400;
  }
`;

const VideoLabel = Styled.div`
  padding: 5px;
  width: calc(100% - 10px);
  background: #eaeaea;
  overflow-x: hidden;

  & > div {
    margin: 2px 0;
  }

  & > div:first-child{
    color: gray;
    font-size: 12px;
  }

  & > div:last-child{
    font-size: 16px;
  }
`;

const Canvas = Styled.canvas`
  visibility: hidden;
  position: absolute;
  z-index: -1;
`


export default withUploadPageContext(SelectedVideo);

