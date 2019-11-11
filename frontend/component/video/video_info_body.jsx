import React from 'react';
import { Link } from 'react-router-dom';
import SubscribeButton from '../subscribe/subscribe_button';
import { connect } from 'react-redux';

const VideoInfoBody = props => {

  const render = (expanded, reference, description) => (
    <section>
      <div />
      <div className={"vid-desc" + (expanded ? " expd" : "")}>
        <span ref={reference} className='post-des'>{description}</span>
      </div>
    </section>
  )


  const readMore = (expanded, handleReadMore) => (
    <section>
      <div />
      <div className='flexh-3'>
        <span className='span-style-2' onClick={handleReadMore}>
          {expanded ? 'Show less' : 'Show More'}
        </span>
      </div>
    </section>
  )


  const videoInfoBodyHeader = () => (
    <div className='flexv-4'>
      <Link to={`/channel/${props.channel.id}`} className='vid-ch-name'>{props.channel.name}</Link>
      <span className="vid-date">Published on {props.video.created_at}</span>
    </div>
  )


  const subscribeButton = () => (
    <div>
      {
        props.channel.id === parseInt(props.user.channel_id) ? null :
          <SubscribeButton channel={props.channel} />
      }
    </div >
  )


  return (
    <div className='vid-info-bd'>
      <section>
        <div className='ch-usr-prf-pic'> <i className="fas fa-user-circle" /> </div>
        <div className='vid-info-bd-hdr flexh-5'>
          {videoInfoBodyHeader()}
          {subscribeButton()}
        </div>
      </section>
{/* 
      <Description
        description={props.video.description}
        readMore={readMore}
        render={render}
        heightLimit={90} /> */}
    </div>
  )
}

const msp = (state, props) => {
  const channel = state.entities.channels[props.channel.id] || {}
  return {
    channel,
    user: state.session
  }
}

export default connect(msp)(VideoInfoBody);