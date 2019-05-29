import React from 'react'
import SignUpInputitem from './signup_input_item';
import {isEmpty} from 'lodash'

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

    }

    textChangeEvent(field) {
        return e => {
            e.preventDefault();
            this.setState({ [field]: e.target.value })
        }
    }

    handleSubmit(e) {
        e.preventDefault();
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

                    </div>

                    <form id={'create-form'}>   

                        <SignUpInputitem 
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
                            field={"Your Password"}
                            value={this.state.password}
                            focus={this.state.passwordFocus}
                            inputLabelName={inputLabelName + (errors.Password ? "-errors" : "")}
                            inputClassName={inputClassName + (errors.Email ? "-errors" : "")}
                            blurEvent={this.handleFocus("passwordFocus")}
                            focusEvent={this.handleFocus("passwordFocus")}
                            changeEvent={this.textChangeEvent('password')}
                            type={'password'}
                            message={errors.Password ? errors.Password : "Password should be at least 6 characters long"}
                        />
                        
                        <section>
                            <span> Sign In Instead </span>
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