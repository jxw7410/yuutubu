import React, { useState, useEffect, useRef } from 'react';
import { updateView } from '../../util/video_api';
import { LOAD, PLAY, PAUSE, REPLAY, MINI } from '../../util/constants';
import { VideoPlayerContext } from './video_player_context';
import Styled, { css, keyframes } from 'styled-components';
import { centerFlex } from '../common/flex_styles';
import ProgressBar from './progress_bar';
import DefaultVideoUI from './default_video_ui_container';
import MiniPlayerUI from './mini_player_ui_container';

function VideoPlayer(props) {
  const videoPlayerWrapperRef = useRef();
  const videoRef = useRef();
  const streamBarRef = useRef();
  const seekerRef = useRef();
  const [viewCountUpdated, setViewCountUpdated] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [animateIcon, setAnimateIcon] = useState(null);
  const [videoDimensions, setVideoDimensions] = useState({
    width: '100%',
    height: '660px',
  });
  const [videoState, setVideoState] = useState({
    state: LOAD,
    buffered: 0,
    duration: 0,
    currentTime: 0,
  });
  const [updateCounter, setUpdateCounter] = useState(0);

  useEffect(() => { if (!isFullscreen) resizeHandler(); }, [isFullscreen]);
  useEffect(() => { resizeHandler(); }, [props.videoPlayer.video.videoUrl, props.videoPlayer.type]);
  useEffect(() => {
    document.addEventListener('fullscreenchange', fullscreenHandler);
    window.addEventListener('resize', resizeHandler);
    return () => {
      document.removeEventListener('fullscreenchange', fullscreenHandler);
      window.addEventListener('resize', resizeHandler);
    }
  }, []);

  const fullscreenHandler = e => {
    e.preventDefault();
    if (document.fullscreenElement) setIsFullscreen(true);
    else setIsFullscreen(false);
  }

  const resizeHandler = (e = { preventDefault: () => null }) => {
    e.preventDefault();
    const width = videoPlayerWrapperRef.current.offsetWidth;
    const height = Math.floor((width * 9) / 16);
    setVideoDimensions({ width, height });
  }

  const playOrPause = e => {
    e.stopPropagation();
    switch (videoState.state) {
      case PLAY:
        new Promise(resolve => resolve(videoRef.current.pause()))
          .then(() => setAnimateIcon('pause'));
        break;
      case PAUSE:
        videoRef.current.play()
          .then(() => setAnimateIcon('play_arrow'))
        break;
      default:
        break;
    }
  }

  const handleDoubleClick = e => {
    e.stopPropagation();
    if (props.videoPlayer.type === MINI) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else e.currentTarget.requestFullscreen();
  }

  const handleCanPlay = e => {
    e.preventDefault();
    if (videoState.state === PAUSE) return;
    setTimeout(() => {
      videoRef.current.play()
        .then(() => videoRef.current.muted = false);
    });
  }

  const updateViewCount = () => {
    if (viewCountUpdated){ 
      return;
    } else if (updateCounter < 5) {
      setUpdateCounter(updateCounter + 1);
    } else {
      updateView(props.videoPlayer.video.id);
      setViewCountUpdated(true);
    }
  }

  const handleTimeUpdate = e => {
    e.preventDefault();
    updateViewCount();
    const currentTime = e.currentTarget.currentTime;
    const duration = e.currentTarget.duration;
    const streamed = (currentTime / duration * 100).toFixed(4);
    seekerRef.current.value = streamed;
    streamBarRef.current.style.width = streamed + '%';
    setVideoState({ ...videoState, currentTime, duration });
  }

  const handleEnded = e => { setVideoState({ ...videoState, state: REPLAY }); }

  const handleProgress = e => {
    const buffered = e.currentTarget.buffered;
    const bufferLength = buffered.length;
    if (!bufferLength) return;
    let range = 0;
    const time = e.currentTarget.currentTime;
    while (time > buffered.end(range)) {
      range++;
      if (range === bufferLength) break;
    }
    if (range !== bufferLength) {
      const bufferedPercent = buffered.end(range) / e.currentTarget.duration * 100;
      setVideoState({ ...videoState, buffered: bufferedPercent });
    }
  }

  const handleVideoState = state => e => {
    e.preventDefault();
    setVideoState({ ...videoState, state });
  }

  const handleLoadedData = e => {
    e.preventDefault();
    e.currentTarget.volume = localStorage.getItem('volume') || 1;
  }

  return (
    <>
      <VideoPlayerWrapper
        ref={videoPlayerWrapperRef}
        onClick={playOrPause}
        onDoubleClick={handleDoubleClick}
        isFullscreen={isFullscreen}>
        <PlayerCover isDiplayed={videoState.state === REPLAY || videoState.state === PAUSE} />
        <AnimateIconWrapper
          animate={animateIcon}
          style={props.videoPlayer.type === MINI ? { display: 'none' } : null}>
          {
            animateIcon ?
              <i
                onAnimationEnd={() => setAnimateIcon(null)}
                className='material-icons-enlarged'>
                {animateIcon}
              </i> : null
          }
        </AnimateIconWrapper>
        <SpinnerContainer
          style={videoState.state === LOAD ? null : { display: 'none' }}>
          <div className='spinner' />
        </SpinnerContainer>
        <Video
          muted
          ref={videoRef}
          key={props.videoPlayer.video.videoUrl}
          preload='auto'
          controlsList='nodownload'
          onCanPlay={handleCanPlay}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onProgress={handleProgress}
          onPlay={handleVideoState(PLAY)}
          onPause={handleVideoState(PAUSE)}
          onLoadedData={handleLoadedData}
          style={
            props.videoPlayer.type === MINI ?
              {
                width: '425px',
                height: '239px',
              }
              :
              {
                width: videoDimensions.width,
                height: videoDimensions.height,
              }
          }>
          <source src={props.videoPlayer.video.videoUrl + `t=?${new Date()}`} type="video/mp4" />
        </Video>
        <UIWrapper play={videoState.state === PLAY}>
          {/* Only passing shared / nested resources into the provider */}
          <VideoPlayerContext.Provider value={{ videoRef, videoState, playOrPause }}>
            {
              props.videoPlayer.type === MINI ?
                <MiniPlayerUI currentUrl={currentUrl} /> : null
            }
            <ProgressBar
              setVideoState={setVideoState}
              seekerRef={seekerRef}
              streamBarRef={streamBarRef}
            />
            {
              props.videoPlayer.type === MINI ? null :
                <DefaultVideoUI
                  setCurrentUrl={setCurrentUrl}
                  isFullscreen={isFullscreen}
                  videoPlayerWrapperRef={videoPlayerWrapperRef}
                />
            }
          </VideoPlayerContext.Provider>
        </UIWrapper>
      </VideoPlayerWrapper>
      {
        props.videoPlayer.type === MINI ?
          <MiniPlayerDescription>
            <span>{props.videoPlayer.video.title}</span> 
          </MiniPlayerDescription> : null
      }
    </>
  )
}

const fullscreen = css`
  position: fixed;
  bottom: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: 200;
  background: transparent;
`

const animateStatus = keyframes`
  0%  { 
        opacity: 0; 
        padding: 15px;
        font-size: 35px;
      }
  50% { 
        opacity: 100%;
        padding: 20px;
        font-size: 40px;
      }
  100% {
        opacity: 0%;
        padding: 25px;
        font-size: 45px;
      }
`
const iconAnimation = css`animation: ${animateStatus} 0.6s ease-out;`

const VideoPlayerWrapper = Styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
  grid-row: 1/2;
  ${props => props.isFullscreen ? `${fullscreen}` : ''}
`

const UIWrapper = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  z-index: 10000;
  background: linear-gradient(  rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
  opacity: ${ props => props.play ? '0' : '1'};
  transition: opacity 0.1s linear;
  width: 100%;
  height: 100%;

  &:hover{
    opacity: 1;
  }
`

const PlayerCover = Styled.div`
  display: ${props => props.isDiplayed ? 'block' : 'none'}
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  position: absolute;
  z-index: 9999;
`

const AnimateIconWrapper = Styled.div`
  ${centerFlex}
  width: 100%;
  height: 100%;
  background: transparent;
  position: absolute;
  z-index: 9998;

  & > i:first-child {
    opacity: 0;
    border-radius: 50%;
    font-size: 30px;
    padding: 10px;
    color: white;
    background: rgba(60, 60, 60, 0.5);
    ${iconAnimation}
  }
`

const SpinnerContainer = Styled.div`
  ${centerFlex}
  position: absolute;
  width: 100%
  height: 100%;

  & > .spinner{
    border: 6px solid transparent;
    border-top: 6px solid #f3f3f3;
    border-bottom: 6px solid  #f3f3f3;
    width: 60px;
    height: 60px;
  }
`

const Video = Styled.video`
  outline: none;
  background: black;
  object-fit: contain;
  margin: auto;
  &:focus{ outline: none; }
`

const MiniPlayerDescription = Styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 14px 16px 16px 16px;
  height: 34px;

  & > span{
    font-size: 15px;
    font-weight: 600;
    color: black;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`


export default VideoPlayer;

