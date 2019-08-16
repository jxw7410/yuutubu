import React from 'react';
import { convertDurationToTime } from '../../util/selectors';

const MiniControlUI = props => {
    return (
        <div className='mini-ctrl-ui max-w-h flexv-9' onClick={props.handleGoBack}>
            <div> 
                <i onClick={ (e) => {
                            e.stopPropagation();
                            props.closeButton();
                        }
                    } 
                    className="material-icons">
                    close</i>
            </div>
            <div className='flexh-1'> 
                <div className='mini-scn-ply-btn flexh-1'>
                    {props.playButton}
                </div>
            </div>
            <div className='vid-time'>
                <div>{convertDurationToTime(props.currentTime)} / {convertDurationToTime(props.duration)}</div>
            </div>
        </div>
    )
}


export default MiniControlUI;