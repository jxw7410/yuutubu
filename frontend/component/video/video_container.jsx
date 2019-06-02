import React from 'react';
import Video from './video';
import { connect } from 'react-redux'



const msp = (state, props) => {
    const video = state.entities.videos[props.match.params.video_id] || {}
    debugger
    return {
        video
    }
}

export default connect(msp)(Video);