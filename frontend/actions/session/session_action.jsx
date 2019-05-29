import * as APIUtil from '../../util/session_api';
export const RECEIVE_USER = "RECEIVE_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const RECEIVE_EMAIL = "RECEIVE_EMAIL";

const receiveEmail = ({ email }) => ({
    type: RECEIVE_EMAIL,
    email
})

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
});

const logOutUser = () => ({
    type: LOGOUT_USER
});


const receiveErrors = (errors) => ({
    type: RECEIVE_ERRORS,
    errors
});




export const signUp = user => dispatch => {
    return APIUtil.signUp(user)
        .then(user_rsp => dispatch(receiveUser(user_rsp)),
            rsp => dispatch(receiveErrors(rsp.responseJSON))
        );
};

export const login = user => dispatch => {
    return APIUtil.login(user)
        .then(user_rsp => dispatch(receiveUser(user_rsp)),
            rsp => dispatch(receiveErrors(rsp.responseJSON))
        );
};

export const logOut = () => dispatch => {
    return APIUtil.logOut()
        .then(() => dispatch(logOutUser()));
};

export const fetchEmail = email => dispatch => {
    return APIUtil.confirmEmail(email)
        .then( email_rsp => dispatch( receiveEmail(email_rsp)),
            rsp => dispatch(receiveErrors(rsp.responseJSON))
        );
}