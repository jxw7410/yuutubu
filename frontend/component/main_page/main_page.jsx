import React from 'react';
import ChannelIndex from './channel_index_ctn';
import RecommendedVideos from './recommended_video';
import { MINI } from '../../util/constants';
import { useInfiniteScrolling } from '../../util/custom_hooks';

const MainPage = props => {
  const [isFetchingRef, setIsFetching] = useInfiniteScrolling(fetchChannels)
  const queryOffset = React.useRef(0);
  

  React.useEffect(() => {
    props.clearChannels();
    props.sideBarOne();
    if (props.videoPlayer.type !== MINI) props.removeVideoPlayer();
    fetchChannels();
    return () => {
      props.clearChannels();
      props.updatePrevPath(props.match.path);
    }
  }, []);

  function fetchChannels(){
    const queryLimit = 4;
    props.fetchChannels(queryOffset.current, queryLimit)
      .then( () => {
        queryOffset.current += 4;
        setIsFetching(false);
      })
      .fail( () => {
        setIsFetching(false);
      });
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