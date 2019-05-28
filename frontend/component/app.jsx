import React from 'react'
import { Route } from 'react-router-dom';
import { AuthRoute } from '../util/auth_route'
import  SignUpContainer  from '../component/auth/signup_container'
import DummyIndex from './dummy_index';

const App = () => (
    <div>
        <Route exact path='/' component={DummyIndex}/>
        <AuthRoute path="/signup" component={ SignUpContainer }/>  
        <AuthRoute path="/login" />  
    </div>
)

export default App
