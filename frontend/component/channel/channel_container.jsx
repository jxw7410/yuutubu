import { connect } from 'react-redux';
import Channel from './channel';

const msp = state => {
    return {
        username: state.session.username,
        isLogin: Boolean(state.session.id),

    }
}


export default connect(msp)(Channel);