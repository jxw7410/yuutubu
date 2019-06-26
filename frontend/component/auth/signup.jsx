import React from 'react'
import SignUpInputitem from './signup_input_item';
import { isEmpty } from 'lodash'
import { Link } from 'react-router-dom'
import { isEmailValid } from '../../util/selectors'

class SignUpForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            email: "",
            userNameFocus: false,
            passwordFocus: false,
            emailFocus: false,
            userNamePlaceholder: "Username",
            emailPlaceholder: "Your Email Address",
            passwordPlaceholder: "Your Password"
        }

        this.didUpdate = false;
        this.mounted = false;

        this.timeOut = {
            userNameFocus: null,
            passwordFocus: null,
            emailFocus: null,
        }

        this.map = {
            userNameFocus: "Username",
            passwordFocus: "Your Password",
            emailFocus: "Your Email Address"
        }


        this.handleSubmit = this.handleSubmit.bind(this);
        this.textChangeEvent = this.textChangeEvent.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handeUnfocus = this.handleUnfocus.bind(this);
        this.changePlaceholder = this.changePlaceholder.bind(this);
    }


    componentDidMount() {
        this.props.removeNavBars();
        this.props.removeVideoPlayer();
        document.getElementById('Username').focus();
        this.mounted = true;
    }

    componentDidUpdate() {
        if (!this.didUpdate) {
            if (!isEmpty(this.props.errors)) {
                this.didUpdate = true;
                if (this.props.errors.Username) {
                    document.getElementById('Username').focus();
                } else if (this.props.errors.Email) {
                    document.getElementById('Email').focus();
                } else if (this.props.errors.Password) {
                    document.getElementById('Password').focus();
                }
            }
        }
    }

    componentWillUnmount() {
        this.props.defaultAction();
        this.mounted = false;
    }

    textChangeEvent(field) {
        return e => {
            e.preventDefault();
            this.setState({ [field]: e.target.value })
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.didUpdate = false;
        if (this.state.email && !isEmailValid(this.state.email)) {
            this.props.raiseEmailError();
        } else {
            this.props.signUp(this.state)
        }
    }


    changePlaceholder(placeholder, field) {
        if (this.mounted)
            this.setState({ [placeholder]: field })
    }

    handleFocus(focus, placeholder) {
        return e => {
            e.preventDefault();
            this.setState({ [focus]: true, [placeholder]: "" })
        }
    }

    handleUnfocus(field, placeholder) {
        return e => {
            e.preventDefault();
            const mappedField = this.map[field]
            clearTimeout(this.timeOut[field]);

            this.timeOut[field] = setTimeout(() => {
                this.changePlaceholder(placeholder, mappedField)
            }, 140);

            this.setState({ [field]: false })
        }
    }

    //Be careful, this is a atrocious
    render() {
        const errors = this.props.errors;
        const inputClassName = 'create-form-input';
        const inputLabelName = "create-form-label";
        return (
            <div id='signup-form-wrapper' >
                <div id='create-form-grid'>
                    <div id='create-form-container'>
                        <div id='create-form-header'>
                            <span className='auth-logo'><i className="fab fa-youtube"></i><h1>{"YuuTubu"}</h1></span>
                            <h1>"Create your YuuTubu Account"</h1>
                            <h2>"to continue to YuuTubu"</h2>
                        </div>

                        <form id='create-form'>

                            <SignUpInputitem
                                id="Username"
                                field={this.map.userNameFocus}
                                value={this.state.username}
                                focus={this.state.userNameFocus}
                                inputLabelName={inputLabelName + (errors.Username ? "-errors" : "")}
                                inputClassName={inputClassName + (errors.Username ? "-errors" : "")}
                                blurEvent={this.handleUnfocus("userNameFocus", "userNamePlaceholder")}
                                focusEvent={this.handleFocus("userNameFocus", "userNamePlaceholder")}
                                changeEvent={this.textChangeEvent('username')}
                                type={'text'}
                                placeholder={this.state.userNameFocus ? null : this.state.userNamePlaceholder}
                                message={errors.Username ? errors.Username : ""}
                            />


                            <SignUpInputitem
                                id={"Email"}
                                field={this.map.emailFocus}
                                value={this.state.email}
                                focus={this.state.emailFocus}
                                inputLabelName={inputLabelName + (errors.Email ? "-errors" : "")}
                                inputClassName={inputClassName + (errors.Email ? "-errors" : "")}
                                blurEvent={this.handleUnfocus("emailFocus", "emailPlaceholder")}
                                focusEvent={this.handleFocus("emailFocus", "emailPlaceholder")}
                                changeEvent={this.textChangeEvent('email')}
                                type={'text'}
                                placeholder={this.state.emailFocus ? null : this.state.emailPlaceholder}
                                message={errors.Email ? errors.Email : "Please enter a valid email."}
                            />

                            <SignUpInputitem
                                id={"Password"}
                                field={this.map.passwordFocus}
                                value={this.state.password}
                                focus={this.state.passwordFocus}
                                inputLabelName={inputLabelName + (errors.Password ? "-errors" : "")}
                                inputClassName={inputClassName + (errors.Password ? "-errors" : "")}
                                blurEvent={this.handleUnfocus("passwordFocus", "passwordPlaceholder")}
                                focusEvent={this.handleFocus("passwordFocus", "passwordPlaceholder")}
                                changeEvent={this.textChangeEvent('password')}
                                type={'password'}
                                placeholder={this.state.passwordFocus ? null : this.state.passwordPlaceholder}
                                message={errors.Password ? errors.Password : "Password should be at least 6 characters long"}
                            />

                            <section>
                                <Link to='/login'> Sign In Instead </Link>
                                <button onClick={this.handleSubmit}>Next</button>
                            </section>
                        </form>

                    </div>

                    <section id={'create-form-image-section'}>

                    </section>
                </div>
            </div>
        )
    }
}

export default SignUpForm;