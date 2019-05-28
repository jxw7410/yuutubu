import * as APIUtil from '../../util/session_api';
export const RECEIVE_USER = "RECEIVE_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

export const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
});

export const logOutUser = () => ({
    type: LOGOUT_USER
});

export const receiveErrors = (errors) => ({
    type: RECEIVE_ERRORS,
    errors
});

export const signUp = user => dispatch => {
    return APIUtil.signUp(user).then(user_rsp => dispatch(receiveUser(user_rsp)));
};

export const login = user => dispatch => {
    return APIUtil.login(user).then(user_rsp => dispatch(receiveUser(user_rsp)));
};

export const logOut = () => dispatch => {
    return APIUtil.logOut().then(() => dispatch(logOutUser()));
};
