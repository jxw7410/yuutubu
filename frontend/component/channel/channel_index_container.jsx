import { connect } from 'react-redux';
import ChannelIndex from './channel_list';
import { fetchChannels, clearChannels } from '../../actions/channel/channel_action';

const msp = state => {
    return {
        channels: Object.values(state.entities.channels),
        user_id: state.session.id
    }
}


const mdp = dispatch => {
    return {
        fetchChannels: (offset, num, user_id) => dispatch( fetchChannels(offset, num, user_id)),
        clearChannels: () => dispatch( clearChannels() )
    }
}


export default connect(msp, mdp)(ChannelIndex)