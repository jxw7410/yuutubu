import React from 'react'


/* 

  const deleteButton = () => {
    return (
      parseInt(props.currentUser.id) === props.post.user_id ?
        <button className="form-del-btn"
          onClick={props.handleDelete(props.post.id)}>Delete</button> : null
    )
  }
*/

const Comment = props => {
  const [state, setState] = React.useState({
    readMore: false,
    expanded: false,
  });

  const contentContainer = React.useRef();
  const contentHeightLimit = 94 // 94px

  React.useEffect(() => { 
    if (contentContainer.current.offsetHeight > contentHeightLimit)
      setState({ ...state, readMore: true })
  }, []);

  function handleReadMore(){
    const expanded = !state.expanded;
    setState({...state, expanded});
  }

  return (
    <li>
      <div className='vid-post'>
        <div className='vid-post-r1'>
          <section>
            <i className='fas fa-user-circle vpr1c1-i' />
          </section>

          <section>
            <div className='vid-post-r1-c2-hdr flexh-5'>
              <section className='flexh-3'>
                <span>{props.post.user}</span>
                <span className='vpr1c1hl'>
                  {props.post.created_at}
                </span>
              </section>
              {/* delete button comp goes here in the future */}
            </div>

            <div className={[
              'vid-post-bd-r1-c2',
              state.expanded ? "expd" : ""
            ].join(" ")}>
              <div ref={contentContainer}>
                {props.post.description}
              </div>
            </div>
            
            <div className='vid-post-ftr-r1-c2'>
              <span 
                style={ state.readMore ? null : { display: 'none' }}
                onClick={handleReadMore}
                className='span-style-1'>
                { state.expanded ? 'Read Less' : 'Read More' }
              </span>
            </div>
          </section>
        </div>
      </div>
    </li>
  )
}

export default Comment;