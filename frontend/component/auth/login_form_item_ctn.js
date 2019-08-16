import { connect } from 'react-redux';
import { login, fetchEmail, defaultAction, clearEmail, raiseEmailError } from '../../actions/session/session_action';
import { removeNavBars } from '../../actions/nav_bar_action';
import { removeVideoPlayer } from '../../actions/video_player';
import LoginFormItem from './login_form_item';



const msp = state => ({
    email: state.session.email,
    errors: state.errors
})


const mdp = dispatch => ({
    login: user => dispatch(login(user)),
    fetchEmail: email => dispatch(fetchEmail(email)),
    raiseEmailError: () => dispatch(raiseEmailError()),
    defaultAction: () => dispatch(defaultAction()),
    clearEmail: () => dispatch(clearEmail()),
    removeNavBars: () => dispatch(removeNavBars()),
    removeVideoPlayer: () => dispatch(removeVideoPlayer())
})


export default connect(msp, mdp)(LoginFormItem)