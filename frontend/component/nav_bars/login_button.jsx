import React from 'react';
import {withRouter} from 'react-router-dom';

const LoginButton = props => {
  return (
    <button 
      onClick={() => props.history.push('/login')}
      className='login-button flex-horizontal--style-3' >
      <i className='fas fa-user-circle' />
      SIGN IN
    </button>
  )
}

export default withRouter(React.memo(LoginButton));

