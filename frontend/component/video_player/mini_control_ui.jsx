import React from 'react';
import { convertDurationToTime } from '../../util/selector';

const MiniControlUI = props => {
    return (
        <div id='mini-control-ui'>
            <div> 
                {/* Replace later with the google material io X */}
                <i className="material-icons">
                    close</i>
            </div>
            <div> 
                {props.playButton}
            </div>
            <div id='video-time'>
                <span>{convertDurationToTime(props.currentTime)} / {convertDurationToTime(props.duration)}</span>
            </div>
        </div>
    )
}


export default MiniControlUI;