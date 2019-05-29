import React from 'react'
import { connect } from 'react-redux';
import { signUp } from '../../actions/session/session_action';
import { convertErrorMessageToObject } from '../../util/selectors';
import SignUpForm from './signup';

const msp = state => {
    const errors = convertErrorMessageToObject(state.errors)
    return {
        errors,
    }
}


const mdp = dispatch => {
    return {
        signUp: user => dispatch(signUp(user))
    }
};


export default connect(msp, mdp)(SignUpForm)