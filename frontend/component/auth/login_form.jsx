import React from 'react';
import LoginFormItem from './login_form_item_ctn';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { AuthLogo } from './utils';


const LoginForm = (props) => {
  const emailStyle = {
    padding: "3px 8px",
    border: "1px solid rgb(192, 194, 197)",
    borderRadius: "12px"
  }

  return (
    <div className='flex-horizontal--style-1 max-width-height'>
      <div className='login-ctn flex-vertical--style-8'>
        <AuthLogo />
        {
          props.email ?
            <>
              <h2>Welcome</h2>
              <h3 style={emailStyle}>{props.email}</h3>
            </> :
            <>
              <h2 style={{ fontSize: '30px' }}>Sign In</h2>
              <h3>to continue to YuuTubu</h3>
            </>
        }


        <div className='auth--container'>
          <ReactCSSTransitionGroup
            transitionName="session-form"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {
              props.email ?
                <LoginFormItem key='password' type='password' />
                :
                <LoginFormItem key='email' type='email' />
            }
          </ReactCSSTransitionGroup>
        </div>
      </div>
    </div>
  )
}

export default LoginForm;