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

        this.timeOut;
        this.didUpdate = false;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.textChangeEvent = this.textChangeEvent.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleUnfocus = this.handleUnfocus.bind(this);

        this.changePlaceholder = this.changePlaceholder.bind(this);
    }

    componentDidMount() {
        this.didUpdate = false; 
        document.getElementById('auth-input-element-' + this.props.type).placeholder = 
            this.props.type === 'email' ? 'Email' : 'Enter Your password';
            
        document.getElementById('auth-input-element-'+ this.props.type).focus();
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
                document.getElementById('auth-input-element-'+this.props.type).focus();
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

    changePlaceholder(target, field) {
        if (!this.state.focus)
            document.getElementById(target).placeholder = field;
    }

    handleFocus(e) {
        e.preventDefault();
        this.changePlaceholder(e.target.id, "")
        this.setState({ focus: true })
    }

    handleUnfocus(field){
        return e => {
            e.preventDefault();
            const target = e.target.id;
            clearTimeout(this.timeOut);
            this.timeOut = setTimeout(()=>{
                this.changePlaceholder(target, field)
            }, 140);
            this.setState({focus: false })
        }
    }   

    render() {
        const field = this.props.type;
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
                                        {field === 'email' ? 'Email' : 'Enter Your password'}
                                    </h5> : null
                            }
                        </ReactCSSTransistionGroup>


                        <input
                            id={"auth-input-element-"+field}
                            onBlur={this.handleUnfocus(field === 'email' ? 'Email' : 'Enter Your password')}
                            onFocus={this.handleFocus}
                            onChange={this.textChangeEvent(field)}
                            type={field === 'email' ? 'email' : 'password'}
                            className={inputClassName}
                            value={this.setState[field]}
                            />

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

