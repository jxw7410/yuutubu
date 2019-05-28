import React from 'react'
import { logOut } from '../actions/session/session_action'
import { connect } from 'react-redux';

const DummyIndex = (props) => {
    return (
        <div>
            This is only a test Index.
            <button onClick={() => props.logOut()}>Sign Out</button>
        </div>
    )
}


const mdp = dispatch => {
    return {
        logOut: () => dispatch(logOut())
    }
}

export default connect(null, mdp)(DummyIndex);

