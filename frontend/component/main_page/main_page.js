import React from 'react';
import ChannelIndex from './channel_index_ctn';
import Recommendation from './recommendation';
import { MINI } from '../../util/constants';
import { useInfiniteScrolling } from '../../util/custom_hooks';

const MainPage = props => {
  const [isFetching, setIsFetching] = useInfiniteScrolling(fetchChannels)
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
      .then( () => queryOffset.current += queryLimit)
      .always(() => setIsFetching(false));
  }
 
  return (
    <div className={[
        'max-width-height',
        'main-content--container',
        props.navBar.toggled ? "main-content--toggled" : ""
      ].join(' ')}>

      <div className='main-content'>
        <div className='flex-vertical--style-1'>
          <Recommendation />
          <ul className='channel-list'>
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