import React from 'react';
import { Link } from 'react-router-dom';


const VideoInfoHeader = props => {
    //debugger
    return (
        <div id='video-info-header'>
            <section>{props.videoTitle}</section>
            <section>
                <span>0 Views</span>
                <span>Likes Dislikes</span>
            </section>
        </div>
    )
}


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
                        <span id="vid-video-date">{props.videoDate}</span>
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



export default  props => {
    return (
        <>
            <VideoInfoHeader {...props} />
            <VideoInfoBody {...props} />
        </>
    )
}