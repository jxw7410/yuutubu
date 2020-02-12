export const requestVideoPosts = ({video_id, offset, limit}) => ( 
  $.ajax({
    url: `/api/videos/${video_id}/video_posts`,
    data: {
      offset,
      limit
    }
  })
)

export const createVideoPost = post => (
  $.ajax({
    method: 'post',
    url: '/api/video_posts',
    data: { post }
  })
);

export const updateVideoPost = post => (
  $.ajax({
    method: 'PATCH',
    url: `/api/video_posts/${post.id}`,
    data: { post }
  })
);

export const deleteVideoPost = post_id => (
  $.ajax({
    method: 'delete',
    url: `/api/video_posts/${post_id}`,
  })
);


