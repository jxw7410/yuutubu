import React from 'react'
import SubscribeButton from '../subscribe/subscribe_button';
import ChannelHeaderNav from './channel_header_nav';

const ChannelHeader = React.memo( props => {
  return (
    <>
      <div className="channel-header flex-vertical--style-1">
        <div className='channel-header-wrap flex-horizontal-style-6'>
          <div className='flex-horizontal--style-7'>
            <i className='fas fa-user-circle channel-header--profile-icon' />
            <span id='channel-profile-icon' className='flex-vertical--style-4'>
              <span>{props.channel.name}</span>
              <span>{props.channel.subscriptionCount} subscribers</span>
            </span>
          </div>
          <div className='flex-horizontal--style-1'>
            <SubscribeButton channel={props.channel} />
          </div>
        </div>
      </div>      
      <ChannelHeaderNav />
    </>
  )
});



export default ChannelHeader;