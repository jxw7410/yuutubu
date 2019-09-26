export const requestVideoPosts = video_id => {
  return $.ajax({
    url: `/api/videos/${video_id}/video_posts`,
  })
}

export const requestSomeVideoPosts = (video_id, offset, limit) => {
  return $.ajax({
    url: `/api/videos/${video_id}/video_posts`,
    data: {
      offset,
      limit
    }
  });
}


export const createVideoPost = post => {
  return $.ajax({
    method: 'post',
    url: '/api/video_posts',
    data: { post }
  })
}


export const deleteVideoPost = post_id => {
  return $.ajax({
    method: 'delete',
    url: `/api/video_posts/${post_id}`,
  })
}