import React, { useEffect, useState } from 'react';

const Description = props => {
  const [state, setState] = useState({
    readMore: false,
    expanded: false,
  })

  useEffect(() => {
    if (description.current.offsetHeight > props.heightLimit) {
      setState({ readMore: true })
    }
  }, []);

  const description = React.useRef();

  const handleReadMore = e => {
    e.preventDefault();
    const expanded = state.expanded ? false : true;
    setState({ expanded, readMore: state.readMore })
  }


  // Basically if it was possible to readMore, determined by when the component mounted
  // This always render something.
  const readMore = () => state.readMore ? props.readMore(state.expanded, handleReadMore) : null


  return (
    <React.Fragment>
      {props.render(state.expanded, description, props.description)}
      {readMore()}
    </React.Fragment>
  )
}



export default Description;