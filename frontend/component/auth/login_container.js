import { connect } from 'react-redux';
import LoginForm from './login_form';


// Yes this is almost pointless to have it's own file, 
// but for what it's worth, this is convention
const msp = state => ({
  email: state.session.email,
})



export default connect(msp)(LoginForm);