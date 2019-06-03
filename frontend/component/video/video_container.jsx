import React from 'react';
import Video from './video';
import { connect } from 'react-redux'
import {fetchChannel} from '../../actions/channel/channel_action'



const msp = (state, props) => {
    const video = state.entities.videos[props.match.params.video_id] || {}
    //debugger
    return {
        video,
        channels: state.entities.channels
    }
}

const mdp = dispatch => {
    return {
        fetchChannel: channel_id => dispatch(fetchChannel(channel_id)),
    }
}

export default connect(msp, mdp)(Video);