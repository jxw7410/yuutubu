import React, { useEffect } from 'react';
import VideoThumbnail from '../thumbnail/video_thumbnail';


const AllVideos = props => {
  const offset = React.useRef(0);
  const fetching = React.useRef(false);
  const pageRef = React.useRef(null);

  useEffect(() => {
    props.clearChannelVideos();
    props.fetchChannelVideos(props.channelId, 24, offset.current)
      .then(() =>  offset.current += 24 )
      .then(() => {
        pageRef.current = document.querySelector('html');
        document.addEventListener('scroll', handleScrollEvent)
      });

    return () => {
      document.removeEventListener('scroll', handleScrollEvent);
      props.clearChannelVideos();
    }

  }, [])

  const handleScrollEvent = e => {
    const page = pageRef.current;
    const scrollLimit = page.scrollTop + page.offsetHeight === page.scrollHeight;
    if (scrollLimit && !fetching.current) {
      fetching.current = true;
      props.fetchChannelVideos(props.channelId, 12, offset.current)
        .then(() => {
          fetching.current = false;
          offset.current += 12
        }).fail(err => {
          if (err.status === 404) 
            document.removeEventListener('scroll', handleScrollEvent);
        })
    }
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
          <div className='flexv-3 cvc-lower' >
            <div className={`
              flexh-3 cvc-nav 
              ${props.isNavToggled ? "" : "cvc-nav-tgl"}`}> Uploads </div>

            <ul className={`
              usr-av-lst  
              ${props.isNavToggled ? "" : "uav-lst-tgl"}`}>
              {
                props.videos.map(video => 
                  <VideoThumbnail
                    key={video.id}
                    video={video}
                    handleClick={redirectOnClick(video.id)}
                    channel={{}} /> )
              }
            </ul>
          </div >
          :
          <div style={{ width: '100%', height: '300px', gridRow: '4/5' }} className='flexh-1'>
            Looks like there are no contents in this channel yet.
          </div>
      }
    </>
  )

}

export default AllVideos;