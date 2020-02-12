import { DELETE_SUBSCRIPTION, RECEIVE_SUBSCRIPTION, RECEIVE_SUBSCRIPTIONS } from '../../actions/subscribe/subscribe_action';
import { merge } from 'lodash'

const subscriptions = (state = {}, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_SUBSCRIPTION:
      return merge({}, state, { [action.sub.id]: action.sub })
    case RECEIVE_SUBSCRIPTIONS:
      return action.subs
    case DELETE_SUBSCRIPTION:
      const newState = merge({}, state)
      delete newState[action.sub.id]
      return newState;
    default:
      return state;
  }
}

export default subscriptions;
