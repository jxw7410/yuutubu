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
});

// This is to account for network latency.
const _requestSearchQueries = () => {
  let currentWord;
  return text => dispatch => {
    currentWord = text;
    return SearchAPI.fetchSearchBarQuery(text)
      .then( searches => {
        if (currentWord === text)
          dispatch(receiveSearchQueries(searches))
      })
  }
}

export const requestSearchQueries = _requestSearchQueries();

export const updateSearchHistory = query => dispatch => {
  return SearchAPI.updateSearchHistory(query)
    .then(history => dispatch(receiveSearchHistory(history)));
}


export const requestSearchVideos = (query, limit, offset) => dispatch => {
  return SearchAPI.fetchSearchQuery(query, limit, offset)
    .then(videos => dispatch(receiveSearchVideos(videos)));
}



