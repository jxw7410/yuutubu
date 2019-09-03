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
        <div className='flexh-1 max-w-h'>
            <div className='login-ctn flexv-8'>
                <AuthLogo />
                {
                    props.email ?
                        <React.Fragment>
                            <h2>Welcome</h2>
                            <h3 style={emailStyle}>{props.email}</h3>
                        </React.Fragment> :
                        <React.Fragment>
                            <h2 style={{fontSize: '30px'}}>Sign In</h2>
                            <h3>to continue to YuuTubu</h3>
                        </React.Fragment>
                }


                <div className='auth-div'>
                    <ReactCSSTransitionGroup
                        transitionName="session-form"
                        transitionEnterTimeout= {500}
                        transitionLeaveTimeout= {300}>
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