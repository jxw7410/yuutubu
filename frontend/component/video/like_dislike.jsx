import React from 'react';

const LikeDislike = props => {
  const [state, setState] = React.useState({
    likeCount: 0,
    dislikeCount: 0,
    isFetching: false,
    likeDislike: null,
  });


  React.useEffect(() => {
    setState({
      ...state,
      likeCount: props.video.likeCount,
      dislikeCount: props.video.dislikeCount,
    })
  }, [props.video.id])

  React.useEffect(() => {
    if (state.isFetching) {
      updateLikeDislike();
    }
  }, [state.isFetching]);


  function updateLikeDislike() {
    const count = state.likeDislike ? "likeCount" : "dislikeCount";
    if (props.likeDislike.is_liked === undefined) {
      const callback = () => props.createLikeDislike(props.video.id, state.likeDislike);
      _updateLikeDislike(callback, count, 1);
    } else if (props.likeDislike.is_liked === state.likeDislike){
      const callback = () => props.deleteLikeDislike(props.likeDislike.id);
      _updateLikeDislike(callback, count, -1);
    } else {
      const callback = () => props.updateLikeDislike(props.likeDislike.id, state.likeDislike);
      const oppositeCount = count === 'likeCount' ? "dislikeCount" : "likeCount";
      _updateLikeDislike(callback, count, 1, oppositeCount);
    }
  }

  function _updateLikeDislike(ajax, count, offset, oppositeCount) {
    ajax().then(() => {
      setState({
        ...state,
        [count]: state[count] + offset,
        [oppositeCount]: state[oppositeCount] + (-offset),
        isFetching: false,
      })
    }).fail(() => setState({ ...state, isFetching: false }))
  }

  function handleClick(bool) {
    return e => {
      if (props.isLogin) {
        if (!state.isFetching)
          setState({
            ...state,
            likeDislike: bool,
            isFetching: true
          });
      } else {
        props.history.push('/login')
      }
    }
  }

  function likeDislikeRatio() {
    if (!state.likeCount && !state.dislikeCount)
      return 0.5;
    else
      return state.likeCount / (state.likeCount + state.dislikeCount);
  }

  function likeDislikeBtn(bool, count, icon) {
    return (
      <span className='flexh-1'
        onClick={handleClick(bool)}>
        <i
          className={[
            'material-icons',
            props.likeDislike.is_liked === bool ? " voted" : "",
          ].join(" ")}>
          {icon}
        </i>
        <span className='like-counts'>{count}</span>
      </span>
    )
  }

  return (
    <div className='vid-info-hdr-utils flexv-1'>
      <section className='vid-ld-i flexh-6'>
        {likeDislikeBtn(true, state.likeCount, 'thumb_up')}
        {likeDislikeBtn(false, state.dislikeCount, 'thumb_down')}
      </section>
      <section className='ld-bar'>
        <div
          style={{ width: `${likeDislikeRatio() * 100}%` }}
          className={[
            'ldr-bar',
            (typeof props.likeDislike.is_liked === 'boolean') ? 'ldrb-voted' : "",
          ].join(" ")}
        />
      </section>
    </div>
  )
}

export default LikeDislike;