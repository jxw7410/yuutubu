import React, { useEffect } from 'react';
import VideoThumbnail from '../thumbnail/video_thumbnail_container';
import { useInfiniteScrolling } from '../../util/custom_hooks';


const AllVideos = props => {
  const [isFetching, setIsFetching] = useInfiniteScrolling(fetchVideos)
  const queryOffset = React.useRef(0);

  useEffect(() => {
    props.clearChannelVideos();
    fetchVideos();
  }, [])


  function fetchVideos(){
    const queryLimit = 24;
    props.fetchChannelVideos(props.channelId, queryLimit, queryOffset.current)
      .then(() => queryOffset.current += queryLimit)
      .always(() => setIsFetching(false))
  }


  const redirectOnClick = videoId => {
    return e => {
      e.preventDefault();
      props.history.push(`/video/${videoId}`)
    }
  }


  return (
    <>
      {
        props.videos.length ?
          <div className='flex-vertical--style-3 channel-video--container-lower' >
            <div className={`
              flex-horizontal--style-3 channel-video--nav 
              ${props.isNavToggled ? "" : "channel-video--nav-toggle"}`}> Uploads </div>

            <ul className='channel-videos-list'>
              {
                props.videos.map(video =>
                  <VideoThumbnail
                    key={video.id}
                    video={video}
                    handleClick={redirectOnClick(video.id)}
                    channel={{}} />)
              }
            </ul>
          </div >
          :
          <div style={{ width: '100%', height: '300px', gridRow: '4/5' }} className='flex-horizontal--style-1'>
            Looks like there are no contents in this channel yet.
          </div>
      }
    </>
  )

}

export default AllVideos;