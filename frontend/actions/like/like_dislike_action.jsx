import * as LikeDislikeAPI from '../../util/like_dislike_api'

export const RECEIVE_LIKE_DISLIKE = 'RECEIVE_LIKE_DISLIKE';


const receiveLikeDislike= likeDislike => {
    return {
        type: RECEIVE_LIKE_DISLIKE,
        likeDislike
    }
}



export const createLike = video_id => dispatch => {
   return LikeDislikeAPI.createLike(video_id)
    .then( response => dispatch(receiveLikeDislike(response)));
}


export const createDislike = video_id => dispatch => {
    return LikeDislikeAPI.createDislike(video_id)
        .then(response => dispatch(receiveLikeDislike(response)));
}

export const deleteLike = id => dispatch => {
    return LikeDislikeAPI.destroyLike(id)
        .then(response => dispatch(receiveLikeDislike(response)));
}

export const deleteDislike = id => dispatch => {
    return LikeDislikeAPI.destroyDislike(id)
        .then(response => dispatch(receiveLikeDislike(response)));
}

export const createLikeDestroyDislike = (id, video_id) => dispatch => {
    return LikeDislikeAPI.createLikeDestroyDislike(id, video_id)
        .then(response => dispatch(receiveLikeDislike(response)));
}

export const createDislikeDestroyLike = (id, video_id) => dispatch => {
    return LikeDislikeAPI.createDislikeDestroyLike(id, video_id)
        .then(response => dispatch(receiveLikeDislike(response)));
}

