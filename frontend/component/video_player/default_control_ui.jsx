import React from 'react';
import {convertDurationToTime} from '../../util/selectors';
const DefaultControlUI = props => {
    let volumeButton;
    
    if (parseFloat(props.volumeValue) === 0 ){
        volumeButton = <i onClick={props.handleMute} className="material-icons">volume_off</i>
    }
    else if (props.volumeValue > 0.5)
        volumeButton = <i onClick={props.handleMute} className="material-icons">volume_up</i>
    else   
        volumeButton = <i onClick={props.handleMute} className="material-icons">volume_down</i>

    return (    
        <div id='video-control-ui'>
            <section id='left-control-ui'>
                <div id='play-pause-hook'> {props.playButton} </div>

                <div id='volume-control-div'>
                    {volumeButton}

                    <input id='volume-control' type="range" min="0" max="1" step="0.1" value={props.volumeValue}
                        onMouseDown={e => e.stopPropagation()}
                        onClick={e => e.stopPropagation()}
                        onChange={props.handleVolumeChange} />
                </div>

                <div id='video-time'>
                    <div>{convertDurationToTime(props.currentTime)} / {convertDurationToTime(props.duration)}</div>
                </div>
            </section>

            <section>
                <div onClick={props.handleMiniScreen}> <i className="material-icons"> branding_watermark</i></div>
                {
                     props.isFullScreen ?
                        <div onClick={props.normalScreen}>
                            <i className="material-icons">fullscreen_exit</i>
                        </div>
                        :
                        <div onClick={props.maximizeScreen}>
                            <i className="material-icons">fullscreen</i>
                        </div>
                }
            </section>
        </div>
    )
}

export default DefaultControlUI;