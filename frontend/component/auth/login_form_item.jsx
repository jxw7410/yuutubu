import React from 'react';
import { Link } from 'react-router-dom'
import { isEmailValid } from './../../util/selectors';
import { AuthInputWidget, EmailFormStuff } from './utils';

class LoginFormItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
        }

        this.didUpdate = false;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.textChangeEvent = this.textChangeEvent.bind(this);
        this.authElement = React.createRef();
    }

    componentDidMount() {
        this.didUpdate = false; 
        this.props.removeNavBars();
        this.props.removeVideoPlayer();
        this.authElement.current.focus();
    }   

    componentWillUnmount(){
        this.props.defaultAction();
        if (this.props.email)
            this.props.clearEmail();
    }

    componentDidUpdate() {
        if (!this.didUpdate) {
            if (this.props.errors.length) {
                this.didUpdate = true;
                this.authElement.current.focus();
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
        if (email && !isEmailValid(email)){
            this.props.raiseEmailError();
        } else {
            this.props.action({ email, password });
        }
    }

    render() {
        const field = this.props.type;

        return (
            <div className='auth-form-ctn'>
                <form className="auth-form flexv-7">
        

                    <AuthInputWidget 
                        ref={this.authElement}
                        type={field}
                        text={field}
                        value={this.state[field]}
                        textChange={this.textChangeEvent(field)}
                        errors = { this.props.errors }
                        styleClass = {{ input: 'login-input', label: 'login-label'}}
                        otherClass={{ input:'li-errors', label: 'flt-e' }}
                    />

                    {field === 'email' ? <EmailFormStuff login={this.props.login}/> : null}

                    <section className='flexh-5' style={{width: '350px'}}>
                        <span>{field === 'email' ? <Link to='/signup' >Create Account</Link> : 'Forgot Password'}</span>
                        <button onClick={this.handleSubmit}>Next</button>
                    </section>
                </form>
            </div>
        )
    }
}

export default LoginFormItem;

