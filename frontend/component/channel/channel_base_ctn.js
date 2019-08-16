import { connect } from 'react-redux';
import ChannelBase from './channel_base';
import {fetchChannelVideos, fetchVideo, clearChannelVideos} from '../../actions/video/video_action'
import {getChannelVideos} from '../../util/selectors';


const msp = (state, props) => {
    return {
        videos: getChannelVideos(parseInt(props.channelId), Object.values(state.entities.videos))
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

