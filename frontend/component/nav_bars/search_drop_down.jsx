import React from 'react';
import { SearchBarContext } from './search_bar';
import SearchListItem from './search_list_item';


const SearchDropdown = props => {
  const { searchBarState } = React.useContext(SearchBarContext);

  function searches() {
    const inputTextLength = searchBarState.inputText.length;

    return searchBarState.filteredSearches.map((search, index) => {
      const matchedSubstring = search.context.slice(0, inputTextLength);
      const remenantString = search.context.slice(inputTextLength);
      const className = [
          searchBarState.selected === index ? 'sbsd_d' : "",
          search.category ? "history" : "",
      ].join(" ")

      return <SearchListItem
        key={index}
        index={index}
        matchedSubstring={matchedSubstring}
        remenantString={remenantString}
        className={className}
      />
    });
  }

  const searchItems = searches();

  return (
    <div style={searchItems.length && searchBarState.isFocused ? null : {display: 'none'}} 
      className='sch-mdl sm-active'>
      <ul className='sm-list flexv-4'>
        {searchItems}
      </ul>
    </div>
  )
}



export default SearchDropdown;