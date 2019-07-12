import React from 'react';

const ProgressBar = props => {
    const width = props.userStream.toFixed(4);
    return (
        <div id='progress-bar' 
            onMouseMove={props.hoverProgressBar}
            onMouseLeave={props.leaveProgressBar}>
            <div id='user-streamed' style={{ width: width + '%'}} />
            <div id='buffer-streamed' style={{ width: props.bufferStream + "%" }} />
            <div id='hover-bar' style={{width: props.hoverBarLength, maxWidth: props.maxHoverBarLength}} />
            <input ref={props.seeker} id='seeker-bar' type='range' value={width}
                onMouseDown={props.handleSeekingClick}
                onMouseUp={props.handleSeekingClick}    
                onClick={e => e.stopPropagation()}
                onChange={props.handleSeeking}
                step={0.02}
            />
        </div>

    )
}


export default ProgressBar