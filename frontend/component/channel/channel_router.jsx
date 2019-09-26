import React from 'react';
import { connect } from 'react-redux';
import ChannelContainer from './channel_ctn';
import { fetchChannel } from '../../actions/channel/channel_action';
import VerifyRouter from '../../util/verify_route';


const ChannelRouter = props => <VerifyRouter {...props} type="channel" component={ChannelContainer} />

const mdp = dispatch => ({
  fetchResource: channel_id => dispatch(fetchChannel(channel_id)),
})

export default connect(null, mdp)(ChannelRouter);