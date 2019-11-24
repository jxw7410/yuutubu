import React from 'react';
import { Link } from 'react-router-dom'
import { isEmailValid } from './../../util/selectors';
import { AuthInputWidget, DemoUserLogin } from './utils';

const LoginFormItem = props => {
	const [state, setState] = React.useState({
		email: "",
		password: "",
	});

	const didUpdate = React.useRef(false);
	const authElement = React.useRef(null);
	const field = props.type;

	React.useEffect(() => {
		props.removeNavBars();
		props.removeVideoPlayer();
		authElement.current.focus();

		return () => {
			props.defaultAction();
			if (props.type === 'password' && props.email)
				props.clearEmail();
		}
	}, []);

	React.useEffect(() => {
		if (!didUpdate.current && props.errors.length) {
			didUpdate.current = true;
			authElement.current.focus();
		}
	});


	function textChangeEvent(field) {
		return e => setState({ ...state, [field]: e.target.value });
	}

	function handleSubmit(e) {
		e.preventDefault();
		const email = state.email || props.email;

		if (email && isEmailValid(email)) {
			switch (props.type) {
				case 'password':
					props.login({ email, password: state.password })
					break;
				case 'email':
					props.fetchEmail({ email })
					break;
			}
		} else { props.raiseEmailError(); }

		didUpdate.current = false;
	}


	return (
		<div className='auth-form--container'>
			<form className='auth-form flex-vertical--style-7'>
				<AuthInputWidget
					ref={authElement}
					type={field}
					text={field}
					value={state[field]}
					textChange={textChangeEvent(field)}
					errors={props.errors}
					styleClass={{ input: 'login-input', label: 'login-label' }}
					otherClass={{ input: 'li-errors', label: 'flt-e' }}
				/>
				{
					field === 'email' ?
						<DemoUserLogin login={props.login} /> : null
				}
				<section className='flex-horizontal--style-5' style={{ width: '350px' }}>
					<span>
						{
							field === 'email' ?
								<Link to='/signup' >Create Account</Link> : 'Forgot Password'
						}
					</span>
					<button onClick={handleSubmit}>Next</button>
				</section>
			</form>
		</div>
	)
}

export default LoginFormItem;

