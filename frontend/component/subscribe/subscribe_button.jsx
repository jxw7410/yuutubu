import React from 'react';
import { connect } from "react-redux";
import { subscribe, unsubscribe } from '../../actions/subscribe/subscribe_action';
import { filterSubscriptions } from '../../util/selectors';
import { withRouter } from 'react-router-dom';


const SubscribeButton = React.memo(props => {
  let updating = false;

  const unsubscribe = e => {
    e.preventDefault();
    if (props.login) {
      updating = true;
      props.unsubscribe(props.sub.sub_id).then(() => {
        updating = false
      }).fail(() => updating = false)
    } else {
      props.history.push('/login')
    }
  }

  const subscribe = e => {
    e.preventDefault();
    if (props.login) {
      if (!updating) {
        updating = true;
        props.subscribe(props.channel.id)
          .then(() => updating = false)
          .fail(() => updating = false)
      }
    } else {
      props.history.push('/login')
    }
  }

  return (
    <>
      {
        props.sub.sub_id && props.login ?
          <button
            onClick={unsubscribe}
            id='subscribed-button'> UNSUBSCRIBE {props.channel.subscriptionCount}</button> :
          <button
            onClick={subscribe}
            id="subscribe-button"> SUBSCRIBE {props.channel.subscriptionCount}</button>
      }
    </>
  )
});


const msp = (store, props) => {
  return {
    login: Boolean(store.session.id),
    sub: filterSubscriptions(props.channel.id, Object.values(store.entities.subscriptions))
  }
}

const mdp = dispatch => {
  return {
    subscribe: channel_id => dispatch(subscribe(channel_id)),
    unsubscribe: sub_id => dispatch(unsubscribe(sub_id)),
  }
}



export default withRouter(connect(msp, mdp)(SubscribeButton));

