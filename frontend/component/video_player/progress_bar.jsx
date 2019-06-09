import React from 'react';

const ProgressBar = props => {
    return (
        <div id='progress-bar'>
            <div id='user-streamed' style={{ width: props.userStream + "%" }} />
            <div id='buffer-streamed' style={{ width: props.bufferStream + "%" }} />

            <input id='seeker-bar' type='range' value={props.seekerValue}
                onMouseDown={e => e.stopPropagation()}
                onClick={e => e.stopPropagation()}
                onChange={props.handleSeeking} onMouseUp={() => setTimeout(() => props.videoElement.play(), 0)}
            />
        </div>

    )
}


export default ProgressBar