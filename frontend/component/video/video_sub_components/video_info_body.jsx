import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import SubscribeButton from '../../subscribe/subscribe_button';
import {connect} from 'react-redux';

const VideoInfoBody = props => {
    return (
        <div id='video-info-body'>
            <section>
                <div id='channel-user-profile-pic'>
                    <i className="fas fa-user-circle"></i>
                </div>

                <div id='video-info-body-header'>
                    <div>
                        <Link to={`/channel/${props.channel.id}`} id="vid-channel-name">{props.channel.name}</Link>
                        <span id="vid-video-date">Published on {props.video.created_at}</span>
                    </div>

                    <div>
                        {   
                            props.channel.user_id === parseInt(props.video.id) ? null :
                                <SubscribeButton 
                                    channel={props.channel}
                                />
                        }
                    </div>
                </div>
            </section>

            <section>
                <div></div>
                <div id="video-description">
                    {props.video.description}
                </div>
            </section>
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