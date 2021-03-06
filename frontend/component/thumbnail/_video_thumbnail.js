import React from 'react';
import { fetchVideo } from '../../actions/video/video_action';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ThumbnailPreviewVideo from './_thumbnail_preview';
import { VideoPageThumbnailInfo, IndexPageThumbnailInfo, SearchPageThumbnailInfo } from './thumbnail_info';
import { convertDurationToTime } from '../../util/selectors';

const VideoThumbnail = props => {
  const [state, setState] = React.useState({
    renderVideo: false,
    imgLoaded: false,
    vidLoaded: false,
    videoRequested: false,
  })

  const isMouseOver = React.useRef(false);
  const throttledFetchVideoRequest = React.useRef();
  const throttledTimeout = 200;
  /* 
    This is used so that if an ajax was sent to fetch the video, but the user
    already redirected, cancel React from trying to render information with that ajax's result
  */
  const _isMounted = React.useRef(false);

  React.useEffect(() => {
    _isMounted.current = true;
    renderInfoComponent();
    return () => _isMounted.current = false;
  }, [])

  function renderInfoComponent() {
    let infoComponent;
    switch (props.type) {
      case 'VIDEOPAGE':
        infoComponent = <VideoPageThumbnailInfo
          video={props.video}
          redirect={redirectEvent} />
        break;
      case 'SEARCHPAGE':
        infoComponent = <SearchPageThumbnailInfo
          video={props.video}
          redirect={redirectEvent} />
        break;
      default:
        infoComponent = <IndexPageThumbnailInfo
          video={props.video}
          channel={props.channel}
          redirect={redirectEvent} />
    }
    return infoComponent;
  }

  function debounced(callback) {
    return setTimeout(() => {
      callback()
    }, throttledTimeout)
  }

  function stopRenderVideo() {
    debounced(() => {
      if (_isMounted.current) setState({ ...state, renderVideo: false });
    })
  }


  /*
    Fetch data from backend for video url once only. 
    Also sets mouseOver state to true
  */
  function mouseEnterEvent() {
    isMouseOver.current = true;
    clearTimeout(throttledFetchVideoRequest.current);
    if (!state.videoRequested) {
      throttledFetchVideoRequest.current = debounced(() => {
        props.fetchVideo(props.video.id)
          .then(() => {
            if (!_isMounted.current) return
            setState({
              ...state,
              renderVideo: true,
              videoRequested: true,
            })
          })
      })
    } else {
      throttledFetchVideoRequest.current = debounced(() =>
        setState({ ...state, renderVideo: true }))
    }
  }

  function mouseLeaveEvent() {
    clearTimeout(throttledFetchVideoRequest.current);
    isMouseOver.current = false;
    if (state.renderVideo) stopRenderVideo();
  }

  function redirectEvent(e) {
    e.preventDefault();
    props.history.push(`/video/${props.video.id}`);
  }

  function setDataloaded(field) {
    return e => { 
      e.currentTarget.playbackRate = 2;
      setState({ ...state, [field]: true })
    }
  }

  return (
    <li className='thumbnails'>
      <div className="thumbnail-content"
        onMouseEnter={mouseEnterEvent}
        onMouseLeave={mouseLeaveEvent}
        onClick={redirectEvent} >

        {
          props.video.videoUrl ? 
            <ThumbnailPreviewVideo
              playVid={state.renderVideo && isMouseOver.current}
              stopRenderVideo={stopRenderVideo}
              setDataloaded={setDataloaded('vidLoaded')}
              videoUrl={props.video.videoUrl} /> : null
        }

        <div className="flex-horizontal--style-1 thumbnail-clock">
          <i className="material-icons clock">watch_later</i>
        </div>

        <div className={[
          'thumbnail-preview--wrapper',
          (state.vidLoaded && state.renderVideo && isMouseOver.current) ? 'thumbnail-active' : "",
        ].join(' ')}  >

          <img
            src={props.video.thumbnail}
            onLoad={setDataloaded('imgLoaded')}
            className={[
              'thumbnail-preview',
              state.imgLoaded ? "loaded" : ""
            ].join(" ")} />

          <div className='video-time'>
            {convertDurationToTime(props.video.duration)}
          </div>
        </div>
      </div>
      {renderInfoComponent()}
    </li>
  )

}

const mdp = dispatch => ({
  fetchVideo: video_id => dispatch(fetchVideo(video_id))
});

export default withRouter(connect(null, mdp)(VideoThumbnail));   