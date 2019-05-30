import React from 'react'
import { connect } from 'react-redux';
import { signUp, defaultAction } from '../../actions/session/session_action';
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
        signUp: user => dispatch(signUp(user)),
        defaultAction: () => dispatch(defaultAction())
    }
};


export default connect(msp, mdp)(SignUpForm)