export const createLikeDislike = (video_id, bool) => {
  return $.ajax({
    method: 'post',
    url: '/api/video_like_dislikes',
    data: { 'video_like_dislike': { video_id, bool } }
  })
}


export const updateLikeDislike = (id, bool) => {
  return $.ajax({
    method: 'patch',
    url: `/api/video_like_dislikes/${id}`,
    data: { bool }
  })
}

export const deleteLikeDislike = id => {
  return $.ajax({
    method: 'delete',
    url: `/api/video_like_dislikes/${id}`,
  })
}