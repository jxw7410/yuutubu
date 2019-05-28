import { connect } from 'react-redux';
import { login } from '../../actions/session/session_action';
import LoginForm from './session_form';



const msp = state =>{
    return {
        type: 'login',
        email: state.session.email
    }
}

const mdp = dispatch => {
    return {
        login: user => dispatch( login(user) )
    };
};


export default connect(msp, mdp)(LoginForm);