import React from 'react';
import Login_Form_Item from './login_form_item';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


const LoginForm = (props) => {

    return (
        <div id='login-container-wrapper'>
            <div id='login-container'>
                <span className='auth-logo'><i className="fab fa-youtube"></i><h1>{"YuuTubu"}</h1></span>
                {
                    props.email ?
                        <>
                            <h2>Welcome</h2>
                            <h3>{props.email}</h3>
                        </> :
                        <>
                            <h2>Sign In</h2>
                            <h3>to continue to YuuTubu</h3>
                        </>
                }


                <div id='auth-div'>
                    <ReactCSSTransitionGroup
                        transitionName="session-form"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}>

                        {
                            !props.email ?
                                <Login_Form_Item
                                    key={'email'}
                                    errors={props.errors}
                                    email={props.email}
                                    type={'email'}
                                    className={'session'}
                                    action={props.fetchEmail}
                                    defaultAction={props.defaultAction}
                                    raiseEmailError={props.raiseEmailError}
                                    removeNavBars={props.removeNavBars}
                                    removeVideoPlayer={props.removeVideoPlayer}
                                    login={props.login}
                                />
                                :
                                <Login_Form_Item
                                    key={'password'}
                                    errors={props.errors}
                                    email={props.email}
                                    type={'password'}
                                    className={'session'}
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