import * as SubscriptionAPI from '../../util/susbscribe_api';

export const DELETE_SUBSCRIPTION = 'DELETE_SUBSCRIPTION'
export const RECEIVE_SUBSCRIPTION = 'RECEIVE_SUBSCRIPTION'


const deleteSubscription = sub => ({
    type: DELETE_SUBSCRIPTION,
    sub_id
});

const receiveSubscription = sub => ({
    type: RECEIVE_SUBSCRIPTION,
    sub
});



export const subscribe = channel_id => dispatch =>{
    return SubscriptionAPI.updateSubscription(channel_id)
        .then( sub => dispatch(receiveSubscription(sub)));
}


export const unsubscribe = sub_id => dispatch => {
    return SubscriptionAPI.deleteSubscription(sub_id)
        .then( sub => dispatch(deleteSubscription(sub)));
}




