export const requestVideo = video_id => {
    return $.ajax({
        url: `/api/videos/${video_id}`
    });
}