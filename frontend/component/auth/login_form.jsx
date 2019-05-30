import React from 'react';
import Login_Form_Item from './login_form_item';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


const LoginForm = (props) => {
    return (
        <div id='login-container'>

            <h1>Yuutubu</h1>
            {
                props.email ?
                    <>
                        <h2>Welcome</h2>
                        <h3>{props.email}</h3>
                    </> :
                    <>
                        <h2>Sign In</h2>
                        <h3>to continue to Yuutubu</h3>
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
                                defaultAction={props.defaultAction} />
                            :
                            <Login_Form_Item
                                key={'password'}
                                errors={props.errors}
                                email={props.email}
                                type={'password'}
                                className={'session'}
                                action={props.login} 
                                defaultAction={props.defaultAction}
                                clearEmail={props.clearEmail} />
                    }

                </ReactCSSTransitionGroup>




            </div>
        </div>
    )
}

export default LoginForm;