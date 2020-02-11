import { RECEIVE_LIKE_DISLIKE, CLEAR_LIKE_DISLIKE, RECEIVE_VIDEO_LIKE_DISLIKE } from '../../actions/like/like_dislike_action';
import { REQUEST_SET_VIDEO } from '../../actions/video_player/video_player_action';

const likeReducer = (state = {}, action) => {
	Object.freeze(state);
	switch (action.type) {
		case RECEIVE_VIDEO_LIKE_DISLIKE:
			return action.videoLikeDislike ? action.videoLikeDislike : {};
		case RECEIVE_LIKE_DISLIKE:
			return action.likeDislike;
		case CLEAR_LIKE_DISLIKE:
			return {}
		case REQUEST_SET_VIDEO:
			return action.video.like_dislike || {};
		default:
			return state;
	}
}

export default likeReducer;