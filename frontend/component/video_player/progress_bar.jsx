import React from 'react';

const ProgressBar = props => {
    const width = props.userStream.toFixed(4);
    return (
        <div id='progress-bar'>
            <div id='user-streamed' style={{ width: width + '%'}} />
            <div id='buffer-streamed' style={{ width: props.bufferStream + "%" }} />

            <input id='seeker-bar' type='range' value={width}
                onMouseDown={e => e.stopPropagation()}
                onClick={e => e.stopPropagation()}
                onChange={props.handleSeeking}
                step={0.02}
            />
        </div>

    )
}


export default ProgressBar