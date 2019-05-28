import React from 'react'
import { Route } from 'react-router-dom';
import AuthRoute from './auth/auth_route'
import DummyIndex from './dummy_index';

const App = () => (
    <div>
        <Route path='/' component={DummyIndex}/>
        <AuthRoute path="/signup" />  
        <AuthRoute path="/login" />  
    </div>
)

export default App
