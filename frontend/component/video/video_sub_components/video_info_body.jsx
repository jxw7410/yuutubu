import React from 'react';
import { Link, withRouter } from 'react-router-dom';


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
                        <span id="vid-video-date">{props.video.created_at}</span>
                    </div>

                    <div>
                        <button id="subscribe-button"> SUBSCRIBE </button>
                    </div>
                </div>
            </section>

            <section>
                <div></div>
                <div id="video-description">
                    {props.videoDescription}
                </div>
            </section>
        </div>
    )
}

export default VideoInfoBody;