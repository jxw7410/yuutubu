import React from 'react';
import { withRouter } from 'react-router-dom';
import SearchDropdown from './search_drop_down';
import { filterByWords, debouncer } from '../../util/selectors';

export const SearchBarContext = React.createContext();

const SearchBar = props => {
  const [state, setState] = React.useState({
    inputText: "",
    selected: null,
    isFocused: false,
    filteredSearches: [],
    redirecting: false,
  });

  const inputText = React.useRef();
  const inputRef = React.useRef(null);
  const searchForMatchesRef = React.useRef(debouncer(searchForMatches, 100))

  // When ajax is made to change searches
  React.useEffect(() => {
    const filteredSearches = filterByWords(state.inputText, props.searches);
    setState({ ...state, filteredSearches });
  }, [props.searches])


  // When text changes or search is focused.
  React.useEffect(() => {
    inputText.current = state.inputText;
    searchForMatchesRef.current();
  }, [state.inputText, state.isFocused])

  React.useEffect(() => {
    if (state.redirecting)
      handleSubmit();
  }, [state.redirecting])

  function handleFocus(bool) {
    return e => {
      setState({ ...state, isFocused: bool });
    }
  }

  function handleChange(e) {
    setState({
      ...state,
      selected: null,
      inputText: e.target.value,
    });
  }

  function handleSubmit() {
    if (state.inputText.length) {
      props.history.push(`/search/${state.inputText}`)
      setState({ ...state, redirecting: false, isFocused: false });
      inputRef.current.blur();
    }
  }

  function searchForMatches() {
    props.requestSearchQueries(inputText.current.trim());
  }

  /* 
    The repeated e.preventDefault are intentional. Only want it to happen if
    Certain keys matches.
  */
  function handleKeyPress(e) {
    if (e.key === 'ArrowUp' || e.keyCode === 38) {
      _moveSelectorUp()
    } else if (e.key === 'ArrowDown' || e.keyCode === 40) {
      _moveSelectorDown();
    } else if (e.key === 'Enter' || e.keyCode === 13) {
      if (state.selected !== null) {
        const selectedSearch = state.filteredSearches[state.selected];
        setState({
          ...state,
          redirecting: true,
          selected: null,
          inputText: selectedSearch.context
        })
      }
    }
  }

  function _moveSelectorUp() {
    if (state.selected === null)
      setState({ ...state, selected: state.filteredSearches.length - 1 })
    else if (state.selected === 0)
      setState({ ...state, selected: null })
    else
      setState({ ...state, selected: state.selected - 1 })
  }


  function _moveSelectorDown() {
    if (state.selected === null)
      setState({ ...state, selected: 0 })
    else if (state.selected === state.filteredSearches.length - 1)
      setState({ ...state, selected: null })
    else
      setState({ ...state, selected: state.selected + 1 })
  }

  return (
    <form className='flexh-1'
      style={{ width: '100%' }}
      onSubmit={handleSubmit}
    >
      <div
        tabIndex='0'
        className='sbi-ctn'
        onFocus={handleFocus(true)}
        onBlur={handleFocus(false)}
        onKeyDown={handleKeyPress}
      >
        <input
          ref={inputRef}
          className='sbi'
          type='text'
          placeholder='Search'
          autoComplete='off'
          onChange={handleChange}
          value={state.inputText}
        />

        <SearchBarContext.Provider
          value={{
            searchBarState: state,
            setSearchBarState: setState
          }}
        >
          <SearchDropdown />
        </SearchBarContext.Provider>

      </div>
      <button className='sbb'
        onClick={handleSubmit}
      > <i className="fas fa-search" /> </button>
    </form>
  )
}


export default withRouter(SearchBar);