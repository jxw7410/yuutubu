import { connect } from 'react-redux';
import ChannelIndex from './channel_Index';
import { fetchChannels } from '../../actions/channel/channel_action';

const msp = state => {
    return {
        channels: Object.values(state.entities.channels),
        user_id: state.session.id
    }
}


const mdp = dispatch => {
    return {
        fetchChannels: (offset, num, user_id) => dispatch( fetchChannels(offset, num, user_id))
    }
}


export default connect(msp, mdp)(ChannelIndex)