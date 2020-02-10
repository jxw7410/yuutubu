import React, { useState } from 'react';
import Styled, { css } from 'styled-components';
import VideoStateButton from './video_state_button';
import { convertDurationToTime } from '../../util/selectors';
import { IconMessageVert, VideoTime } from './styles';

function DefaultVideoUI(props) {
  const currentTime = props.videoState.currentTime;
  const duration = props.videoState.duration;
  const time = `${convertDurationToTime(currentTime)} / ${convertDurationToTime(duration)}`;

  const [volumeAttr, setVolumeAttr] = useState({
    volume: localStorage.getItem('volume') || 1,
    volumeTrackLength: Math.floor(50 * (localStorage.getItem('volume') || 1)),
  })

  const handleMute = e => {
    e.preventDefault();
    e.stopPropagation();
    const videoRef = props.videoRef.current;
    if (videoRef.muted) {
      const volume = localStorage.getItem('volume') || 1;
      videoRef.muted = false;
      setVolumeAttr({ volume, volumeTrackLength: Math.floor(50 * volume) });
    } else if (volumeAttr.volume === 0) {
      videoRef.volume = 0.5;
      localStorage.setItem('volume', 0.5);
      setVolumeAttr({ volume, volumeTrackLength: 25 });
    } else {
      localStorage.setItem('volume', videoRef.volume);
      videoRef.muted = true;
      setVolumeAttr({ volume: 0, volumeTrackLength: 0 });
    }
  }

  const handleVolumeChange = e => {
    e.preventDefault();
    e.stopPropagation();
    const videoRef = props.videoRef.current;
    if (videoRef.muted) videoRef.muted = false;
    const volume = e.currentTarget.value;
    videoRef.volume = volume;
    localStorage.setItem('volume', volume);
    setVolumeAttr({ volume, volumeTrackLength: 50 * volume });
  }

  const minMaxScreen = bool => e => {
    e.stopPropagation();
    if (bool) props.videoPlayerWrapperRef.current.requestFullscreen();
    else document.exitFullscreen();
  }

  const requestMiniPlayer = async (e) => {
    e.stopPropagation();
    if (props.isFullscreen) await document.exitFullscreen();
    props.requestMiniPlayer();
    props.setCurrentUrl(`/video/${props.video.id}`);
    if (!props.prevPath || props.prevPath === '/video/:video_id')
      props.history.push('/');
    else
      props.history.goBack();
  }

  const getVolumeIcon = () => {
    let volumeType;
    if (volumeAttr.volume == 0) volumeType = 'volume_off';
    else if (volumeAttr.volume > 0.5) volumeType = 'volume_up';
    else volumeType = 'volume_down';
    return volumeType;
  }


  return (
    <Wrapper
      onClick={e => e.stopPropagation()}>
      <Section>
        <VideoStateButton />
        <VolumeUIWrapper>
          <i
            onClick={handleMute}
            className='material-icons'>
            {getVolumeIcon()}
          </i>
          <VolumeBarWrapper>
            <VolumeBar>
              <VolumeBarTrack style={{ width: volumeAttr.volumeTrackLength + 'px' }} />
              <VolumeBarSlider
                type='range'
                min='0'
                max='1'
                step='0.05'
                value={volumeAttr.volume}
                onMouseDown={e => e.stopPropagation()}
                onClick={e => e.stopPropagation()}
                onChange={handleVolumeChange}
              />
            </VolumeBar>
          </VolumeBarWrapper>
        </VolumeUIWrapper>
        <VideoTime>{time}</VideoTime>
      </Section>
      <Section>
        <i
          onClick={requestMiniPlayer}
          style={{ margin: '0 5px' }}
          className='material-icons'>
          picture_in_picture_alt
          <IconMessageVert style={{ right: '-15px' }}>
            MiniPlayer
          </IconMessageVert>
        </i>
        {
          props.isFullscreen ?
            <i
              onClick={minMaxScreen(false)}
              className='material-icons-enlarged'>
              fullscreen_exit
              <IconMessageVert style={{ right: '-15px' }}>
                Exit Fullscreen
              </IconMessageVert>
            </i>
            :
            <i
              onClick={minMaxScreen(true)}
              className='material-icons-enlarged'>
              fullscreen_exit
              <IconMessageVert style={{ right: '-15px' }}>
                Fullscreen
              </IconMessageVert>
            </i>
        }
      </Section>
    </Wrapper>
  )
}

const flexCSS = css`
  display: flex;
  align-items: center;
`

const Section = Styled.section`
  ${flexCSS}
  width: min-content;
  padding: 0 15px;
  & i { position: relative; }
`

const VolumeBar = Styled.div`
  width: 0px;
  background: rgba(75,75,75, 0.9);
  height: 3px;
  transition: width 0.1s linear;
`

const VolumeBarTrack = Styled.div`
  height: inherit;
  background: white;
  position: absolute;
  z-index: 1;
`

const VolumeBarSlider = Styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  background: transparent;
  outline: none;
  width: 101%;
  position: absolute;
  z-index: 2;
  margin-top: -5px;
  margin-left: 1px;

  &::-webkit-slider-thumb{
    -webkit-appearance: none;
    background: white;
    height: 12px;
    width: 12px;
    border-radius: 50%;
    margin-top: 1.5px;
  }

  &::-moz-range-thumb{
    -moz-appearance: none;
    background: white;
    height: 13px;
    width: 13px;
    border-radius: 50%;
    border: none;
  }

  &::-webkit-slider-runnable-track {
    box-shadow: none;
    border: none;
    background: transparent;
    -webkit-appearance: none;
  }

  &::-moz-range-track{
    box-shadow: none;
    border: none;
    background: transparent;
    margin-top: -2px;
  }  

  &::-moz-range-progress {
    background-color: transparent;
  }
`

const VolumeBarWrapper = Styled.div`
  ${flexCSS}
  position: relative;
  margin-left: 8px;
  height: 20px;
  width: 0px;
  overflow-x: hidden;
  transition: width 0.2s linear;
`

const VolumeUIWrapper = Styled.div`
  ${flexCSS}
  position: relative;
  width: auto;

  &:hover ${VolumeBarWrapper}{
    width: 52px;
    visibility: visible;
  }
  &:hover ${VolumeBar}{ width: 50px;}
  &:hover ${VolumeBarTrack}{ visibility: visible;}
  &:hover ${VolumeBarSlider}{
    cursor: pointer;
    width: 50px;
    visibility: visible;
  }
`

const Wrapper = Styled.div`
  ${flexCSS}
  justify-content: space-between;
  margin: 2px 0;
  width: 100%;
  color: white;

  & > section:first-child > div { margin: 0 5px; }
  & > section:last-child {margin-right: 6px; }
  & i:hover ${IconMessageVert} { display: block;}
`

export default DefaultVideoUI;