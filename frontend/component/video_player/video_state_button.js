import React, { memo } from 'react';
import Styled, { css } from 'styled-components';
import { IconMessageVert } from './styles';
import { withVideoPlayerContext } from './video_player_context';
import { PLAY, PAUSE, REPLAY } from '../../util/constants';

function VideoStateButton({ videoRef, videoState, playOrPause }) {
  let button = 'Play';
  let buttonIcon = 'play_arrow';
  let eventHandler = () => null;
  let iconMessage = 'Play';

  const replayEvent = e => {
    e.stopPropagation;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
  }

  switch (videoState.state) {
    case PLAY:
      button = 'Pause';
      buttonIcon = 'pause';
      eventHandler = playOrPause;
      iconMessage = 'Pause';
      break;
    case REPLAY:
      button = 'Replay';
      buttonIcon = 'replay';
      eventHandler = replayEvent;
      iconMessage = 'Replay';
      break;
    case PAUSE:
      eventHandler = playOrPause;
      break;
    default: break;
  }

  return (
    <Wrapper
      onClick={eventHandler}
      button={button}>
      <i className='material-icons-enlarged'>
        {buttonIcon}
        <IconMessageVert style={{ left: '-10px' }}>{iconMessage}</IconMessageVert>
      </i>
    </Wrapper>
  )
}

const Pause = css``
const Replay = css``
const Play = css`
  background: transparent;
  color: gray;
  &:hover{ cursor: pointer }
`

const Wrapper = Styled.div`
  position: relative;
  ${props => props.button}
`

export default withVideoPlayerContext(memo(VideoStateButton));