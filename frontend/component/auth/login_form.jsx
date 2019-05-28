import React from 'react';
import SessionForm from './session_form';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


const LoginForm = (props) => {
        return (
            <div id='login-container'>
                <div id='login-container-header'> 
                    <h1>Yuutubu</h1>         
                    {
                        props.email ? 
                            <>
                            <h2>Welcome</h2>
                            <h3>{props.email}</h3>
                            </>
                            :
                            <>
                            <h2>Sign In</h2>
                            <h3>to continue to Yuutubu</h3>
                            </>
                    }
                </div>

                <div id='auth-div'>

                    {/* <ReactCSSTransitionGroup
                        transitionName="auth_slide"
                        transitionEnterTimeout={1000}
                        transitionLeaveTimeout={1000}> */}
                        <SessionForm 
                            key={'email'} 
                            email={props.email} 
                            type={'email'} 
                            action={props.fetchEmail}/>
                        <SessionForm 
                            key={'password'} 
                            email={props.email} 
                            type={'password'} 
                            action={props.login}/>
                    {/* </ReactCSSTransitionGroup> */}
                </div>
            </div>
        )
}

export default LoginForm;