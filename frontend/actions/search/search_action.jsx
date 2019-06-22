import * as SearchAPI from "../../util/search_api";

export const RECEIVE_SEARCH_QUERIES = 'RECEIVE_SEARCH_QUERIES';
export const RECEIVE_SEARCH_HISTORY = 'RECEIVE_SEARCH_HISTORY';


const receiveSearchQueries = ({searches, history}) => {
    return {
        type: RECEIVE_SEARCH_QUERIES,
        searches,
        history
    }
}

const receiveSearchHistory = history => {
    return {
        type: RECEIVE_SEARCH_HISTORY,
        history
    }
}

export const requestSearchQueries = text => dispatch => {
    return SearchAPI.fetchSearchBarQuery(text)
        .then( searches => dispatch( receiveSearchQueries(searches)));
}

export const updateSearchHistory = query => dispatch => {
    return SearchAPI.updateSearchHistory(query)
        .then( history => dispatch( receiveSearchHistory(history)));
}




