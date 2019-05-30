import { connect } from 'react-redux';
import SplashNav from './splash_nav';
import { logOut } from '../../../actions/session/session_action'
import {withRouter} from 'react-router-dom'
const msp = (state, props) => {
    return{
        isLoggedIn: Boolean(state.session.id)
    }
}
 
const mdp = dispatch => {
    return {
        logOut: () => dispatch(logOut()),

    }
}


export default connect(msp, mdp)(SplashNav);