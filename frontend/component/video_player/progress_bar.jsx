import React from 'react';

const ProgressBar = props => {
    return (
        <div className='progress-bar flexh-3' 
            onMouseMove={props.hoverProgressBar}
            onMouseLeave={props.leaveProgressBar}>
            <div ref ={props.streamBar} className='user-stream' />
            <div className='buffer-stream' style={{ width: props.bufferStream + "%" }} />
            <div className='hover-bar' style={{width: props.hoverBarLength, maxWidth: props.maxHoverBarLength}} />
            <input ref={props.seeker} className='seeker-bar' type='range'  
                onClick={e => e.stopPropagation()}
                onInput={props.handleSeeking}
                onChange={props.handleSeeking}
                step={0.05}
            />
        </div>

    )
}


export default ProgressBar