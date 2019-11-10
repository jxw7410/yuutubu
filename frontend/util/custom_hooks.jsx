import React from 'react';
import { debouncer}  from './selectors';

/* 
  The ref is needed since the scroll event caches the initialte state of isFetching 
  of for the life time of the component.
*/



export function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}


export const useInfiniteScrolling = (fetchHandler) => {
  const isFetchingRef = React.useRef(false);
  const [isFetching, setIsFetching] = React.useState(false);
  const debouncedHandleScroll = debouncer(handleScroll, 100);
  React.useEffect( () => {
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


  return [isFetchingRef, setIsFetching]
}
