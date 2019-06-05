import React from 'react'
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/auth_route'
import SignUpContainer  from '../component/auth/signup_container'
import LoginContainer from '../component/auth/login_container'
import SplashComponent from '../component/splash/splash';
import ChannelRouter from '../component/channel/channel_router';
import VideoRouter from '../component/video/video_router';
import UploadVideo from '../component/video/video_upload';
//import Modal from '../component/modals/modal';


const App = () => (
    <div>
        <Route  exact path='/' component={SplashComponent}/>
        <Route path='/channel/:channel_id' component={ChannelRouter}/>
        <AuthRoute path="/signup" component={SignUpContainer}/>  
        <AuthRoute path="/login" component={LoginContainer}/>  
        <Route path='/video/:video_id' component={VideoRouter} />
        <ProtectedRoute path='/upload' component={UploadVideo} />
    </div>
)

export default App
