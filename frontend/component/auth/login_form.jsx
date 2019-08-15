import React from 'react';
import Login_Form_Item from './login_form_item';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


const LoginForm = (props) => {

    return (
        <div className='flexh-1 max-w-h'>
            <div className='login-ctn flexv-8'>
                <span className='flexh-3'>
                    <i className="fab fa-youtube"/>
                    <h1 style={{fontSize: '25px'}}>{"YuuTubu"}</h1>
                </span>
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
                            <h2>Sign In</h2>
                            <h3>to continue to YuuTubu</h3>
                        </React.Fragment>
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