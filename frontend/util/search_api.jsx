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