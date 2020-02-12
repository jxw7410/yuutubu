import { connect } from 'react-redux';
import LoginForm from './login_form';

const msp = state => ({
  email: state.session.email,
})



export default connect(msp)(LoginForm);