import React, { useEffect } from 'react';
import ChannelIndex from './channel_index_ctn';
import RecommendedVideos from './recommended_video';
import { MINI } from '../../util/constants';

const MainPage = props => {
  const queryOffset = React.useRef(0);
  const fetching = React.useRef(false);
  const page = React.useRef(document.querySelector('html'))

  useEffect(() => {
    props.clearChannels();
    props.sideBarOne();
    if (props.videoPlayer.type !== MINI) props.removeVideoPlayer();

    const queryLimit = 4;
    props.fetchChannels(queryOffset.current, queryLimit)
      .then(() => queryOffset.current += queryLimit)
      .then(() => {
        document.addEventListener('scroll', handleScrollEvent);
      });


    return () => {
      props.clearChannels();
      props.updatePrevPath(props.match.path);
      document.removeEventListener('scroll', handleScrollEvent);
    }
  }, []);



  function handleScrollEvent(e){
    e.preventDefault();
    const scrollLimit = page.current.scrollTop + page.current.offsetHeight === page.current.scrollHeight;
    if (scrollLimit && !fetching.current) {
      fetching.current = true;
      const queryLimit = 3;
      props.fetchChannels(queryOffset.current, queryLimit)
        .then(() => {
          queryOffset.current += queryLimit;
          fetching.current = false;
        })
        .fail(() => {
          document.removeEventListener('scroll', handleScrollEvent)
        });
    }
  }

  return (
    <div className={[
        'max-w-h',
        'main-ctnt-ctn',
        props.navBar.toggled ? "mn-cc-tgl" : ""
      ].join(' ')}>

      <div className='main-ctnt'>
        <div className='flexv-1'>
          {/* <RecommendedVideos /> */}
          <ul className='ch-list'>
            {
              props.channels.map(channel => 
                <ChannelIndex key={channel.id} channel={channel} />)
            }
          </ul>
        </div>
      </div>
    </div>
  )
}


export default MainPage;