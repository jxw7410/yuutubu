import { SIDE_BAR_ONE, SIDE_BAR_TWO, REMOVE_NAV_BARS, TOGGLE_SIDE_BAR } from '../../actions/nav/nav_bar_action';
import { merge } from 'lodash';

const defaultState = {
  active: true,
  toggled: true,
  type: 1,
}

const navBarsReducer = (state = defaultState, action) => {
  Object.freeze(state)
  switch (action.type) {
    case SIDE_BAR_ONE:
      return merge({}, state, { active: true, type: 'TYPEONE' })
    case SIDE_BAR_TWO:
      return merge({}, state, { active: true, type: 'TYPETWO' })
    case TOGGLE_SIDE_BAR:
      const toggled = !state.toggled;
      return merge({}, state, { toggled })
    case REMOVE_NAV_BARS:
      return merge({}, state, { active: false })
    default:
      return state;
  }
}

export default navBarsReducer;