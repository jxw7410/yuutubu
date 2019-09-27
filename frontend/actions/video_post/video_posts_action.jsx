import * as VideoPostApi from '../../util/video_posts_api';


export const RECEIVE_DELETE_POST = 'RECEIVE_DELETE_POST';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REMOVE_POSTS = 'REMOVE_POSTS';


const receiveDeletePost = post => {
  return {
    type: RECEIVE_DELETE_POST,
    post
  }
}

const receivePost = post => {
  return {
    type: RECEIVE_POST,
    post
  }
}

const receivePosts = response => {
  return {
    type: RECEIVE_POSTS,
    response
  }
}

export const removePosts = {
  type: REMOVE_POSTS
}


export const requestCreatePost = post => dispatch => {
  return VideoPostApi.createVideoPost(post)
    .then(post => dispatch(receivePost(post)));
};

export const requestDeletePost = post_id => dispatch => {
  return VideoPostApi.deleteVideoPost(post_id)
    .then(post => dispatch(receiveDeletePost(post)));
};

export const requestPosts = params => dispatch => {
  return VideoPostApi.requestVideoPosts(params)
    .then(posts => dispatch(receivePosts(posts)));
}

