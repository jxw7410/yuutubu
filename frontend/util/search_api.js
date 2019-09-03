export const fetchSearchBarQuery = text => {
    return $.ajax({
        url: `./api/searches/search_bar/${text}`,
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
        url: `./api/videos/search/${data.query}`,
        data: {limit, offset}
    })
}