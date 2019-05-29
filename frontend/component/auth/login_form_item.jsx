import React from 'react';
import ReactCSSTransistionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router-dom'

function EmailFormStuff(props) {
    return (
        <span> Have no account? Try out the <Link to='/'>demo account</Link></span>
    )
}

class LoginFormItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            focus: false,
        }

        this.didUpdate = false;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.textChangeEvent = this.textChangeEvent.bind(this);
        this.handleFocus = this.handleFocus.bind(this);

    }

    componentDidMount() {
        this.didUpdate = false;
        document.getElementById('auth-input-element').focus();
    }


    componentDidUpdate() {
        if (!this.didUpdate) {
            if (this.props.errors.length > 0) {
                this.didUpdate = true;
                document.getElementById('auth-input-element').focus();
            }
        }
    }

    textChangeEvent(field) {
        return e => {
            e.preventDefault();
            this.setState({ [field]: e.target.value })
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const email = this.state.email || this.props.email;
        const password = this.state.password
        this.didUpdate = false;
        this.props.action({ email, password });
    }

    handleFocus(e) {
        e.preventDefault();
        const focus = this.state.focus ? false : true;
        if (!focus) {

        }

        this.setState({ focus })
    }


    render() {
        const field = this.props.type;
        // debugger
        const inputClassName = 'auth-input' + (this.props.errors.length === 0 ? "" : '-errors');

        return (
            <div className='auth-form-ctn'>
                <form className={"auth-form"}>
                    <label className={this.props.errors.length === 0 ? "" : 'auth-label-errors'}>
                        <ReactCSSTransistionGroup
                            transitionName='auth-input-placeholder'
                            transitionEnterTimeout={150}
                            transitionLeaveTimeout={150}>
                            {
                                this.state.focus || this.state.password || this.state.email ?
                                    <h5 className='input-tag'>
                                        {field === 'email' ? 'Email' : 'Enter your password'}
                                    </h5> : null
                            }
                        </ReactCSSTransistionGroup>


                        <input
                            id="auth-input-element"
                            onBlur={this.handleFocus}
                            onFocus={this.handleFocus}
                            onChange={this.textChangeEvent(field)}
                            type={field === 'email' ? 'text' : 'password'}
                            className={inputClassName}
                            value={this.setState[field]}
                            placeholder={
                                this.state.focus ? null :
                                    field === 'email' ? 'Email' : 'Enter your password'
                            } />

                        <span>{this.props.errors ? this.props.errors : null}</span>
                    </label>



                    {field === 'email' ? <EmailFormStuff /> : null}

                    <section>
                        <span>{field === 'email' ? <Link to='/signup' >Create Account</Link> : 'Forgot Password'}</span>
                        <button onClick={this.handleSubmit}>Next</button>
                    </section>
                </form>
            </div>
        )
    }
}

export default LoginFormItem;

