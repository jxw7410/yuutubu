import { connect } from 'react-redux';
import ChannelHeader from './channel_header';
import { withRouter } from 'react-router-dom';



const msp = (state, props) => {
  const channel = state.entities.channels[props.match.params.channel_id] || {};
  return {
    channel,
    isOwnerOfChannel: state.session.id == channel.user_id,
  }
}


export default withRouter(connect(msp, null)(ChannelHeader));