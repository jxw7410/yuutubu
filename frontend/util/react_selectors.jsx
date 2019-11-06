import React from 'react';

// This is to create previousProps for react hooks
// Pass in the current props as values
export function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

