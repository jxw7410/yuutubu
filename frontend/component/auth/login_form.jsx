import React from 'react';
import LoginFormItem from './login_form_item';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { AuthLogo } from './utils';


//Refactor this tomorrow....add the container for the form item,
//Not this bs
const LoginForm = (props) => {

    return (
        <div className='flexh-1 max-w-h'>
            <div className='login-ctn flexv-8'>
                <AuthLogo />
                {
                    props.email ?
                        <React.Fragment>
                            <h2>Welcome</h2>
                            <h3 style={{
                                padding: "3px 8px",
                                border: "1px solid rgb(192, 194, 197)",
                                borderRadius: "12px"
                            }}>{props.email}</h3>
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
                            !props.email ?
                                <LoginFormItem
                                    key='email'
                                    errors={props.errors}
                                    email={props.email}
                                    type='email'
                                    action={props.fetchEmail}
                                    defaultAction={props.defaultAction}
                                    raiseEmailError={props.raiseEmailError}
                                    removeNavBars={props.removeNavBars}
                                    removeVideoPlayer={props.removeVideoPlayer}
                                    login={props.login}
                                />
                                :
                                <LoginFormItem
                                    key='password'
                                    errors={props.errors}
                                    email={props.email}
                                    type='password'
                                    action={props.login}
                                    defaultAction={props.defaultAction}
                                    clearEmail={props.clearEmail}
                                    raiseEmailError={props.raiseEmailError}
                                    removeNavBars={props.removeNavBars}
                                    removeVideoPlayer={props.removeVideoPlayer}
                                />
                        }
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;