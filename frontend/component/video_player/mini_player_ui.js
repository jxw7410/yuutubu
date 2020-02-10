import React from 'react';
import Styled from 'styled-components';
import VideoStateButton from './video_state_button';
import { IconMessage } from '../common/common_styles';
import { centerFlex } from '../common/flex_styles'; 
import { VideoTime } from './styles';
import { convertDurationToTime } from '../../util/selectors';

function MiniPlayerUI(props){ 
  const currentTime = props.videoState.currentTime;
  const duration = props.videoState.duration;
  const time = `${convertDurationToTime(currentTime)} / ${convertDurationToTime(duration)}`;
  
  const closeVideoPlayer = e => {
    e.stopPropagation();
    props.removeVideoPlayer();
  }

  const goBackToVideoPage = e => {
    e.stopPropagation();
    props.history.push(props.currentUrl);
  }

  return (
    <Wrapper>
      <div>
        <i style={{ 
            position: 'relative', 
            marginLeft: '12px', 
            marginTop: '12px' 
          }}
          onClick={goBackToVideoPage}
          className='material-icons'>
          check_box_outline_blank
          <IconMessage style={{top: '35px'}}>
            Expand
          </IconMessage>
        </i>
        <i 
          style={{marginRight: '12px', marginTop: '12px'}}
          onClick={closeVideoPlayer}
          className='material-icons'>
          close
        </i>
      </div>
      <FlexBox>
        <ButtonContainer>
          <VideoStateButton />
        </ButtonContainer>
      </FlexBox>
      <VideoTime
        style={{ marginLeft: '12px', marginBottom: '12px' }}>
        {time}
      </VideoTime>
    </Wrapper>
  )
}


const FlexBox = Styled.div`${centerFlex}`;
const ButtonContainer = Styled.div`
  ${centerFlex}
  width: 60px;
  height: 60px;

  &:hover{cursor: pointer;}
  & i{
    width: 50px;
    height: 50px;
    font-size: 50px;
    color:white;
  }
`;

const Wrapper = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  opacitiy: 0;
  margin: 0;
  background: rgba(0,0,0,0.5);
  width: 100%;
  height: 100%;
  transition: opacity 0.1s linear;

  & > div { width: 100% }
  & > div:first-child{
    display: flex;
    justify-content: space-between;
    color: white;
  }
  & .material-icons:hover > ${IconMessage}{ opacity: 1;}
`;

export default MiniPlayerUI;