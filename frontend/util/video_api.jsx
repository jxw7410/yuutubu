export const requestVideo = video_id => {
    return $.ajax({
        url: `/api/videos/${video_id}`
    });
}

export const requestChannelVideos = (channel_id, limit, offset) => {
    return $.ajax({
        url: `/api/videos/index_partial/${channel_id}`,
        data: {
            limit,
            offset
        }
    });
}

export const requestRecommendedVideos = video_id => {
    //debugger
    return $.ajax({
        url: `/api/videos/index_recommended/${video_id}`,
    })
}

export const uploadVideo = video => {
    return $.ajax({
        method: 'post',
        url: '/api/videos',
        data: video,
        contentType: false,
        processData: false,

    })
}

