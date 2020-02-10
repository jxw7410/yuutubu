import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/auth_route'
import SignUpContainer from '../component/auth/signup_container'
import LoginContainer from '../component/auth/login_container'
import MainPageContainer from './main_page/main_page_ctn';
import ChannelContainer from '../component/channel/channel_ctn';
import UploadVideoContainer from '../component/video_upload/upload_page_container';
import MainNav from './nav_bars/main_nav_ctn';
import Modal from '../component/modals/modal';
import SearchContainer from './search/search_ctn';
import VideoPageComponents from './video/video_page_components';

const App = () => (
  <>
    <MainNav />
    <Modal />
    <VideoPageComponents />
    <Switch>
      <Route exact path='/' component={MainPageContainer} />
      <Route path='/search/:query' component={SearchContainer} />
      <Route path='/channel/:channel_id' component={ChannelContainer} />
      <Route path='/video/:video_id' component={null} /> 
      <AuthRoute path="/signup" component={SignUpContainer} />
      <AuthRoute path="/login" component={LoginContainer} />
      <ProtectedRoute path='/upload' component={UploadVideoContainer} />
      <Redirect from="*" to="/" />
    </Switch>
  </>
)

export default App
