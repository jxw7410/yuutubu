import { fetchSearchBarQuery } from "../../util/search_api";

export const RECEIVE_SEARCH_QUERIES = 'RECIEVE_SEARCH_QUERIES';


const receiveSearchQueries = searches => {
    return {
        type: RECEIVE_SEARCH_QUERIES,
        searches
    }
}


export const requestSearchQueries = text => dispatch => {
    return fetchSearchBarQuery(text)
        .then( searches => dispatch( receiveSearchQueries(searches)));
}

