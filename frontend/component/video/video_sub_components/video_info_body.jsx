import React from 'react';
import { Link } from 'react-router-dom';
import SubscribeButton from '../../subscribe/subscribe_button';
import { connect } from 'react-redux';
import Description from './description';


const render = (expanded, reference, description) => {
    return (
        <section>
            <div />
            <div className={"video-description" + (expanded ? " expanded" : "")}>
                <span ref={reference} className='post-description'>{description}</span>
            </div>
        </section>
    )
}

const readMore = (expanded, handleReadMore) => {
    return (
        <section>
            <div />
            <div id='video-info-body-footer'>
                <span className='span-style-2' onClick={handleReadMore}>
                    {expanded ? 'Show less' : 'Show More'}
                </span>
            </div>
        </section>
    )
}
const videoInfoBodyHeader = props => {
    return (
        <div>
            <Link to={`/channel/${props.channel.id}`} id="vid-channel-name">{props.channel.name}</Link>
            <span id="vid-video-date">Published on {props.video.created_at}</span>
        </div>
    )
}

const subscribeButton = props => {
    return (
        < div >
            {
                props.channel.user_id === parseInt(props.video.id) ? null :
                    <SubscribeButton channel={props.channel} />
            }
        </div >
    )
}


const VideoInfoBody = props => {
    return (
        <div id='video-info-body'>
            <section>
                <div id='channel-user-profile-pic'> <i className="fas fa-user-circle" /> </div>
                <div id='video-info-body-header'>
                    {videoInfoBodyHeader(props)}
                    {subscribeButton(props)}
                </div>
            </section>

            <Description
                description={props.video.description}
                readMore={readMore}
                render={render}
                heightLimit={90} />
        </div>
    )
}

const msp = (state, props) => {
    const channel = state.entities.channels[props.channel.id] || {}
    return {
        channel
    }
}

export default connect(msp)(VideoInfoBody);