import React from 'react';
import { connect } from 'react-redux';
import ChannelBase from './channel_base';
import {fetchChannelVideos, fetchVideo, clearChannelVideos} from '../../actions/video/video_action'


const msp = (state, props) => {
    return {
        videos: Object.values(state.entities.videos)
    }
}


const mdp = dispatch => {
    return {
        fetchChannelVideos:  (channel_id, limit, offset) => dispatch( fetchChannelVideos(channel_id, limit, offset) ),
        fetchVideo: video_id => dispatch( fetchVideo(video_id)),
        clearChannelVideos: () => dispatch (clearChannelVideos())
    }   
}


export default connect(msp,mdp)(ChannelBase);

