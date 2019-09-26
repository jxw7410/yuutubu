import React, { useState } from 'react';

const ProgressBar = props => {

  const [state, setState] = useState({
    hoverBarLength: 0,
    maxHoverBarLength: 0,
  });


  // Because setState from hooks overwrites, not merge, so a closed function is
  // needed
  const mergeState = newState => {
    setState(Object.assign({}, state, newState))
  }


  const hoverProgressBar = e => {
    let { x, width } = e.currentTarget.getBoundingClientRect();

    if (width != state.maxHoverBarLength)
      mergeState({
        hoverBarLength: e.clientX - x,
        maxHoverBarLength: width
      });
    else
      mergeState({ hoverBarLength: e.clientX - x })
  }

  const leaveProgressBar = e => {
    e.preventDefault();
    mergeState({ hoverBarLength: 0 })
  }



  return (
    <div className='progress-bar flexh-3'
      onMouseMove={hoverProgressBar}
      onMouseLeave={leaveProgressBar}>
      <div ref={props.streamBar} className='user-stream' />
      <div className='buffer-stream' style={{ width: props.bufferStream + "%" }} />
      <div className='hover-bar' style={{ width: state.hoverBarLength, maxWidth: state.maxHoverBarLength }} />
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