import React from 'react'
import { Route } from 'react-router-dom';
import { AuthRoute } from '../util/auth_route'
import SignUpContainer  from '../component/auth/signup_container'
import LoginContainer from '../component/auth/login_container'
import SplashComponent from '../component/splash/splash';
import Channel from '../component/channel/channel';

const App = () => (
    <div>
        <Route  exact path='/' component={SplashComponent}/>
        <Route path='/channel/:channel_id' component={Channel} />
        <AuthRoute path="/signup" component={SignUpContainer}/>  
        <AuthRoute path="/login" component={LoginContainer}/>  
    </div>
)

export default App
