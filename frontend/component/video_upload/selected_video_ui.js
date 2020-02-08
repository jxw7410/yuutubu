import React, { memo } from 'react';
import Styled from 'styled-components';
import {CenterFlex} from '../common/flex_styles';

function SelectedVideoUI({videoState, handleVideoUI}){
  let iconType;
  switch(videoState){
    case 'PAUSE':
      iconType = 'fa-play-circle';
      break;
    case 'PLAY':
      iconType = 'fa-pause-circle';
      break;
    case 'END':
      iconType = 'fa-undo-alt';
    default:
      break;
  }
  return (
    <Wrapper onClick={handleVideoUI}>
      <i className={`fas ${iconType}`} />
    </Wrapper>
  )
}

const Wrapper = Styled.div`
  ${CenterFlex}
  width: 100%;
  height: 100px;
  position: absolute;
  z-index: 401;

  & > i {
    font-size: 30px;
    color: rgba(255,255,255, 0.5);
    opacity: 0;
    transition: opacity 0.2s linear;
  }

  &:hover{
     cursor: pointer;
     background: rgba(0, 0, 0, 0.5);
  }

  &:hover > i {
    opacity: 1;
  }
`

export default memo(SelectedVideoUI);