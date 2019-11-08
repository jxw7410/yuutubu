import React from 'react';
import VideoThumbnail from '../thumbnail/video_thumbnail';
import { MINI } from '../../util/constants';

const Search = props => {
  const queryOffset = React.useRef(0);
  const fetching = React.useRef(false);
  const page = React.useRef(document.querySelector('html'));

  React.useEffect(() => {
    props.clearVideos();
    if (props.videoPlayer.type !== MINI) props.removeVideoPlayer();
    props.fetchSideBarOne();
    return () => props.updatePrevPath(props.match.path);
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      const queryLimit = 10;
      await props.updateSearchHistory(props.match.params);
      await props.requestSearchVideos(
        props.match.params,
        queryLimit,
        queryOffset.current
      );
      queryOffset.current += 10;
      document.addEventListener('scroll', scrollPagination);
    }
    fetchData();
    return () => document.removeEventListener('scroll', scrollPagination);
  }, [])


  function scrollPagination(e) {
    e.preventDefault();
    const scrollLimit = page.current.scrollTop + page.current.offsetHeight === page.current.scrollHeight;
    if (scrollLimit && !fetching.current) {
      const queryLimit = 10;
      fetching.current = true;
      props.requestSearchVideos(
        props.match.params,
        queryLimit,
        queryOffset.current
      ).then(() => {
        queryOffset.current += 10;
        fetching.current = false;
      }).fail(() => {
        document.removeEventListener('scroll', scrollPagination);
      })
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
            props.videos.map( video => 
              <VideoThumbnail
                key={video.id}
                video={video}
                type='search-page' />
              )
          }
        </ul>
      </div>
    </div>
  )


}


export default Search;