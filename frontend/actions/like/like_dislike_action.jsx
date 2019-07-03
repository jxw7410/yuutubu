import * as LikeDislikeAPI from '../../util/like_dislike_api'

export const RECEIVE_LIKE_DISLIKE = 'RECEIVE_LIKE_DISLIKE';
export const CLEAR_LIKE_DISLIKE = 'CLEAR_LIKE_DISLIKE'

const receiveLikeDislike = likeDislike => {
    return {
        type: RECEIVE_LIKE_DISLIKE,
        likeDislike
    }
}

const clearLikeDislike = () => {
    return {
        type: CLEAR_LIKE_DISLIKE
    }
}


export const createLikeDislike = (video_id, bool) => dispatch => {
   return LikeDislikeAPI.createLikeDislike(video_id, bool)
    .then( response => dispatch(receiveLikeDislike(response)));
}


export const updateLikeDislike = (id, bool) => dispatch => {
    return LikeDislikeAPI.updateLikeDislike(id, bool)
        .then(response => dispatch(receiveLikeDislike(response)));
}

export const deleteLikeDislike = id => dispatch => {
    return LikeDislikeAPI.deleteLikeDislike(id)
        .then(response => dispatch(receiveLikeDislike(response)));
}

export const requestClearLikeDislike = () => dispatch => {
    dispatch(clearLikeDislike());
}

