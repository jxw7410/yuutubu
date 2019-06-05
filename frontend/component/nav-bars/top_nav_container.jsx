import { connect } from 'react-redux';
import TopNav from './top_nav';
import { logOut } from '../../actions/session/session_action'
import {withRouter} from 'react-router-dom'
import { openModal } from '../../actions/modal_action';

const msp = (state, props) => {
    return{
        isLoggedIn: Boolean(state.session.id),
        handleToggled: props.handleToggled
    }
}
 
const mdp = dispatch => {
    return {
        logOut: () => dispatch(logOut()),
        openModal: modal => dispatch(openModal(modal)),

    }
}


export default withRouter(connect(msp, mdp)(TopNav));