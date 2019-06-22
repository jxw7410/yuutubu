import {RECEIVE_SEARCH_QUERIES} from '../../actions/search/search_action';



const searchHistory = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_SEARCH_QUERIES:
            if (action.history)
                return action.history;
            else 
                return {};
        default:
            return state; 
    }
}


export default searchHistory;