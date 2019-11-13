import React from 'react';
import ProgressBar from './progress_bar';
import DefaultVideoUI from './default_video_ui';
import MiniPlayerUI from './mini_player_ui';
import { withRouter } from 'react-router-dom';
import { updateView } from '../../util/video_api';
import { LOAD, PLAY, PAUSE, REPLAY, MINI } from '../../util/constants';

export const VideoPlayerContext = React.createContext(null);

const VideoPlayer = props => {
  const videoCtnRef = React.useRef();
  const videoRef = React.useRef();
  const streamBarRef = React.useRef();
  const seekerRef = React.useRef();

  const [viewCountUpdated, setViewCountUpdated] = React.useState(false);
  const [videoState, setVideoState] = React.useState({
    state: LOAD,
    buffered: 0,
    duration: 0,
    currentTime: 0,
    fullScreen: false,
    currentUrl: null,
  });

  React.useEffect(() => {
    if (videoState.fullScreen)
      videoCtnRef.current.requestFullscreen();
    else if (document.fullscreen)
      document.exitFullscreen();
  }, [videoState.fullScreen])

  function updateViewCount() {
    if (viewCountUpdated) return;
    updateView(props.videoPlayer.video.id);
    setViewCountUpdated(true);
  }

  function playPause(e) {
    if (videoState.state === PLAY)
      videoRef.current.pause();
    else if (videoState.state === PAUSE)
      videoRef.current.play();
  }

  function handleDoubleClick(e) {
    if (props.videoPlayer.type === MINI) return;
    e.stopPropagation();
    const fullScreen = !videoState.fullScreen;
    setVideoState({ ...videoState, fullScreen })
  }

  function handleCanPlay(e) {
    if (videoState.state === PAUSE) return;
    setVideoState({ ...videoState, state: PLAY })
    e.currentTarget.play();
  }

  function handleTimeUpdate(e) {
    updateViewCount();
    const currentTime = e.currentTarget.currentTime;
    const duration = e.currentTarget.duration;
    const streamed = (currentTime / duration * 100).toFixed(4);
    seekerRef.current.value = streamed;
    streamBarRef.current.style.width = streamed + "%";
    setVideoState({ ...videoState, currentTime, duration });
  }

  function handleEnded(e) {
    updateViewCount();
    setVideoState({ ...videoState, state: REPLAY });
  }

  function handleProgress(e) {
    const buffered = e.currentTarget.buffered;
    if (!buffered.length) return;

    let range = 0;
    const time = e.currentTarget.currentTime;
    while (!(time <= buffered.end(range))) {
      range++;
      if (range === buffered.length) break;
    }
    if (range !== buffered.length) {
      const bufferedPercent = buffered.end(range) / e.currentTarget.duration * 100;
      setVideoState({ ...videoState, buffered: bufferedPercent });
    }
  }

  function handleVideoState(state) {
    return e => setVideoState({ ...videoState, state });
  }

  function handleLoadedData(e) {
    e.currentTarget.volume = localStorage.getItem('volume') || 1;
    if (videoState.state === LOAD) setVideoState({ ...videoState, state: null })
  }

  function handleWaiting(e) {
    if (videoState.state !== LOAD) setVideoState({ ...videoState, state: LOAD })
  }

  function renderVidStateBtn() {
    let button, buttonIcon, eventHandler, iconMessage;

    switch (videoState.state) {
      case PLAY:
        button = 'pause-button';
        buttonIcon = 'pause';
        eventHandler = playPause;
        iconMessage = 'Pause'
        break;
      case REPLAY:
        button = 'replay-button';
        buttonIcon = 'replay';
        eventHandler = e => {
          videoRef.current.currentTime = 0;
          videoRef.current.play();
        };
        iconMessage = 'Replay'
        break;
      case PAUSE:
        button = 'play-button';
        buttonIcon = 'play_arrow';
        eventHandler = playPause;
        iconMessage = 'Play';
        break;
      default:
        button = 'play-button';
        buttonIcon = 'play_arrow';
        eventHandler = () => { return; };
        iconMessage = 'Play';
        break;
    }

    return (
      <div className={`i-wrap ${button}`} onClick={eventHandler}>
        <i className="material-icons-enlarged">{buttonIcon}</i>
        <div className='i-msg-v i-pos-lft'>{iconMessage}</div>
      </div>
    )
  }

  return (
    <>
      <div
        ref={videoCtnRef}
        onClick={playPause}
        onDoubleClick={handleDoubleClick}
        className={[
          'vid-player-hook',
          videoState.fullScreen ? 'vph-full' : ''
        ].join(" ")}
      >
        <div
          style={videoState.state === REPLAY || videoState.state === PAUSE ? null : { display: 'none' }}
          className='vid-dark-scn max-w-h'
        />
        <div
          style={videoState.state === LOAD ? null : { display: 'none' }}
          className='vid-ldr max-w-h flexh-1'>
          <div className='spinner' />
        </div>
        <video
          key={props.videoPlayer.video.videoUrl}
          ref={videoRef}
          id='video-player'
          preload='auto'
          onCanPlay={handleCanPlay}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onProgress={handleProgress}
          onPlay={handleVideoState(PLAY)}
          onPause={handleVideoState(PAUSE)}
          onLoadedData={handleLoadedData}
          onWaiting={handleWaiting} >
          {/* The t=? is to force a non cache video, browser caches videos by default.*/}
          <source src={props.videoPlayer.video.videoUrl + `t=?${new Date()}`} type="video/mp4" />
        </video>
        <div
          className={[
            'max-w-h',
            'flexv-10',
            'vid-ctrl',
            videoState.state === PLAY ? 'vc-play' : ""
          ].join(" ")}>
          <VideoPlayerContext.Provider
            value={{ videoRef: videoRef.current, videoState, setVideoState }}>
            {
              props.videoPlayer.type === MINI ? 
                <MiniPlayerUI videoStateBtn={renderVidStateBtn()} /> : null
            }
            <ProgressBar
              seekerRef={seekerRef}
              streamBarRef={streamBarRef} />
            {
              props.videoPlayer.type === MINI ? null :
                <DefaultVideoUI videoStateBtn={renderVidStateBtn()} />
            }
          </VideoPlayerContext.Provider>
        </div>
      </div>
      {
        props.videoPlayer.type === MINI ?
          <div className='vid-player-desc flexv-7'>
            <span>{props.videoPlayer.video.title}</span>
            <span>{props.videoPlayer.video.description}</span>
          </div> : null
      }
    </>
  )
}

export default withRouter(VideoPlayer);



