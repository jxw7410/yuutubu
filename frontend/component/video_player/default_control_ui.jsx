import React from 'react';
import {convertDurationToTime} from '../../util/selectors';
const DefaultControlUI = props => {
    return (
        <div id='video-control-ui'>
            <section id='left-control-ui'>
                <div id='play-pause-hook'>
                    {props.playButton}
                </div>

                <div id='volume-control-div'>
                    <i
                        onClick={e => e.stopPropagation()}
                        className="material-icons">volume_up</i>

                    <input id='volume-control' type="range" min="0" max="1" step="0.1" value={props.volumeValue}
                        onMouseDown={e => e.stopPropagation()}
                        onClick={e => e.stopPropagation()}
                        onChange={props.handleVolumeChange} />
                </div>

                <div id='video-time'>
                    <span>{convertDurationToTime(props.currentTime)} / {convertDurationToTime(props.duration)}</span>
                </div>
            </section>

            <section>
                <div onClick={props.handleMiniScreen}>
                    <i className="material-icons">
                        branding_watermark</i>
                </div>
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