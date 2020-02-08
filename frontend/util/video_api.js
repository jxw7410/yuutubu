export const requestVideo = video_id => (
  $.ajax({ url: `/api/videos/${video_id}` })
)

export const requestChannelVideos = (channel_id, limit, offset) => (
  $.ajax({
    url: `/api/user_channels/${channel_id}/videos`,
    data: { limit, offset },
  })
)

export const requestRecommendedVideos = video_id => (
  $.ajax({ url: `/api/videos/${video_id}/recommend` })
)

export const uploadVideo = video => (
  $.ajax({
    method: 'post',
    url: '/api/videos',
    data: video
  })
)

export const requestDirectUpload = file => (
  $.ajax({
    method: 'post',
    url: '/api/direct_upload',
    data: file,
    contentType: false,
    processData: false,
  })
)

export const deleteDirectUpload = blob_ids => (
  $.ajax({
    method: 'delete',
    url: '/api/direct_upload',
    data: blob_ids,
  })
)

export const updateView = video_id => {
  return $.ajax({
    method: 'patch',
    url: `/api/videos/${video_id}/update_views`
  })
}