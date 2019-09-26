export const requestVideo = video_id => {
    return $.ajax({
        url: `/api/videos/${video_id}`
    });
}

export const requestChannelVideos = (channel_id, limit, offset) => {
    return $.ajax({
        url: `/api/user_channels/${channel_id}/videos`,
        data: {
            limit,
            offset
        }
    });
}

export const requestRecommendedVideos = video_id => {
    return $.ajax({
        url: `/api/videos/${video_id}/recommend`,
    })
}

export const uploadVideo = video => {
    return $.ajax({
        method: 'post',
        url: '/api/videos',
        data: video
    })
}


export const requestDirectUpload = file => {
    return $.ajax({
        method: 'post',
        url: '/api/direct_upload',
        data: file,
        contentType: false,
        processData: false,
    })
}

export const deleteDirectUpload = blob_ids => {
    return $.ajax({
        method: 'delete',
        url: '/api/direct_upload',
        data: blob_ids,
    })
}

export const updateView = video_id => {
    return $.ajax({
        method: 'patch',
        url: `/api/videos/${video_id}/update_views`
    })
}