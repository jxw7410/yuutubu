import {RECEIVE_SEARCH_QUERIES} from '../../actions/search/search_action';

const searchReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_SEARCH_QUERIES:
            return action.searches
        default:
            return state
    }
}

export default searchReducer;