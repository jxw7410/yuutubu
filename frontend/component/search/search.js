import React from 'react';
import VideoThumbnail from '../thumbnail/video_thumbnail_container';
import { MINI } from '../../util/constants';
import { useInfiniteScrolling } from '../../util/custom_hooks';

const Search = props => {
  const [isFetching, setIsFetching] = useInfiniteScrolling(fetchThumbnails);
  const queryOffset = React.useRef(0);

  React.useEffect(() => {
    queryOffset.current = 0;
    props.clearVideos();
    props.updateSearchHistory(props.match.params);
    if (!isFetching) setIsFetching(true)
  }, [props.match.params.query])

  React.useEffect(() => {
    if (props.videoPlayer.type !== MINI) props.removeVideoPlayer();
    props.fetchSideBarOne();
    return () => {
      props.updatePrevPath(props.match.path);
    }
  }, []);


  function fetchThumbnails() {
    const queryLimit = 10;
    props.requestSearchVideos(
      props.match.params,
      queryLimit,
      queryOffset.current
    ).then(() => {
      queryOffset.current += queryLimit;
    }).always(() => setIsFetching(false))
  }


  return (
    <div
      className={[
        'max-width-height',
        'main-content--container',
        props.sideNav.toggled ? "main-content--toggled" : ""
      ].join(" ")}>
      <div className='flex-horizontal--style-2 src-vid-lst-ctn'>
        <ul className='flex-vertical--style-4 src-vid-lst'>
          {
            props.videos.map(video =>
              <VideoThumbnail
                key={video.id}
                video={video}
                type='SEARCHPAGE' />
            )
          }
        </ul>
      </div>
    </div>
  )
}


export default Search;