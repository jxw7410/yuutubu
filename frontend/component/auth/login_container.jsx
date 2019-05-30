import { connect } from 'react-redux';
import { login, fetchEmail, defaultAction, clearEmail } from '../../actions/session/session_action';
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
        defaultAction: () => dispatch( defaultAction() ),
        clearEmail: () => dispatch( clearEmail())
    };
};


export default connect(msp, mdp)(LoginForm);