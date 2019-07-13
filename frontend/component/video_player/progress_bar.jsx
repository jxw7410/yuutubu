import React from 'react';

const ProgressBar = props => {
    return (
        <div id='progress-bar' 
            onMouseMove={props.hoverProgressBar}
            onMouseLeave={props.leaveProgressBar}>
            <div ref ={props.streamBar} id='user-streamed' />
            <div id='buffer-streamed' style={{ width: props.bufferStream + "%" }} />
            <div id='hover-bar' style={{width: props.hoverBarLength, maxWidth: props.maxHoverBarLength}} />
            <input ref={props.seeker} id='seeker-bar' type='range' 
                onMouseDown={props.handleSeekingClick}
                onMouseUp={props.handleSeekingClick}    
                onClick={e => e.stopPropagation()}
                onInput={props.handleSeeking}
                onChange={props.handleSeeking}
                step={0.05}
            />
        </div>

    )
}


export default ProgressBar