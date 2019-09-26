/*
    If text is nil or empty, the api path becomes ./api/searches/search_titles
*/
export const fetchSearchBarQuery = text => {
  return $.ajax({
    url: `./api/searches/${text}/search_titles`,
  });
}

export const updateSearchHistory = query => {
  return $.ajax({
    method: 'post',
    url: './api/searches',
    data: query,
  })
}


export const fetchSearchQuery = (data, limit, offset) => {
  return $.ajax({
    url: `./api/searches/${data.query}/videos`,
    data: { limit, offset }
  })
}