import React, { useEffect } from 'react';
import ChannelIndex from './channel_index_ctn';
import RecommendedVideos from './recommended_video';
import { MINI } from '../../util/constants';

const MainPage = props => {
  let offset = 0;
  let fetching = false;
  let page;

  useEffect(() => {
    props.clearChannels();
    props.sideBarOne();
    if (props.videoPlayer.type !== MINI) {
      props.removeVideoPlayer();
    }
    props.fetchChannels(offset, 1)
      .then(() => offset += 4)
      .then(() => {
        page = document.querySelector('html');
        document.addEventListener('scroll', handleScrollEvent);
      }
      );
    // willUnmount portion
    return () => {
      document.removeEventListener('scroll', handleScrollEvent);
      props.clearChannels();
      props.updatePrevPath(props.match.path);
    }
  }, []);


  function handleScrollEvent(e){
    e.preventDefault();
    const scrollLimit = (page.scrollTop + page.offsetHeight === page.scrollHeight);
    if (scrollLimit && !fetching) {
      fetching = true;
      props.fetchChannels(offset, 3)
        .then(() => {
          offset += 3;
          fetching = false;
        })
        .fail(() => document.removeEventListener('scroll', handleScrollEvent))
    }
  }

  // Style constants 
  const mainCtnClass = `max-w-h main-ctnt-ctn ${props.navBar.toggled ? "mn-cc-tgl" : ""}`
  return (
    <div className={mainCtnClass}>
      <div className='main-ctnt'>
        <div className='flexv-1'>
          <RecommendedVideos />
          <ul className='ch-list'>
            {
              props.channels.map(channel => <ChannelIndex key={channel.id} channel={channel} />)
            }
          </ul>
        </div>
      </div>
    </div>
  )
}


export default MainPage;