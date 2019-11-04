import React from 'react';
import AllVideosContainer from './all_vid_ctn';
import ChannelHeaderContainer from './channel_header_ctn';
import { MINI } from '../../util/constants'

const Channel = props => {
  React.useEffect( () => {
    props.sideBarOne();
    if (props.videoPlayer.type !== MINI)
      props.removeVideoPlayer();

    return () => props.updatePrevPath(props.match.path);
  }, []);


  React.useEffect(() => {
    if(props.match.params.channel_id)
      props.fetchChannel(props.match.params.channel_id);
  }, [props.match.params.channel_id])


  return (
    <div className ={`
      max-w-h ch-mn-ctnt-grid
      ${props.isNavToggled ? 'cmcg-tgl' : ""}`}>
      <div className='ch-mn-ctnt'>
        <div className="ch-mn-ctnt-wrap">
          <ChannelHeaderContainer />
          <AllVideosContainer key={ props.match.params.channel_id }/>
        </div>
      </div>
    </div>
  )
}


export default Channel;