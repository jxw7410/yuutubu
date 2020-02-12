import * as VideoPostApi from '../../util/video_posts_api';
export const RECEIVE_DELETE_POST = 'RECEIVE_DELETE_POST';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REMOVE_POSTS = 'REMOVE_POSTS';


const receiveDeletePost = post => ({
    type: RECEIVE_DELETE_POST,
    post
})

const receivePost = post => ({
    type: RECEIVE_POST,
    post
})

const receivePosts = response => ({
    type: RECEIVE_POSTS,
    response
})

const removePosts = {
  type: REMOVE_POSTS
}


export const requestCreatePost = post => dispatch => {
  return VideoPostApi.createVideoPost(post)
    .then(post => dispatch(receivePost(post)));
};

export const requestUpdateComment = post => dispatch => {
  return VideoPostApi.updateVideoPost(post)
    .then(post => dispatch(receivePost(post)));
}

export const requestDeletePost = post_id => dispatch => {
  return VideoPostApi.deleteVideoPost(post_id)
    .then(post => dispatch(receiveDeletePost(post)));
};

export const requestPosts = params => dispatch => {
  return VideoPostApi.requestVideoPosts(params)
    .then(posts => dispatch(receivePosts(posts)))
    .fail(err => {
      switch(err.status){
        case 404:
          console.log('No posts');
          break;
        default: break;
      }
    });
}

export const requestRemovePost = () => dispatch => (
  new Promise( resolve => {
    dispatch(removePosts);
    resolve();
  })
)