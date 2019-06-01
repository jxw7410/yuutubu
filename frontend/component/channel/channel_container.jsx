import { connect } from 'react-redux';
import Channel from './channel';

const msp = (state, props) => {
    const channel = state.entities.channels[props.match.params.channel_id] || {}
    return {
        channel,
        userId: state.session.id,
        isLogin: Boolean(state.session.id),

    }
}


export default connect(msp)(Channel);