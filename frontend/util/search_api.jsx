export const fetchSearchBarQuery = text => {
    return $.ajax({
        url: `./api/searches/search_bar/${text}`,
    });
}

