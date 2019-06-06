export const createLike = video_id => {
    return $.ajax({
        method: 'post',
        url: '/api/video_likes/create_like',
        data: { video_id }
    });
}

export const destroyLike = like_id => {
    return $.ajax({
        method: 'delete',
        url: '/api/video_likes/delete_like',
        data: { like_id }
    });
}

export const createDislike = video_id => {
    return $.ajax({
        method: 'post',
        url: '/api/video_likes/create_dislike',
        data: { video_id }
    });
}

export const destroyDislike = dislike_id => {
    return $.ajax({
        method: 'delete',
        url: '/api/video_likes/delete_dislike',
        data: { dislike_id }
    });
}

export const createLikeDestroyDislike = (dislike_id, video_id) => {
    return $.ajax({
        method: 'post',
        url: '/api/video_likes/create_like_destroy_dislike',
        data: { 
            dislike_id,
            video_id,
        }
    })
}

export const createDislikeDestroyLike = (like_id, video_id) => {
    return $.ajax({
        method: 'post',
        url: '/api/video_likes/create_dislike_destroy_like',
        data: { 
            like_id,
            video_id,
        }
    })
}

