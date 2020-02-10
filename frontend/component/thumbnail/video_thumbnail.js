import React, { useEffect, useState, useRef } from 'react';
import * as Styles from './styles';
import { convertDurationToTime } from '../../util/selectors';
import Preview from './preview';

function VideoThumbnail(props) {
  const isMouseOver = useRef();
  const fetchRequestRef = useRef();
  const isMounted = useRef(false);

  const [state, setState] = useState({
    isImgLoaded: false,
    isVideoLoaded: false,
    isVideoRequested: false,
    videoWillRender: false,
  });

  useEffect(() => { isMounted.current = true }, []);

  const debouncer = func => setTimeout(() => func(), 200);

  const stopVideoRendering = () => debouncer(() => {
    if (isMounted.current)
      setState({ ...state, videoWillRender: false });
  });

  const handleMouseEnter = () => {
    isMouseOver.current = true;
    clearTimeout(fetchRequestRef.current);
    if (!state.isVideoRequested) {
      fetchRequestRef.current = debouncer(async () => {
        await props.fetchVideo(props.video.id);
        if (!isMounted.current) return;
        setState({
          ...state,
          isVideoRequested: true,
          videoWillRender: true,
        });
      });
    } else {
      fetchRequestRef.current = debouncer(() =>
        setState({
          ...state,
          videoWillRender: true
        }));
    }
  }

  const handleMouseLeave = () => {
    clearTimeout(fetchRequestRef.current);
    isMouseOver.current = false;
    if (state.videoWillRender) stopVideoRendering();
  }

  const toVideoPage = e => {
    e.preventDefault();
    props.history.push(`/video/${props.video.id}`);
  }

  const setDataLoaded = field => e => {
    e.currentTarget.playbackRate = 2;
    setState({
      ...state,
      [field]: true
    });
  }

  return (
    <Styles.ThumbnailWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={toVideoPage}
    >
      <Styles.ThumbnailContent>
        {
          props.video.videoUrl ?
            <Preview
              playVid={state.videoWillRender && isMouseOver.current}
              stopVideoRendering={stopVideoRendering}
              setDataLoaded={setDataLoaded('isVideoLoaded')}
              videoUrl={props.video.videoUrl}
            /> : null
        }
        <Styles.ThumbnailClock>
          <i className='material-icons'>watch_later</i>
        </Styles.ThumbnailClock>
      </Styles.ThumbnailContent>
      <Styles.ThumbnailImgWrapper
        active={isMouseOver.current && state.videoWillRender && state.isVideoLoaded}>
        <Styles.ThumbnailImg
          src={props.video.thumbnail}
          onLoad={setDataLoaded('isImgLoaded')}
          loaded={state.isImgLoaded}/>
      </Styles.ThumbnailImgWrapper>
      <Styles.VideoTime>
        {convertDurationToTime(props.video.duration)}
      </Styles.VideoTime>
    </Styles.ThumbnailWrapper>
  )
}

export default VideoThumbnail;