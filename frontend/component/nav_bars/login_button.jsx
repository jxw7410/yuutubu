import React from 'react';
import {withRouter} from 'react-router-dom';

const LoginButton = props => {
  return (
    <button 
      onClick={() => props.history.push('/login')}
      className='signin-btn flexh-3' >
      <i className='fas fa-user-circle' />
      SIGN IN
    </button>
  )
}

export default withRouter(React.memo(LoginButton));

