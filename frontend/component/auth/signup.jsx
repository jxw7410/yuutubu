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

        this.userName = React.createRef();
        this.email = React.createRef();
        this.password = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.textChangeEvent = this.textChangeEvent.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handeUnfocus = this.handleUnfocus.bind(this);
        this.changePlaceholder = this.changePlaceholder.bind(this);
    }


    componentDidMount() {
        this.props.removeNavBars();
        this.props.removeVideoPlayer();
        this.userName.current.focus();
        this.mounted = true;
    }

    componentDidUpdate() {
        if (!this.didUpdate) {
            if (!isEmpty(this.props.errors)) {
                this.didUpdate = true;
                if (this.props.errors.Username) {
                    this.userName.current.focus();
                } else if (this.props.errors.Email) {
                    this.email.current.focus();
                } else if (this.props.errors.Password) {
                    this.password.current.focus();
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
       
        return (
            <div className='flexh-1 max-w-h'>
                <div className='c-f-grid'>
                    <div className='c-f-ctn'>
                        <div className='flexv-6' style={{ padding: "10px 20px 0px 20px"}}>
                            <span className='auth-logo'>
                                <i className="fab fa-youtube"/>
                                <h1>{"YuuTubu"}</h1>
                            </span>
                            <h1 style={{fontSize: '25px'}}>Create your YuuTubu Account</h1>
                            <h2>to continue to YuuTubu</h2>
                        </div>

                        <form id='create-form' className='flexv-6'>

                            <SignUpInputitem
                                id="Username"
                                reference={this.userName}
                                field={this.map.userNameFocus}
                                value={this.state.username}
                                focus={this.state.userNameFocus}
                                inputLabelName={`flexv-4 ${errors.Username ? "-errors" : ""}`}
                                inputClassName={`cf-input ${errors.Username ? "cfi-err" : ""}`}
                                blurEvent={this.handleUnfocus("userNameFocus", "userNamePlaceholder")}
                                focusEvent={this.handleFocus("userNameFocus", "userNamePlaceholder")}
                                changeEvent={this.textChangeEvent('username')}
                                type='text'
                                errors={errors.Username ? true : false}
                                message={errors.Username ? errors.Username : ""}
                            />


                            <SignUpInputitem
                                id="Email"
                                reference={this.email}
                                field={this.map.emailFocus}
                                value={this.state.email}
                                focus={this.state.emailFocus}
                                inputLabelName={`flexv-4 ${errors.Email ? "-errors" : ""}`}
                                inputClassName={`cf-input ${errors.Email ? "cfi-err" : ""}`}
                                blurEvent={this.handleUnfocus("emailFocus", "emailPlaceholder")}
                                focusEvent={this.handleFocus("emailFocus", "emailPlaceholder")}
                                changeEvent={this.textChangeEvent('email')}
                                type='text'
                                errors={errors.Email ? true : false }
                                message={errors.Email ? errors.Email : "Please enter a valid email."}
                            />

                            <SignUpInputitem
                                id="Password"
                                reference={this.password}
                                field={this.map.passwordFocus}
                                value={this.state.password}
                                focus={this.state.passwordFocus}
                                inputLabelName={`flexv-4 ${errors.Password ? "-errors" : ""}`}
                                inputClassName={`cf-input ${errors.Password ? "cfi-err" : ""}`}
                                blurEvent={this.handleUnfocus("passwordFocus", "passwordPlaceholder")}
                                focusEvent={this.handleFocus("passwordFocus", "passwordPlaceholder")}
                                changeEvent={this.textChangeEvent('password')}
                                type='password'
                                errors={errors.Password ? true : false }
                                message={errors.Password ? errors.Password : "Password should be at least 6 characters long"}
                            />

                            <section>
                                <Link to='/login'> Sign In Instead </Link>
                                <button onClick={this.handleSubmit}>Next</button>
                            </section>
                        </form>

                    </div>

                    <section/>
                </div>
            </div>
        )
    }
}

export default SignUpForm;