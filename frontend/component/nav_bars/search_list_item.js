import React from 'react';
import {withRouter} from 'react-router-dom';
import { SearchBarContext } from './search_bar';

const SearchListItem = props => {
  const { searchBarState, setSearchBarState } = React.useContext(SearchBarContext);

  function mouseEnterHandler(e) {
    setSearchBarState({
      ...searchBarState,
      selected: props.index
    });
  }
  
  function redirectToSearch(e) {
      setSearchBarState({
        ...searchBarState,
        redirecting: true,
        selected: null, 
        inputText: props.matchedSubstring + props.remenantString,
      });
  }

  return (
    <li className={props.className} 
      onMouseEnter ={mouseEnterHandler}
      onClick={redirectToSearch}>
        <span>{props.matchedSubstring}</span>
        <span>{props.remenantString}</span>
    </li>

  )
}

export default withRouter(SearchListItem);