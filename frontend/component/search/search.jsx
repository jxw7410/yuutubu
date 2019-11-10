import React from 'react';
import VideoThumbnail from '../thumbnail/video_thumbnail';
import { MINI } from '../../util/constants';
import { useInfiniteScrolling } from '../../util/custom_hooks';

const Search = props => {
  const [isFetching, setIsFetching] = useInfiniteScrolling(fetchThumbnails);
  const queryOffset = React.useRef(0);

  React.useEffect(() => {
    queryOffset.current = 0;
    props.clearVideos();
    props.updateSearchHistory(props.match.params);
    if (!isFetching) {
    // The reason is because our Hook would deal with the fetching.
      setIsFetching(true)
    }
  }, [props.match.params.query])

  React.useEffect(() => {
    if (props.videoPlayer.type !== MINI) {
      props.removeVideoPlayer();
    }
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
      queryOffset.current += 10;
      setIsFetching(false);
    }).fail(() =>
      setIsFetching(false)
    )
  }


  return (
    <div
      className={[
        'max-w-h',
        'main-ctnt-ctn',
        props.sideNav.toggled ? "mn-cc-tgl" : ""
      ].join(" ")}>
      <div className='flexh-2 src-vid-lst-ctn'>
        <ul className='flexv-4 src-vid-lst'>
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