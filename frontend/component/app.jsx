import React from 'react'
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/auth_route'
import SignUpContainer from '../component/auth/signup_container'
import LoginContainer from '../component/auth/login_container'
import ChannelIndexContainer from '../component/channel/channel_index_ctn';
import ChannelRouter from '../component/channel/channel_router';
import UploadVideoContainer from '../component/video_upload/video_upload_ctn';
import MainNav from './nav_bars/main_nav_ctn';
import Modal from '../component/modals/modal';
import VideoWrapperContainer from '../component/video/video_wrapper';
import SearchContainer from './search/search_ctn';

const App = () => (
  <React.Fragment>
    <MainNav />
    <Modal />
    <VideoWrapperContainer />
    <Switch>
      <Route exact path='/' component={ChannelIndexContainer} />
      <Route path='/search/:query' component={SearchContainer} />
      <Route path='/channel/:channel_id' component={ChannelRouter} />
      <AuthRoute path="/signup" component={SignUpContainer} />
      <AuthRoute path="/login" component={LoginContainer} />
      <ProtectedRoute path='/upload' component={UploadVideoContainer} />
    </Switch>
  </React.Fragment>
)

export default App
