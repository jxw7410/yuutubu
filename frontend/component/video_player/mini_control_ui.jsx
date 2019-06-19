import React from 'react';
import { convertDurationToTime } from '../../util/selectors';

const MiniControlUI = props => {
    return (
        <div id='mini-control-ui' onClick={props.handleGoBack}>
            <div> 
                {/* Replace later with the google material io X */}
                <i onClick={ (e) => {
                            e.stopPropagation();
                            props.closeButton();
                        }
                    } 
                    className="material-icons">
                    close</i>
            </div>
            <div> 
                <div id='mini-screen-play-button'>
                    {props.playButton}
                </div>
            </div>
            <div id='video-time'>
                <span>{convertDurationToTime(props.currentTime)} / {convertDurationToTime(props.duration)}</span>
            </div>
        </div>
    )
}


export default MiniControlUI;