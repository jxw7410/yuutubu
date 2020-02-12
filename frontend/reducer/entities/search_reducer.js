import { RECEIVE_SEARCH_QUERIES } from '../../actions/search/search_action';

const searchReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SEARCH_QUERIES:
      if (action.searches)
        return action.searches;
      else
        return {};
    default:
      return state
  }
}

export default searchReducer;