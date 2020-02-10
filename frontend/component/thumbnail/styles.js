import Styled from 'styled-components';
import { centerFlex } from '../common/flex_styles';


export const VideoTime = Styled.div`
  background:rgba(0, 0, 0, 0.8);
  color:white;
  font-size: 12px;
  position: absolute;
  padding: 2px 4px;
  bottom:8px;
  right:5px;
`

export const ThumbnailImg = Styled.img`
  width: inherit;
  height: inherit;
  position: relative;
  visibility: ${props => props.loaded ? 'visible' : 'hidden'};
`

export const ThumbnailImgWrapper = Styled.div`
  position: absolute;
  z-index: 2;
  opacity: ${props => props.active ? '0' : '1'};
  height: inherit;
  transition: opacity 0.4s linear;
`

export const ThumbnailClock = Styled.div`
  ${centerFlex}
  visibility: hidden;
  padding: 3px;
  background:rgba(0, 0, 0, 0.7);
  color:rgba(255,255,255,0.7);
  border-radius:2px;
  position: absolute;
  z-index: 2;
  right: 5px;
  top: 5px;
  
  & > i {
    font-size: 20px;
    margin-left: 1px;
  }
`

export const ThumbnailContent = Styled.div`
  width: inherit;
  height: inherit;
  padding-bottom: 10px;
  position: relative;
  z-index: 1;

  &:hover ${ThumbnailClock} { visibility: visible; }
`

export const ThumbnailWrapper = Styled.li`
  height: auto;
  width: 100%;
  max-width: 360px;
  position: relative;
`
