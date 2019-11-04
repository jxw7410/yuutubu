import React from 'react'
import SubscribeButton from '../subscribe/subscribe_button';
import ChannelHeaderNav from './channel_header_nav';

const ChannelHeader = props => {
  return (
    <>
      <div className="ch-hdr flexv-1">
        <div className='ch-hdr-wrap flexh-6'>
          <div className='flexh-7'>
            <i className='fas fa-user-circle chr-prf-i' />
            <span id='chprf-i' className='flexv-4'>
              <span>{props.channel.name}</span>
              <span>{props.channel.subscriptionCount} subscribers</span>
            </span>
          </div>
          <div className='flexh-1'>{
            props.isOwnerOfChannel ? null :
              <SubscribeButton channel={props.channel} />
          }
          </div>
        </div>
      </div>      
      <ChannelHeaderNav />
    </>
  )
}



export default ChannelHeader;