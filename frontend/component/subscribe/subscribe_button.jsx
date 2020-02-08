import React from 'react';
import { connect } from "react-redux";
import { subscribe, unsubscribe } from '../../actions/subscribe/subscribe_action';
import { filterSubscriptions } from '../../util/selectors';
import { withRouter } from 'react-router-dom';
import { openModal } from '../../actions/modal/modal_action';


const SubscribeButton = React.memo(props => {
  const updating = React.useRef(false);

  const unsubscribe = e => {
    e.preventDefault();
    if (props.login) {
      props.openModal({
        type: 'UNSUBSCRIBE',
        payload: {
          subId: props.sub.sub_id
        }
      });
    } else {
      props.history.push('/login')
    }
  }

  const subscribe = e => {
    e.preventDefault();
    if (props.login) {
      if (!updating.current) {
        updating.current = true;
        props.subscribe(props.channel.id)
          .then(() => updating.current = false)
          .fail(() => updating.current = false)
      }
    } else {
      props.history.push('/login')
    }
  }

  return (
    <div style={ props.channel.id == props.user.channel_id ? {display: 'none'} : null}>
      {
        props.sub.sub_id && props.login ?
          <button
            onClick={unsubscribe}
            id='subscribed-button'> UNSUBSCRIBE </button> :
          <button
            onClick={subscribe}
            id="subscribe-button"> SUBSCRIBE </button>
      }
    </div>
  )
});


const msp = (state, props) => {
  return {
    user: state.session,
    login: Boolean(state.session.id),
    sub: filterSubscriptions(props.channel.id, Object.values(state.entities.subscriptions))
  }
}

const mdp = dispatch => {
  return {
    subscribe: channel_id => dispatch(subscribe(channel_id)),
    openModal: modalMeta => dispatch(openModal(modalMeta)),
  }
}



export default withRouter(connect(msp, mdp)(SubscribeButton));

