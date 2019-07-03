import React from 'react';
import {convertDurationToTime} from '../../util/selectors';


class DefaultControlUI extends React.Component {

    getVolumeButton(){
        let volumeButton;
        if (parseFloat(this.props.volumeValue) === 0)
            volumeButton = <i onClick={this.props.handleMute} className="material-icons">volume_off</i>
        else if (this.props.volumeValue > 0.5)
            volumeButton = <i onClick={this.props.handleMute} className="material-icons">volume_up</i>
        else
            volumeButton = <i onClick={this.props.handleMute} className="material-icons">volume_down</i>
        
        return volumeButton;
    }

    getVolumeControl(){
        return (
            <>
                <div id='volume-control-track' style={{width: `${this.props.volumeTrackLength}px`}}/>
                <input id='volume-control' type="range" min="0" max="1" step="0.1" value={this.props.volumeValue}
                    onMouseDown={e => e.stopPropagation()}
                    onClick={e => e.stopPropagation()}
                    onChange={this.props.handleVolumeChange} />
            </>
        )
    }
    
    getFullScreen(){
        return (
            this.props.isFullScreen ?
                <div onClick={this.props.normalScreen}>
                    <i className="material-icons">fullscreen_exit</i>
                </div>
                :
                <div onClick={this.props.maximizeScreen}>
                    <i className="material-icons">fullscreen</i>
                </div>
        )
    }


    render(){
        return (    
            <div id='video-control-ui'>
                <section id='left-control-ui'>
                    <div id='play-pause-hook'> {this.props.playButton} </div>
                    <div id='volume-control-div'> 
                        {this.getVolumeButton()}
                        <div id='volume-control-bar'>{this.getVolumeControl()}</div>
                    </div>

                    <div id='video-time'>
                        <div>{convertDurationToTime(this.props.currentTime)} / {convertDurationToTime(this.props.duration)}</div>
                    </div>
                </section>

                <section>
                    <div onClick={this.props.handleMiniScreen}> <i className="material-icons"> branding_watermark</i></div>
                    { this.getFullScreen()}
                </section>
            </div>
        )
    }
}

export default DefaultControlUI;