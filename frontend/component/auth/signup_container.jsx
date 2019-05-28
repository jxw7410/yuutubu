import React from 'react'
import { connect } from 'react-redux';
import { signUp } from '../../actions/session/session_action';

class SignUpForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
            email: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.textChangeEvent = this.textChangeEvent.bind(this);
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

    render(){
        return (
            <form>
                <input 
                    onChange={this.textChangeEvent('username')}
                    type='text' 
                    value={ this.state.username } 
                    placeholder={'Username'}/>

                <input
                    onChange={this.textChangeEvent('email')}
                    type='text'
                    value={this.state.email}
                    placeholder={'Your email address'} />

                <input
                    onChange={this.textChangeEvent('password')}
                    type='password'
                    value={this.state.password}
                    placeholder={'Password'} />
                
                <section>
                    <span> Sign In Instead </span>
                    <button onClick={this.handleSubmit}>Next</button>
                </section>
            </form>
        )
    }
}


const mdp = dispatch => {
    return {
        signUp: user =>  dispatch( signUp(user) )
    }
};


export default connect(null, mdp)(SignUpForm)