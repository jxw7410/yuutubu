import React from 'react';


function EmailFormStuff(props){
    return (
        <span> Have no account? Try out the demo account</span>
    )
}

class SessionForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.textChangeEvent = this.textChangeEvent.bind(this);
    }
    
    textChangeEvent(field){
        return e => {
            e.preventDefault();
            this.setState( { [field]: e.target.value} )
        }
    }

    handleSubmit(e){
        e.preventDefault();
        const email = this.state.email || this.props.email;
        const password = this.state.password
        this.props.action( {email, password} );
    }

    render(){
        const field = this.props.type;

        return (
            <form className="auth-form" key={ field }>
                <label>
                    <h5>
                        { field === 'email' ? 'Email' : 'Enter your password' }
                    </h5>
                    <input 
                        onChange={ this.textChangeEvent(field) }
                        type={ field === 'email' ? 'text' : 'password' } 
                        value={this.setState[field]}/>
                </label>

                { field === 'email' ? <EmailFormStuff/> : null }

                <section>
                    <span>{field === 'email' ? 'Create Account' : 'Forgot Password'}</span>
                    <button onClick={ this.handleSubmit }>Next</button>
                </section>
            </form>
        )
    }
}

export default SessionForm

