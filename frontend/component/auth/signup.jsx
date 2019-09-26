import React from 'react'
import { isEmpty } from 'lodash'
import { Link } from 'react-router-dom'
import { isEmailValid } from '../../util/selectors'
import { AuthLogo, AuthInputWidget } from './utils';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      email: "",
    }

    this.didUpdate = false;
    this.mounted = false;

    this.username = React.createRef();
    this.email = React.createRef();
    this.password = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.textChangeEvent = this.textChangeEvent.bind(this);
  }


  componentDidMount() {
    this.props.removeNavBars();
    this.props.removeVideoPlayer();
    this.username.current.focus();
    this.mounted = true;
  }

  componentDidUpdate() {
    if (!this.didUpdate) {
      if (!isEmpty(this.props.errors)) {
        this.didUpdate = true;
        if (this.props.errors.Username) {
          this.username.current.focus();
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



  //Be careful, this is a atrocious
  render() {
    const errors = this.props.errors;

    return (
      <div className='flexh-1 max-w-h'>
        <div className='c-f-grid'>
          <div className='c-f-ctn'>
            <div className='flexv-6' style={{ padding: "10px 20px 0px 20px" }}>
              <AuthLogo />
              <h1 style={{ fontSize: '25px' }}>Create your YuuTubu Account</h1>
              <h2>to continue to YuuTubu</h2>
            </div>

            <form className='create-form flexv-6'>

              <AuthInputWidget
                ref={this.username}
                type='text'
                text='Username'
                value={this.state.username}
                textChange={this.textChangeEvent('username')}
                errors={errors.Username}
                styleClass={{ label: "cfi-label", input: "cf-input" }}
                otherClass={{ label: "flt-f", input: "cfi-err" }}
              />


              <AuthInputWidget
                ref={this.email}
                type='email'
                text='Your Email Address'
                value={this.state.email}
                textChange={this.textChangeEvent('email')}
                errors={
                  errors.Email ? errors.Email :
                    <span style={{ color: 'black' }}>Please enter a valid email.</span>
                }
                styleClass={{ label: "cfi-label", input: "cf-input" }}
                otherClass={{ label: "flt-f", input: "cfi-err" }}
              />


              <AuthInputWidget
                ref={this.password}
                type='password'
                text='Your Password'
                value={this.state.password}
                textChange={this.textChangeEvent('password')}
                errors={
                  errors.Password ? errors.Password :
                    <span style={{ color: 'black' }}>Passwords should be 6 characters long.</span>
                }
                styleClass={{ label: "cfi-label", input: "cf-input" }}
                otherClass={{ label: "flt-f", input: "cfi-err" }}
              />


              <section className='flexh-5'>
                <Link to='/login'> Sign In Instead </Link>
                <button onClick={this.handleSubmit}>Next</button>
              </section>
            </form>

          </div>

          <section />
        </div>
      </div>
    )
  }
}

export default SignUpForm;