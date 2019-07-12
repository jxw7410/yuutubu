import React from 'react';
import {convertDurationToTime} from '../../util/selectors';


class DefaultControlUI extends React.Component {

    getVolumeButton(){
        let volumeType;
        if (parseFloat(this.props.volumeValue) === 0)
            volumeType = 'volume_off';
        else if (this.props.volumeValue > 0.5)
            volumeType = 'volume_up';
        else
            volumeType = 'volume_down';
        
        return <div className='icon-wrapper'>
                <i onClick={this.props.handleMute} className="material-icons volume-icon">{volumeType}</i>
                <div className='icon-message icon-position-left'>{volumeType === 'volume_off' ? 'Unmute' : 'Mute'}</div>
            </div>
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
                <div className="icon-wrapper" onClick={this.props.normalScreen}>
                    <i className="material-icons-enlarged">fullscreen_exit</i>
                    <div className='icon-message icon-position-right'>Exit Full Screen</div>
                </div>
                :
                <div className="icon-wrapper" onClick={this.props.maximizeScreen}>
                    <i className="material-icons-enlarged">fullscreen</i>
                    <div className='icon-message icon-position-right'>Full Screen</div>
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
                            <div className='volume-control-bar-wrapper'>
                                <div id='volume-control-bar'>{this.getVolumeControl()}</div>
                            </div>
                        </div>
                    
                    <div id='video-time'>
                        <div>{convertDurationToTime(this.props.currentTime)} / {convertDurationToTime(this.props.duration)}</div>
                    </div>
                </section>

                <section>
                    <div onClick={this.props.handleMiniScreen} className='icon-wrapper'> 
                        <i className="material-icons">picture_in_picture_alt</i>
                        <div className='icon-message icon-position-right'>Miniplayer</div>
                    </div>
                    { this.getFullScreen()}
                </section>
            </div>
        )
    }
}

export default DefaultControlUI;