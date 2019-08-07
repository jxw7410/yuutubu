import React from 'react';
import { Link } from 'react-router-dom'
import {isEmailValid} from './../../util/selectors';

class EmailFormStuff extends React.Component {
    constructor(props){
        super(props)
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(e){
        e.preventDefault();
        this.props.login({ email: "demouser@gmail.com", password: "password123"})
    }

    render(){
        return (
            <span> Have no account? Try out the <span onClick={this.handleOnClick} id='demo-account-link'>demo account</span></span>
        )
    }
}

class LoginFormItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            focus: false,
        }

        this.authElement = React.createRef();
        this.didUpdate = false;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.textChangeEvent = this.textChangeEvent.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleUnfocus = this.handleUnfocus.bind(this);
        this.changePlaceholder = this.changePlaceholder.bind(this);
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
            if (this.props.errors.length > 0) {
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

    changePlaceholder(target, field) {
        if (!this.state.focus) {
            const htmlElement = document.getElementById(target);
            if( htmlElement )
                htmlElement.placeholder = field;
        }
    }

    handleFocus(e) {
        e.preventDefault();
        this.setState({ focus: true })
    }

    handleUnfocus(e){
        e.preventDefault();
        this.setState({focus: false })
    }   

    render() {
        const field = this.props.type;
        const inputClassName = 'auth-input' + (this.props.errors.length ? "-errors" : '');
        const inputFocused = this.state.focus || this.state[field].length

        return (
            <div className='auth-form-ctn'>
                <form className={"auth-form"}>
                    <label className={this.props.errors.length  ?  'auth-label-errors' : ""}>
                        

                        <span className={`input-tag ${ inputFocused ? 'input-tag-focused ' : ''}`}
                            style={ (this.props.errors.length && inputFocused) ? { color: 'red' } : null}> 
                            {field === 'email' ? 'Email' : 'Enter Your password'} 
                        </span>



                        <input
                            id={"auth-input-element-"+field}
                            ref={this.authElement}
                            onBlur={this.handleUnfocus}
                            onFocus={this.handleFocus}
                            onChange={this.textChangeEvent(field)}
                            type={field}
                            className={inputClassName}
                            value={this.setState[field]}
                            />

                        <span style={ this.props.errors.length ? {color:'red'} : null }>
                            {this.props.errors ? this.props.errors : null}
                        </span>
                    </label>



                    {field === 'email' ? <EmailFormStuff login={this.props.login}/> : null}

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

