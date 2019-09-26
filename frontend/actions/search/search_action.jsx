import * as SearchAPI from "../../util/search_api";

export const RECEIVE_SEARCH_QUERIES = 'RECEIVE_SEARCH_QUERIES';
export const RECEIVE_SEARCH_HISTORY = 'RECEIVE_SEARCH_HISTORY';
export const RECEIVE_SEARCH_VIDEOS = 'RECEIVE_SEARCH_VIDEOS';


const receiveSearchQueries = ({ searches, history }) => {
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


const receiveSearchVideos = videos => ({
  type: RECEIVE_SEARCH_VIDEOS,
  videos
})


export const requestSearchQueries = text => dispatch => {
  return SearchAPI.fetchSearchBarQuery(text)
    .then(searches => dispatch(receiveSearchQueries(searches)));
}

export const updateSearchHistory = query => dispatch => {
  return SearchAPI.updateSearchHistory(query)
    .then(history => dispatch(receiveSearchHistory(history)));
}


export const requestSearchVideos = (query, limit, offset) => dispatch => {
  return SearchAPI.fetchSearchQuery(query, limit, offset)
    .then(videos => dispatch(receiveSearchVideos(videos)));
}



