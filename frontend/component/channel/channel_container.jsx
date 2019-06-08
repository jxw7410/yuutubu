import { connect } from 'react-redux';
import { sideBarOne } from '../../actions/nav_bar_action';
import Channel from './channel';


const msp = (state, props) => {
    const channel = state.entities.channels[props.match.params.channel_id] || {}
    //debugger
    return {
        channel,
        userId: state.session.id,
        isLogin: Boolean(state.session.id),
        navBar: state.ui.navBars
    }
}

const mdp = dispatch => {
    return {
        sideBarOne: () => dispatch(sideBarOne())
    }
}


export default connect(msp, mdp)(Channel);