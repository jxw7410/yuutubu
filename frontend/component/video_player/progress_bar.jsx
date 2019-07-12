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
            <input ref={props.seeker} id='seeker-bar' type='range' value={width} min="0" max="100"
                onMouseDown={props.handleSeekingClick}
                onMouseUp={props.handleSeekingClick}    
                onClick={e => e.stopPropagation()}
                onInput={props.handleSeeking}
                onChange={props.handleSeeking}
                step={1}
            />
        </div>

    )
}


export default ProgressBar