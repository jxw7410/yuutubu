import React from 'react'
import SignUpInputitem from './signup_input_item';
import {isEmpty} from 'lodash'
import { Link } from 'react-router-dom'

class SignUpForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            email: "",
            userNameFocus: false,
            passwordFocus: false,
            emailFocus: false
        }

        this.didUpdate = false;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.textChangeEvent = this.textChangeEvent.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }


    componentDidMount(){
        document.getElementById('Username').focus();
    }
    
    componentDidUpdate(){
        //debugger
        if(!this.didUpdate){
            if(!isEmpty(this.props.errors)){
                this.didUpdate = true;
                //debugger
                if(this.props.errors.Username){
                    document.getElementById('Username').focus();
                } else if(this.props.errors.Email) {
                    document.getElementById('Email').focus();
                } else if(this.props.errors.Password) {
                    document.getElementById('Password').focus();
                }
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
        this.didUpdate = false;
        this.props.signUp(this.state)
    }

    handleFocus(field) {
        return e => {
            e.preventDefault();
            const bool = this.state[field] ? false : true;
            this.setState({ [field]: bool })
        }
    }



    //Be careful, this is a atrocious
    render() {
        const errors = this.props.errors;
        //debugger
        const inputClassName = 'create-form-input';
        const inputLabelName = "create-form-label";
        console.log(isEmpty(errors));
       // debugger
        return (
            <div id={'create-form-grid'}>
                <div id={'create-form-container'}>
                    <div id={'create-form-header'}>
                        <h1>{"Yuutubu"}</h1>
                        <h1>{"Create your Yuutubu Account"}</h1>
                        <h2>{"to continue to Yuutubu"}</h2>
                    </div>

                    <form id={'create-form'}>   

                        <SignUpInputitem 
                            id = {"Username"}
                            field={"Username"}
                            value={this.state.username}
                            focus={this.state.userNameFocus}
                            inputLabelName={inputLabelName + ( errors.Username  ? "-errors" : "") }
                            inputClassName={inputClassName + (errors.Username ? "-errors" : "")}
                            blurEvent={this.handleFocus("userNameFocus")}
                            focusEvent={this.handleFocus("userNameFocus")}
                            changeEvent={this.textChangeEvent('username')}
                            type={'text'}
                            message={errors.Username ? errors.Username : ""}
                        />


                        <SignUpInputitem
                            id = {"Email"}
                            field={"Your email address"}
                            value={this.state.email}
                            focus={this.state.emailFocus}
                            inputLabelName={inputLabelName + (errors.Email ? "-errors" : "")}
                            inputClassName={inputClassName + (errors.Email ? "-errors" : "")}
                            blurEvent={this.handleFocus("emailFocus")}
                            focusEvent={this.handleFocus("emailFocus")}
                            changeEvent={this.textChangeEvent('email')}
                            type={'text'}
                            message={errors.Email ? errors.Email : "You don't need a real email for now"}
                        />

                        <SignUpInputitem
                            id = {"Password"}
                            field={"Your Password"}
                            value={this.state.password}
                            focus={this.state.passwordFocus}
                            inputLabelName={inputLabelName + (errors.Password ? "-errors" : "")}
                            inputClassName={inputClassName + (errors.Password ? "-errors" : "")}
                            blurEvent={this.handleFocus("passwordFocus")}
                            focusEvent={this.handleFocus("passwordFocus")}
                            changeEvent={this.textChangeEvent('password')}
                            type={'password'}
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
        )
    }
}

export default SignUpForm;