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
        
        return <div className='i-wrap'>
                <i onClick={this.props.handleMute} className="material-icons volume-icon">{volumeType}</i>
                <div className='i-msg-v i-pos-lft'>{volumeType === 'volume_off' ? 'Unmute' : 'Mute'}</div>
            </div>
    }

    getVolumeControl(){
        return (
            <React.Fragment>
                <div className='vol-ctrl-track' style={{width: `${this.props.volumeTrackLength}px`}}/>
                <input className='vol-ctrl' type="range" min="0" max="1" step="0.05" value={this.props.volumeValue}
                    onMouseDown={e => e.stopPropagation()}
                    onClick={e => e.stopPropagation()}
                    onChange={this.props.handleVolumeChange} />
            </React.Fragment>
        )
    }
    
    getFullScreen(){
        return (
            this.props.isFullScreen ?
                <div className="i-wrap" onClick={this.props.normalScreen}>
                    <i className="material-icons-enlarged">fullscreen_exit</i>
                    <div className='i-msg-v i-pos-rgt'>Exit Full Screen</div>
                </div>
                :
                <div className="i-wrap" onClick={this.props.maximizeScreen}>
                    <i className="material-icons-enlarged">fullscreen</i>
                    <div className='i-msg-v i-pos-rgt'>Full Screen</div>
                </div>
        )
    }


    render(){
        return (    
            <div className='vid-ctrl-ui flexh-6'>
                <section className='flexh-3' style={{width:'auto'}}>
                    <div> {this.props.playButton} </div>
                        <div className='vol-ctrl-div flexh-3'> 
                            {this.getVolumeButton()}
                            <div className='vol-ctrl-bar-wrap flexh-3'>
                                <div className='vol-ctrl-bar'>{this.getVolumeControl()}</div>
                            </div>
                        </div>
                    
                    <div className='vid-time'>
                        <div className='max-w-h'>{convertDurationToTime(this.props.currentTime)} / {convertDurationToTime(this.props.duration)}</div>
                    </div>
                </section>

                <section className='flexh-3'>
                    <div onClick={this.props.handleMiniScreen} className='i-wrap'> 
                        <i style={{ margin: '0 5px'}} className="material-icons">picture_in_picture_alt</i>
                        <div className='i-msg-v i-pos-rgt'>Miniplayer</div>
                    </div>
                    { this.getFullScreen()}
                </section>
            </div>
        )
    }
}

export default DefaultControlUI;