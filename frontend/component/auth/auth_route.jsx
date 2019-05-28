import React from 'react';
import { withRouter, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

const Auth = ({ component: Component, islogin, exact, path}) => {
    return (
        <Route path={path}
            exact={exact}
            render={props =>
                islogin ? <Redirect to='/' />
                    : <Component  {...props} />}
        />
    )
}

const msp = state => {
    return {
        islogin: Boolean(state.session.id)
    }
}

export default withRouter(connect(msp)(Auth));

