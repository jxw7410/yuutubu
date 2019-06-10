import React from 'react';

class SearchBar extends React.Component {

    render(){
        return (
            <section id='search-bar'>
                <input id='search-bar-input' type='text' placeholder={'Search'} />
                <button id='search-bar-button'> <i className="fas fa-search"></i> </button>
            </section>
        )
    }
}

export default SearchBar;