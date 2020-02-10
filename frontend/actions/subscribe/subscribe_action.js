import * as SubscriptionAPI from '../../util/susbscribe_api';

export const DELETE_SUBSCRIPTION = 'DELETE_SUBSCRIPTION';
export const RECEIVE_SUBSCRIPTION = 'RECEIVE_SUBSCRIPTION';
export const RECEIVE_SUBSCRIPTIONS = 'RECEIVE_SUBSCRIPTIONS';


const deleteSubscription = sub => ({
  type: DELETE_SUBSCRIPTION,
  sub
});

const receiveSubscription = sub => ({
  type: RECEIVE_SUBSCRIPTION,
  sub
});

const receiveSubscriptions = subs => ({
  type: RECEIVE_SUBSCRIPTIONS,
  subs
})


export const subscribe = channel_id => dispatch => {
  return SubscriptionAPI.updateSubscription(channel_id)
    .then(sub => dispatch(receiveSubscription(sub)));
}


export const unsubscribe = sub_id => dispatch => {
  return SubscriptionAPI.deleteSubscription(sub_id)
    .then(sub => dispatch(deleteSubscription(sub)));
}

export const fetchSubscriptions = () => dispatch => {
  return SubscriptionAPI.fetchSubscriptions()
    .then((subs) => dispatch(receiveSubscriptions(subs)));
}



