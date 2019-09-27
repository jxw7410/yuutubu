import React, { useEffect, useRef } from 'react';
import VideoThumbnail from '../thumbnail/video_thumbnail';


const AllVideos = props => {
  let offset = 0;
  let fetching = false;
  let page;

  // This use Effect will function like componentDidMount, and willUnMount
  useEffect(() => {
    props.clearChannelVideos();
    props.setActiveTab(1);
    props.fetchChannelVideos(props.channelId, 24, offset)
      .then(() => offset += 24)
      .then(() => {
        page = document.querySelector('html');
        document.addEventListener('scroll', handleScrollEvent)
      });

    return () => {
      document.removeEventListener('scroll', handleScrollEvent);
      props.clearChannelVideos();
    }

  }, [])

  const handleScrollEvent = e => {
    e.preventDefault();
    // Checks if you hit the bottom of the page for new fetch
    const scrollLimit = (page.scrollTop + page.offsetHeight === page.scrollHeight);
    if (scrollLimit && !fetching) {
      fetching = true;
      props.fetchChannelVideos(props.channelId, 12, offset)
        .then(() => {
          fetching = false;
          offset += 12
        }).fail(err => {
          if (err.status === 404) {
            document.removeEventListener('scroll', handleScrollEvent);
          }
        })
    }
  }


  const redirectOnClick = video_id => {
    return e => {
      e.preventDefault();
      props.history.push(`/video/${video_id}`)
    }
  }

  // Logic to build css classes 
  const cvcNavClass = `flexh-3 cvc-nav ${props.toggledSideNav ? "" : "cvc-nav-tgl"}`;
  const usrAvListClass = `usr-av-lst  ${props.toggledSideNav ? "" : "uav-lst-tgl"}`;
  const videos = props.videos.map(video => (
    <VideoThumbnail
      key={video.id}
      video={video}
      handleClick={redirectOnClick(video.id)}
      channel={{}} />
  ));

  return (
    <>
      {
        videos.length ?
          <div className='flexv-3 cvc-lower' >
            <div className={cvcNavClass}> Uploads </div>
            <ul className={usrAvListClass}>
              {videos}
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