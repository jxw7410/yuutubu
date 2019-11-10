import React from 'react';



export const useInfiniteScrolling = (fetchHandler) => {
  const [isFetching, setIsFetching] = React.useState(false);

  React.useEffect( () => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  React.useEffect( () => {
    const throttleTimeLimit = 50;
    if (isFetching){
      setTimeout( () => fetchHandler(), throttleTimeLimit);
    }
  }, [isFetching])

  function handleScroll() {
    const {scrollTop, scrollHeight} = document.documentElement;
    const isScrollBottom = window.innerHeight + scrollTop === scrollHeight;
    if (isScrollBottom && !isFetching){
      setIsFetching(true);
    }
  }


  return [isFetching, setIsFetching]
}
