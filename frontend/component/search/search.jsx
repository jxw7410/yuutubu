import React from 'react';
import VideoThumbnail from '../thumbnail/video_thumbnail';
import { MINI } from '../../util/constants';

const Search = props => {
  const queryOffset = React.useRef(0);
  const currentQuery = React.useRef(null); /* This is for the scroll event handler */
  const fetching = React.useRef(false);
  const page = React.useRef(document.querySelector('html'));

  React.useEffect(() => {
    currentQuery.current = props.match.params.query;
    props.clearVideos();
    queryOffset.current = 0;
    fetchData();
  }, [props.match.params.query])

  React.useEffect(() => {
    if (props.videoPlayer.type !== MINI) {
      props.removeVideoPlayer();
    }
    props.fetchSideBarOne();
    document.addEventListener('scroll', scrollPagination)
    return () => {
      props.updatePrevPath(props.match.path);
      document.removeEventListener('scroll', scrollPagination);
    }
  }, []);


  async function fetchData() {
    if (!fetching.current) {
      fetching.current = true;
      const queryLimit = 10;
      await props.updateSearchHistory(props.match.params);
      await props.requestSearchVideos(
        props.match.params,
        queryLimit,
        queryOffset.current
      );
      fetching.current = false;
      queryOffset.current += 10;
    }
  }

  function scrollPagination(e) {
    e.preventDefault();
    const scrollLimit = page.current.scrollTop + page.current.offsetHeight === page.current.scrollHeight;
    if (scrollLimit && !fetching.current) {
      const queryLimit = 10;
      fetching.current = true;
      props.requestSearchVideos(
        { query: currentQuery.current },
        queryLimit,
        queryOffset.current
      ).then(() => {
        queryOffset.current += 10;
        fetching.current = false;
      }).fail(() =>
        fetching.current = false
      )
    }
  }


  return (
    <div className={[
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