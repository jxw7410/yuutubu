import React from 'react';
import { fetchVideo } from '../../actions/video/video_action';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ThumbnailPreviewVideo from './thumbnail_preview';
import { VideoPageThumbnailInfo, IndexPageThumbnailInfo, SearchPageThumbnailInfo } from './thumbnail_info';
import { convertDurationToTime } from '../../util/selectors';

// React Hook

// class VideoThumbnail extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       renderVideo: false,
//       dataLoaded: false,
//       imgLoaded: false,
//       infoComponent: null
//     }

//     this.receiveVideo = false;
//     this.throttledAjax = null;
//     this.mouseHover = false;
//     this.clock = false;
//     this.handleMouseEnter = this.handleMouseEnter.bind(this);
//     this.handleMouseOver = this.handleMouseOver.bind(this);
//     this.handleMouseLeave = this.handleMouseLeave.bind(this);
//     this.setRender = this.setRender.bind(this);
//     this.didRequested = false;
//     this.setDataloaded = this.setDataloaded.bind(this);
//     this.handleLoadImg = this.handleLoadImg.bind(this);
//     this._isMounted = false;

//   }


//   componentDidMount() {
//     this._isMounted = true;
//     this.selectInfo(this.props.type);
//   }

//   componentWillUnmount() {
//     this._isMounted = false;
//   }

//   selectInfo(type) {
//     let infoComponent;
//     switch (type) {
//       case "video-page":
//         infoComponent = <VideoPageThumbnailInfo
//           video={this.props.video}
//           onClick={this.props.handleClick} />
//         break;
//       case "search-page":
//         infoComponent = <SearchPageThumbnailInfo
//           video={this.props.video}
//           onClick={this.props.handleClick} />;
//         break;
//       default:
//         infoComponent = <IndexPageThumbnailInfo
//           video={this.props.video}
//           channel={this.props.channel}
//           onClick={this.props.handleClick} />
//     }

//     this.setState({ infoComponent })
//   }

//   handleMouseOver() {
//     this.mouseHover = true;
//     this.clock = true;
//   }

//   handleMouseEnter() {
//     clearTimeout(this.throttledAjax)
//     this.mouseHover = true;
//     if (!this.didRequested) {
//       this.throttledAjax = setTimeout(() => {
//         this.props.fetchVideo(this.props.video.id)
//           .then(() => {
//             if (this._isMounted) {
//               this.didRequested = true;
//               this.setState({ renderVideo: true })
//             }
//           })
//       }, 200);
//     } else {
//       this.throttledAjax = setTimeout(() => {
//         this.setState({ renderVideo: true })
//       }, 200);
//     }
//   }

//   setRender() {
//     this.setState({ dataLoaded: false })
//     setTimeout(() => {
//       if (this._isMounted)
//         this.setState({ receiveVideo: false })
//     }, 200);
//   }

//   setDataloaded(e) {
//     e.preventDefault();
//     this.setState({ dataLoaded: true })
//   }

//   handleMouseLeave() {
//     clearTimeout(this.throttledAjax)
//     this.clock = false;

//     if (this.state.renderVideo)
//       this.setRender();

//     if (this.state.dataLoaded)
//       setTimeout(() => {
//         this.mouseHover = false;
//       }, 100);
//     else
//       this.mouseHover = false;
//   }

//   handleLoadImg() {
//     this.setState({ imgLoaded: true })
//   }

//   render() {
//     return (
//       <li className='thumbnails'>
//         <div className="tbn-ctnt"
//           onMouseEnter={this.handleMouseEnter}
//           onMouseOver={this.handleMouseOver}
//           onMouseLeave={this.handleMouseLeave}
//           onClick={this.props.handleClick}>
//           {
//             this.state.renderVideo && this.mouseHover ?

//               <ThumbnailPreviewVideo
//                 setRender={this.setRender}
//                 setDataloaded={this.setDataloaded}
//                 video={this.props.video} /> : null
//           }


//           {
//             this.clock ?
//               <div className='flexh-1 thumbnail-clock'>
//                 <i className="material-icons clock">watch_later</i>
//               </div> : null
//           }

//           <div className={`tbn-prev-wrap` +
//             ((this.state.renderVideo && this.mouseHover && this.state.dataLoaded) ? " tbn-active" : "")
//             +
//             ((this.state.imgLoaded ? "" : " not-loaded"))
//           }>

//             <img onLoad={this.handleLoadImg} className={`thumbnail-preview ${this.state.imgLoaded ? "loaded" : ""}`}
//               src={this.props.video.thumbnail} />
//             <div className='video-time'>{convertDurationToTime(this.props.video.duration)}</div>
//           </div>
//         </div>

//         {this.state.infoComponent}
//       </li>
//     )
//   }
// }


const VideoThumbnail = props => {
  const [state, setState] = React.useState({
    renderVideo: false,
    dataLoaded: false, 
    imgLoaded: false,
    infoComponent: null,
  })

  const throttledFetchVideoRequest = React.useRef();
  const videoRequested = React.useRef(false);
  const throttledTimeout = 200;

  /* 
    This is used so that if an ajax was sent to fetch the video, but the user
    already redirected, cancel React from trying to render information with that ajax's result
  */
  const _isMounted = React.useRef(false);

  React.useEffect(()=>{
    _isMounted.current = true; 
    renderInfoComponent();
    return () => _isMounted.current = false;
  }, [])
  
  function renderInfoComponent(){
    let infoComponent;
    switch(props.type) {
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
    setState({...state, infoComponent})
  }

  function stopRenderVideo(){
    setState({...state, dataLoaded: false});
    setTimeout(()=>{
      if(_isMounted.current)
        setState({...state, renderVideo: false});
    }, throttledTimeout);
  }

  function mouseEnterEvent(){
    clearTimeout(throttledFetchVideoRequest.current);
    if ( !videoRequested.current ){
      throttledFetchVideoRequest.current = setTimeout( async () => {
        try {
          await props.fetchVideo(props.video.id);
          if(_isMounted.current){
            videoRequested.current= true; 
            setState({...state, renderVideo: true})
          }
        } catch {
          console.log('Fetching video failed');
        }
      }, throttledTimeout);
    } else {
      throttledFetchVideoRequest.current = setTimeout(() => 
        setState({ ...state, renderVideo: true }), throttledTimeout);
    }
  }

  function mouseLeaveEvent() {
    clearTimeout(throttledFetchVideoRequest);
    if (state.renderVideo)
      stopRenderVideo();
  }

  function redirectEvent(e){
    e.preventDefault();
    props.history.push(`/video/${props.video.id}`);
  }

  function setDataloaded(field) {
    return e => setState({...state, [field]: true})
  }

  return (
    <li className='thumbnails'>
      <div className="tbn-ctnt"
        onMouseEnter={mouseEnterEvent}
        onMouseLeave={mouseLeaveEvent}
        onClick={redirectEvent} >
        {
          state.renderVideo ? 
          <ThumbnailPreviewVideo 
            stopRenderVideo={stopRenderVideo}
            setDataloaded={setDataloaded('dataLoaded')}
            video={props.video} /> : null
        }

        <div className="flexh-1 thumbnail-clock">
          <i className="material-icons clock">watch_later</i>
        </div>

        <div className={`
          tbn-prev-wrap 
          ${ state.renderVideo && state.dataLoaded ? 'tbn-active':""} 
          ${ state.imgLoaded ? "" : " not-loaded"}`}  >
          
          <img className={`
            thumbnail-preview 
            ${state.imgLoaded ? "loaded" : ""}`}
            onLoad={setDataloaded('imgLoaded')} 
            src={ props.video.thumbnail }  />
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