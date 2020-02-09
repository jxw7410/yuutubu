import React, { useState, useEffect, useRef } from 'react';
import Styled, { css } from 'styled-components';


function VideoPlayer(props) {
  debugger
  return (
    <>
      {
        props.videoPlayer.type ? null :
          <Wrapper isFullScreen={false}>

          </Wrapper>
      }
    </>
  )
}


const Fullscreen = css`
  position: fixed;
  bottom: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: 200;
  background: transparent;
`

const Wrapper = Styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  grid-row: 1/2;
  ${props => props.isFullScreen ? `${Fullscreen}` : ''}
`






export default VideoPlayer;

