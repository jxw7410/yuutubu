import React from 'react';
import { debouncer}  from './selectors';

export function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}


export function useInfiniteScrolling(fetchHandler){
/*
  The ref is needed since the scroll event caches the initialte state of isFetching
  of for the life time of the component.
*/
  const isFetchingRef = React.useRef(false);
  const [isFetching, setIsFetching] = React.useState(false);

  React.useEffect( () => {
    const debouncedHandleScroll = debouncer(handleScroll, 100);
    window.addEventListener('scroll', debouncedHandleScroll);
    return () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, [])

  React.useEffect( () => {
    if (isFetching){
      isFetchingRef.current = true;
      fetchHandler();
    } else {
      isFetchingRef.current = false;
    }
  }, [isFetching])

  function handleScroll() {
    const {scrollTop, scrollHeight} = document.documentElement;
    const isScrollBottom = window.innerHeight + scrollTop === scrollHeight;
    if (isScrollBottom && !isFetchingRef.current){
      setIsFetching(true);
    }
  }


  return [isFetchingRef.current, setIsFetching]
}
