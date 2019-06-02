import React from 'react'


//Div soup hell
const ChannelHeader = props =>{
    return (
        <div id='channel-header'>
            <div id='channel-header-msc-grid-hook'>
                <div id="channel-header-msc">
                    <div id='channel-header-profile'>
                        <i className="fas fa-user-circle" />
                        <span id='channel-header-profile-info'>
                            <span>{props.channel.name}</span>
                            <span>0 subscribers</span>
                        </span>
                    </div>
                    <div id='channel-header-buttons'>
                        {
                            props.channel.user_id !== parseInt(props.userId) ?
                            <button id="subscribe-button"> SUBSCRIBE </button> : null
                        }
                    </div>
                </div>
            </div>
            <div id="channel-header-nav">
                <ul>
                    <li
                        onClick={props.redirectEvent(null, 1)}
                        className={props.active_tab === 1 ? 'channel_tab_active' : null}>
                        HOME
                    </li>

                    <li
                        onClick={props.redirectEvent('/videos', 2)}
                        className={props.active_tab === 2 ? 'channel_tab_active' : null}>
                        VIDEOS
                    </li>

                    <li > PLAYLISTS </li>
                    <li > CHANNELS </li>
                    <li > DISCUSSION </li>
                    <li > ABOUT </li>
                </ul>

            </div>
        </div>
    )
}

export default ChannelHeader