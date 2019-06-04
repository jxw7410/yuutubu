export const requestVideo = video_id => {
    return $.ajax({
        url: `/api/videos/${video_id}`
    });
}

export const requestChannelVideos = (channel_id, limit, offset) => {
    return $.ajax({
        url: `/api/videos/index_lite/${channel_id}`,
        data: {
            limit,
            offset
        }
    });
}

