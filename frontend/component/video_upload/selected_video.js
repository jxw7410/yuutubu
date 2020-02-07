import React, { useRef, useState } from 'react';
import Styled, {css} from 'styled-components';
import { withUploadPageContext } from './upload_page_context';
import { CenterFlex } from '../common/flex_styles';


function SelectedVideo(props) {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [videoState, setVideoState] = useState('PAUSE');
  const [renderCanvas, setRenderCanvas] = useState(true);

  const changeVideoState = state => e => {
    e.preventDefault();
    setVideoState(state);
  }

  const extractThumbnail = e => {
    e.preventDefault();
  }

  return (
    <Wrapper>
      <VideoWrapper>
        {
          props.videoAttr.videoUrl ?
            <video
              muted
              ref={videoRef}
              onPlay={changeVideoState('PLAY')}
              onPause={changeVideoState('PAUSE')}
              onEnded={changeVideoState('END')}
              onCanPlay={extractThumbnail}
            > 
              <source src={props.videoAttr.videoUrl} type='video/webm' />
              <source src={props.videoAttr.videoUrl} type='video/ogg' />
              <source src={props.videoAttr.videoUrl} type='video/mp4' />
            </video>
            :
            <SpinnerContainer>
              <div className='spinner' />
            </SpinnerContainer>
        }
      </VideoWrapper>
    </Wrapper>
  )
}

const Box = css`
  width: 200px;
  height: 100px;
`

const Wrapper = Styled.div`
  display: inline-block;
`;

const VideoWrapper = Styled.div`
  ${Box}
  margin: 10px 0px;
  position: relative;

  & > video {
    position: absolute;
    width: inherit;
    height: inherit;
    object-fit: cover;
    z-index: 400;
  }
`;

const SpinnerContainer = Styled.div`
  ${CenterFlex}
  ${Box}
  background: lightgray;

  & .spinner{
    border: 4px solid #f3f3f3; /* Light grey */
    border-top: 4px solid lightgray; /* Blue */
    border-radius: 50%;
    width: 16px;
    height: 16px;
  }
`;


export default withUploadPageContext(SelectedVideo);

