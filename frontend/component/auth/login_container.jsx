import { connect } from 'react-redux';
import { login, fetchEmail, defaultAction, clearEmail, raiseEmailError } from '../../actions/session/session_action';
import { removeNavBars } from '../../actions/nav_bar_action';
import LoginForm from './login_form';



const msp = state => {
    return {
        email: state.session.email,
        errors: state.errors
    }
}

const mdp = dispatch => {
    return {
        login: user => dispatch(login(user)),
        fetchEmail: email => dispatch( fetchEmail(email) ),
        raiseEmailError: () => dispatch( raiseEmailError() ),
        defaultAction: () => dispatch( defaultAction()),
        clearEmail: () => dispatch( clearEmail()),
        removeNavBars: () => dispatch(removeNavBars()),
    };
};


export default connect(msp, mdp)(LoginForm);