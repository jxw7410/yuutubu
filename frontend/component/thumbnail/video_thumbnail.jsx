import React from 'react';
import { fetchVideo } from '../../actions/video/video_action';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ThumbnailPreviewVideo from './thumbnail_preview';
import { VideoPageThumbnailInfo, IndexPageThumbnailInfo, SearchPageThumbnailInfo } from './thumbnail_info';
import { convertDurationToTime } from '../../util/selectors';


const VideoThumbnail = props => {
  const [state, setState] = React.useState({
    renderVideo: false,
    imgLoaded: false,
    vidLoaded: false,
    infoComponent: null,
  })

  const throttledFetchVideoRequest = React.useRef();
  const videoRequested = React.useRef(false);
  const throttledTimeout = 200;
  /* 
    This exists because the ajax that renders video is delayed
    Therefore, a person can mouseover a thumbnail briefly, and then 
    leave, but the video would render.
  */
  const isMouseOver = React.useRef(false);
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
      case 'video-page':
        infoComponent = <VideoPageThumbnailInfo
          video={props.video}
          redirect={props.redirectEvent} />
        break;
      case 'search-page':
        infoComponent = <SearchPageThumbnailInfo
          video={props.video}
          redirect={props.redirectEvent} />
        break;
      default:
        infoComponent = <IndexPageThumbnailInfo
          video={props.video}
          channel={props.channel}
          redirect={props.redirectEvent} />
    }
    setState({ ...state, infoComponent })
  }

  function stopRenderVideo() {
    setTimeout(() => {
      if (_isMounted.current)
        setState({ ...state, renderVideo: false });
    }, throttledTimeout);
  }

  function mouseEnterEvent() {
    clearTimeout(throttledFetchVideoRequest.current);
    isMouseOver.current = true;
    if (!videoRequested.current) {
      throttledFetchVideoRequest.current = setTimeout(async () => {
        try {
          await props.fetchVideo(props.video.id);
          if (_isMounted.current) {
            videoRequested.current = true;
            setState({ ...state, renderVideo: true })
          }
        } catch { console.log('Fetching video failed'); }
      }, throttledTimeout);
    } else {
      throttledFetchVideoRequest.current = setTimeout(() =>
        setState({ ...state, renderVideo: true }), throttledTimeout);
    }
  }

  function mouseLeaveEvent() {
    clearTimeout(throttledFetchVideoRequest.current);
    isMouseOver.current = false;
    if (state.renderVideo)
      stopRenderVideo();
  }

  function redirectEvent(e) {
    e.preventDefault();
    props.history.push(`/video/${props.video.id}`);
  }

  function setDataloaded(field) {
    return e => setState({ ...state, [field]: true })
  }

  return (
    <li className='thumbnails'>
      <div className="tbn-ctnt"
        onMouseEnter={mouseEnterEvent}
        onMouseLeave={mouseLeaveEvent}
        onClick={redirectEvent} >

        <ThumbnailPreviewVideo
          playVid={state.renderVideo && isMouseOver.current}
          stopRenderVideo={stopRenderVideo}
          setDataloaded={setDataloaded('vidLoaded')}
          videoUrl={props.video.videoUrl} />


        <div className="flexh-1 thumbnail-clock">
          <i className="material-icons clock">watch_later</i>
        </div>

        <div className={`
          tbn-prev-wrap 
          ${(state.vidLoaded && state.renderVideo && isMouseOver.current) ? 'tbn-active' : ""} 
          ${ state.imgLoaded ? "" : " not-loaded"}`}  >

          <img className={`
            thumbnail-preview 
            ${state.imgLoaded ? "loaded" : ""}`}
            onLoad={setDataloaded('imgLoaded')}
            src={props.video.thumbnail} />

          <div className='video-time'>{convertDurationToTime(props.video.duration)}</div>
        </div>
      </div>
      {state.infoComponent}
    </li>
  )

}

const mdp = dispatch => ({
  fetchVideo: video_id => dispatch(fetchVideo(video_id))
});

export default withRouter(connect(null, mdp)(VideoThumbnail));   