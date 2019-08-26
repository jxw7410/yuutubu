import React from 'react';
import { connect } from 'react-redux';
import { fetchVideo } from '../../actions/video/video_action';
import VideoContainer from './video_ctn';
import VerifyRouter from '../../util/verify_route';


const VideoRouter = props => <VerifyRouter {...props} type="video" component={VideoContainer}/>

const mdp = dispatch => ({
        fetchResource: video_id => dispatch(fetchVideo(video_id)),
})

export default connect(null, mdp)(VideoRouter);