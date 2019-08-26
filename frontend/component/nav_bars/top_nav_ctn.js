import { connect } from 'react-redux';
import TopNav from './top_nav';
import { logOut } from '../../actions/session/session_action'
import {withRouter} from 'react-router-dom'
import { openModal } from '../../actions/modal/modal_action';
import { toggleSideBar } from '../../actions/nav/nav_bar_action';

const msp = (state) => ({
        isLoggedIn: Boolean(state.session.id),
})
 
const mdp = dispatch => ({
        logOut: () => dispatch(logOut()),
        openModal: modal => dispatch(openModal(modal)),
        toggleSideBar: () => dispatch(toggleSideBar())
})


export default withRouter(connect(msp, mdp)(TopNav));