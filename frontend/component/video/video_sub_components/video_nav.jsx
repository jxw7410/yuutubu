import React from 'react'
import TopNavContainer from '../../nav-bars/top_nav_container';

const VideoNav = (props) => {
    return (
        <div id='nav-bar-hook'>
            <div id='main-nav-bars-ctn'>
                <div id='top-nav-ctn'>
                    <TopNavContainer handleToggled={props.handleToggled} />
                </div>
            </div>
        </div>
    )
}

export default VideoNav;