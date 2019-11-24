import React from 'react'
import { isEmpty } from 'lodash'
import { Link } from 'react-router-dom'
import { isEmailValid } from '../../util/selectors'
import { AuthLogo, AuthInputWidget } from './utils';

const SignUpForm = props => {
  const [state, setState] = React.useState({
    username: "",
    password: "",
    email: "",
  });

  const didUpdate = React.useRef(false);
  const isMounted = React.useRef(false);
  const username = React.useRef(null);
  const email = React.useRef(null);
  const password = React.useRef(null);
  const errors = props.errors;

  React.useEffect(() => {
    props.removeNavBars();
    props.removeVideoPlayer();
    username.current.focus();
    isMounted.current = true;

    return () => {
      props.defaultAction();
      isMounted.current = false;
    }
  }, []);

  React.useEffect(() => {
    if (!didUpdate.current && !isEmpty(props.errors)) {
      didUpdate.current = true;
      if (props.errors.Username)
        username.current.focus();
      else if (props.errors.Email)
        email.current.focus();
      else if (props.errors.Password)
        password.current.focus();
    }
  });


  function textChangeEvent(field) {
    return e => {
      setState({ ...state, [field]: e.target.value })
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    didUpdate.current = false;
    if (state.email && isEmailValid(state.email))
      props.signUp(state);
    else
      props.raiseEmailError();
  }

  return (
    <div className='flex-horizontal--style-1 max-width-height'>
      <div className='c-f-grid'>
        <div className='c-f-ctn'>
          <div className='flex-vertical--style-6' style={{ padding: '10px 20px 0px 20px' }}>
            <AuthLogo />
            <h1 style={{ fontSize: '25px' }}>Create your YuuTubu Account</h1>
            <h1>to continue to YuuTubu</h1>
          </div>

          <form className='create-form flex-vertical--style-6'>
            <AuthInputWidget
              ref={username}
              type='text'
              text='Username'
              value={state.username}
              textChange={textChangeEvent('username')}
              errors={errors.Username}
              styleClass={{ label: "cfi-label", input: "cf-input" }}
              otherClass={{ label: "flt-f", input: "cfi-err" }}
            />
            <AuthInputWidget
              ref={email}
              type='email'
              text='Your Email Address'
              value={state.email}
              textChange={textChangeEvent('email')}
              errors={
                errors.Email ? errors.Email :
                  <span style={{ color: 'black' }}>Please enter a valid email.</span>
              }
              styleClass={{ label: "cfi-label", input: "cf-input" }}
              otherClass={{ label: "flt-f", input: "cfi-err" }}
            />
            <AuthInputWidget
              ref={password}
              type='password'
              text='Your Password'
              value={state.password}
              textChange={textChangeEvent('password')}
              errors={
                errors.Password ? errors.Password :
                  <span style={{ color: 'black' }}>Passwords should be 6 characters long.</span>
              }
              styleClass={{ label: "cfi-label", input: "cf-input" }}
              otherClass={{ label: "flt-f", input: "cfi-err" }}
            />
            <section className='flex-horizontal--style-5'>
              <Link to='/login'> Sign In Instead </Link>
              <button onClick={handleSubmit}>Next</button>
            </section>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUpForm;