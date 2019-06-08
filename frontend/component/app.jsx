import React from 'react'
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/auth_route'
import SignUpContainer  from '../component/auth/signup_container'
import LoginContainer from '../component/auth/login_container'
import ChannelIndexContainer from '../component/channel/channel_index_container';
import ChannelRouter from '../component/channel/channel_router';
import VideoRouter from '../component/video/video_router';
import UploadVideoContainer from '../component/video/video_upload_ctn';
import MainNav from '../component/nav-bars/main_nav';
import Modal from '../component/modals/modal';


const App = () => (
    <>
        <MainNav />
        <Modal />
        <Route exact path='/' component={ChannelIndexContainer}/>
        <Route path='/channel/:channel_id' component={ChannelRouter}/>
        <AuthRoute path="/signup" component={SignUpContainer}/>  
        <AuthRoute path="/login" component={LoginContainer}/>  
        <Route path='/video/:video_id' component={VideoRouter} />
        <ProtectedRoute path='/upload' component={UploadVideoContainer} />
    </>
)

export default App
